import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Users, CreditCard, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { createRazorpayOrder, verifyPayment } from '../services/api';
import AvailabilityCalendar from '../components/AvailabilityCalendar';

// Load Razorpay checkout script dynamically
const loadRazorpay = () =>
    new Promise((resolve) => {
        if (window.Razorpay) return resolve(true);
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

const STEPS = ['Your Details', 'Pick Dates', 'Pay & Confirm'];

export default function BookingPage() {
    const { roomId } = useParams();
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [step, setStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [confirmedBooking, setConfirmedBooking] = useState(null);
    const [error, setError] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);

    const [form, setForm] = useState({
        name: '', email: '', phone: '', room: roomId || '',
        checkIn: '', checkOut: '', guests: 1, specialRequests: '',
    });

    useEffect(() => {
        import('../services/api').then(({ getRooms }) => {
            getRooms().then(r => setRooms(r.data)).catch(() => { });
        });
    }, []);

    const handleRoomChange = (e) => {
        setForm(f => ({ ...f, room: e.target.value, checkIn: '', checkOut: '' }));
    };

    const handleDatesSelected = (checkIn, checkOut) => {
        setForm(f => ({ ...f, checkIn, checkOut }));
    };

    // Step 0 → Step 1 (validate guest info form)
    const handleDetailsNext = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.phone || !form.room) return;
        setStep(1);
    };

    // Step 1 → Step 2 (validate dates)
    const handleDatesNext = () => {
        if (!form.checkIn || !form.checkOut) {
            setError('Please select both check-in and check-out dates from the calendar.');
            return;
        }
        setError('');
        setStep(2);
    };

    // Step 2: Create Razorpay order then open payment
    const handlePayment = async () => {
        setLoading(true);
        setError('');
        try {
            // Create order on backend
            const orderRes = await createRazorpayOrder({
                room: form.room,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
            });
            const { orderId, amount, currency, keyId, totalAmount, nights, roomName, isMock } = orderRes.data;
            setOrderDetails({ totalAmount, nights, roomName });

            if (isMock) {
                // Dev mode: skip Razorpay popup, go straight to verify
                await handlePaymentSuccess({
                    razorpay_payment_id: `mock_pay_${Date.now()}`,
                    razorpay_order_id: orderId,
                    razorpay_signature: 'mock_signature',
                    isMock: true,
                    totalAmount,
                });
                return;
            }

            // Load Razorpay
            const loaded = await loadRazorpay();
            if (!loaded) {
                setError('Could not load payment gateway. Please check your connection.');
                setLoading(false);
                return;
            }

            const selectedRoom = rooms.find(r => r._id === form.room);
            const rzp = new window.Razorpay({
                key: keyId,
                amount,
                currency,
                order_id: orderId,
                name: 'Shore & Sip Gokarna',
                description: `${nights} night${nights > 1 ? 's' : ''} · ${roomName}`,
                image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=128&q=80',
                prefill: { name: form.name, email: form.email, contact: form.phone },
                theme: { color: '#D4854A' },
                handler: (response) => handlePaymentSuccess({
                    ...response,
                    isMock: false,
                    totalAmount,
                }),
                modal: {
                    ondismiss: () => { setLoading(false); },
                },
            });
            rzp.open();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to initiate payment. Please try again.');
            setLoading(false);
        }
    };

    const handlePaymentSuccess = async ({ razorpay_payment_id, razorpay_order_id, razorpay_signature, isMock, totalAmount }) => {
        try {
            const res = await verifyPayment({
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                isMock,
                totalAmount,
                ...form,
            });
            setConfirmedBooking(res.data.booking);
        } catch (err) {
            setError('Payment was processed but booking confirmation failed. Please contact us.');
        }
        setLoading(false);
    };

    // ─── SUCCESS SCREEN ──────────────────────────────────────────────────────────
    if (confirmedBooking) {
        const nights = orderDetails?.nights || Math.ceil((new Date(confirmedBooking.checkOut) - new Date(confirmedBooking.checkIn)) / (1000 * 60 * 60 * 24));
        const amount = confirmedBooking.totalAmount;
        const bookingRef = confirmedBooking._id?.toString().slice(-8).toUpperCase();

        return (
            <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', background: '#f7f8fc' }}>
                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '3rem 2.5rem', maxWidth: '520px', width: '100%', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                        <CheckCircle size={44} style={{ color: '#22c55e' }} />
                    </div>
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Booking Confirmed!</h2>
                    <p style={{ color: '#7a7a9a', marginBottom: '2rem', lineHeight: 1.6 }}>
                        A confirmation email has been sent to <strong>{form.email}</strong>. We'll see you on the beach!
                    </p>
                    <div style={{ background: '#fff8f2', borderRadius: '1rem', padding: '1.5rem', marginBottom: '2rem', textAlign: 'left' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                            <span style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>Booking Ref</span>
                            <span style={{ fontWeight: 700, color: '#1A1A2E', letterSpacing: '0.05em' }}>#{bookingRef}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0e8e0', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
                            <span style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>Room</span>
                            <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.875rem' }}>{orderDetails?.roomName}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0e8e0', paddingTop: '0.75rem', marginBottom: '0.75rem' }}>
                            <span style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>Stay</span>
                            <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.875rem' }}>{nights} night{nights > 1 ? 's' : ''}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0e8e0', paddingTop: '0.75rem' }}>
                            <span style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>Amount Paid</span>
                            <span style={{ fontWeight: 700, color: '#D4854A', fontSize: '1.1rem' }}>₹{amount?.toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => navigate('/')} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>Back to Home</button>
                        <button onClick={() => navigate('/rooms')} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Explore Rooms</button>
                    </div>
                </div>
            </div>
        );
    }

    // ─── STEP PROGRESS BAR ────────────────────────────────────────────────────────
    const StepBar = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '2.5rem' }}>
            {STEPS.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, background: i <= step ? '#D4854A' : '#f0f0f5', color: i <= step ? 'white' : '#7a7a9a', transition: 'all 0.3s' }}>{i < step ? '✓' : i + 1}</div>
                        <span style={{ fontSize: '0.7rem', fontWeight: 600, color: i === step ? '#D4854A' : '#7a7a9a', whiteSpace: 'nowrap' }}>{s}</span>
                    </div>
                    {i < STEPS.length - 1 && <div style={{ flex: 1, height: '2px', background: i < step ? '#D4854A' : '#f0f0f5', margin: '0 0.5rem', marginTop: '-1rem', transition: 'all 0.3s' }} />}
                </div>
            ))}
        </div>
    );

    const selectedRoom = rooms.find(r => r._id === form.room);

    return (
        <div style={{ background: '#f7f8fc', minHeight: '100vh' }}>
            <div style={{ background: 'linear-gradient(135deg, #D4854A 0%, #b8683a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Book Your Stay</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>Secure your beach escape in 3 simple steps.</p>
            </div>

            <section style={{ padding: '3rem 1.5rem' }}>
                <div style={{ maxWidth: '780px', margin: '0 auto' }}>
                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
                        <StepBar />

                        {/* ── STEP 0: Guest Details ── */}
                        {step === 0 && (
                            <form onSubmit={handleDetailsNext}>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Users size={20} style={{ color: '#D4854A' }} /> Guest Information
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div className="form-group"><label>Full Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" /></div>
                                    <div className="form-group"><label>Email *</label><input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@email.com" /></div>
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                    <div className="form-group"><label>Phone *</label><input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" /></div>
                                    <div className="form-group"><label>Guests *</label><input required type="number" min="1" max="10" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} /></div>
                                </div>
                                <div className="form-group">
                                    <label>Select Room *</label>
                                    <select required value={form.room} onChange={handleRoomChange}>
                                        <option value="">Choose a room...</option>
                                        {rooms.map(r => <option key={r._id} value={r._id}>{r.name} — ₹{r.pricePerNight?.toLocaleString()}/night</option>)}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Special Requests</label>
                                    <textarea rows="3" value={form.specialRequests} onChange={e => setForm(f => ({ ...f, specialRequests: e.target.value }))} placeholder="Early check-in, extra pillows, dietary requirements..." style={{ resize: 'vertical' }} />
                                </div>
                                <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1rem', padding: '0.85rem', marginTop: '0.5rem' }}>
                                    Continue to Select Dates →
                                </button>
                            </form>
                        )}

                        {/* ── STEP 1: Pick Dates ── */}
                        {step === 1 && (
                            <div>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <Calendar size={20} style={{ color: '#D4854A' }} /> Select Your Dates
                                </h2>
                                {selectedRoom && (
                                    <div style={{ background: 'rgba(212,133,74,0.07)', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontSize: '0.875rem', color: '#555' }}>
                                        🏨 <strong style={{ color: '#1A1A2E' }}>{selectedRoom.name}</strong> — ₹{selectedRoom.pricePerNight?.toLocaleString()}/night
                                    </div>
                                )}
                                <AvailabilityCalendar roomId={form.room} onSelectDates={handleDatesSelected} />
                                {error && <div style={{ background: '#fee2e2', borderRadius: '0.5rem', padding: '0.75rem', color: '#991b1b', fontSize: '0.875rem', marginBottom: '1rem' }}><AlertCircle size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />{error}</div>}
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                                    <button onClick={() => setStep(0)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
                                    <button onClick={handleDatesNext} className="btn-primary" style={{ flex: 2, justifyContent: 'center' }}>
                                        Continue to Payment →
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* ── STEP 2: Payment Summary ── */}
                        {step === 2 && (
                            <div>
                                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E', marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <CreditCard size={20} style={{ color: '#D4854A' }} /> Review & Pay
                                </h2>
                                <div style={{ background: '#f7f8fc', borderRadius: '1rem', padding: '1.5rem', marginBottom: '1.5rem' }}>
                                    <h3 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#7a7a9a', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>Booking Summary</h3>
                                    {[
                                        ['Guest', form.name],
                                        ['Email', form.email],
                                        ['Phone', form.phone],
                                        ['Room', selectedRoom?.name || '—'],
                                        ['Check-In', new Date(form.checkIn).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })],
                                        ['Check-Out', new Date(form.checkOut).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })],
                                        ['Guests', form.guests],
                                    ].map(([k, v]) => (
                                        <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid #eee', fontSize: '0.875rem' }}>
                                            <span style={{ color: '#7a7a9a' }}>{k}</span>
                                            <span style={{ color: '#1A1A2E', fontWeight: 500 }}>{v}</span>
                                        </div>
                                    ))}
                                    {selectedRoom && (() => {
                                        const nights = Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / (1000 * 60 * 60 * 24));
                                        const total = nights * selectedRoom.pricePerNight;
                                        return (
                                            <div style={{ marginTop: '1rem', padding: '1rem', background: 'white', borderRadius: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>{nights} night{nights > 1 ? 's' : ''} × ₹{selectedRoom.pricePerNight?.toLocaleString()}</span>
                                                <span style={{ fontWeight: 700, color: '#D4854A', fontSize: '1.25rem' }}>₹{total?.toLocaleString('en-IN')}</span>
                                            </div>
                                        );
                                    })()}
                                </div>
                                {error && <div style={{ background: '#fee2e2', borderRadius: '0.5rem', padding: '0.75rem', color: '#991b1b', fontSize: '0.875rem', marginBottom: '1rem' }}>{error}</div>}
                                <div style={{ display: 'flex', gap: '1rem' }}>
                                    <button onClick={() => setStep(1)} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>← Back</button>
                                    <button onClick={handlePayment} disabled={loading} className="btn-primary" style={{ flex: 2, justifyContent: 'center', fontSize: '1rem', padding: '0.85rem', gap: '0.5rem' }}>
                                        {loading ? <><Loader size={16} style={{ animation: 'spin 1s linear infinite' }} /> Processing...</> : <><CreditCard size={16} /> Pay & Confirm</>}
                                    </button>
                                </div>
                                <p style={{ textAlign: 'center', color: '#7a7a9a', fontSize: '0.75rem', marginTop: '1rem' }}>
                                    🔒 Secured by Razorpay · SSL encrypted · No hidden charges
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
