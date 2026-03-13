import { useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { createReservation } from '../services/api';

const times = ['08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM', '09:00 PM'];

export default function ReservationPage() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', guests: 2, specialRequests: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createReservation(form);
            setSubmitted(true);
        } catch (err) {
            alert('Reservation failed. Please try again or call us directly.');
        }
        setLoading(false);
    };

    if (submitted) {
        return (
            <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
                <div>
                    <CheckCircle size={72} style={{ color: '#22c55e', margin: '0 auto 1.5rem' }} />
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#1A1A2E', marginBottom: '0.75rem' }}>Table Reserved!</h2>
                    <p style={{ color: '#7a7a9a', maxWidth: '420px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
                        Your table reservation has been received. We'll confirm via WhatsApp or phone shortly.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #1E6FA8 0%, #155a8a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ color: '#a8d8f0', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Dine With Us</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Reserve a Table</h1>
                <p style={{ color: 'rgba(255,255,255,0.75)' }}>Book your spot at our beachside cafe for a memorable dining experience.</p>
            </div>

            <section className="section-padded">
                <div className="container" style={{ maxWidth: '600px' }}>
                    <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div className="form-group">
                                <label>Full Name *</label>
                                <input type="text" required placeholder="Your name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label>Phone Number *</label>
                                <input type="tel" required placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Email (optional)</label>
                            <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            <div className="form-group">
                                <label>Date *</label>
                                <input type="date" required min={new Date().toISOString().split('T')[0]} value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
                            </div>
                            <div className="form-group">
                                <label>Time *</label>
                                <select required value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}>
                                    <option value="">Select time...</option>
                                    {times.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Number of Guests *</label>
                            <input type="number" required min="1" max="20" value={form.guests} onChange={e => setForm(f => ({ ...f, guests: e.target.value }))} />
                        </div>
                        <div className="form-group">
                            <label>Special Requests</label>
                            <textarea rows="3" placeholder="Occasion, dietary preferences, seating preference..." value={form.specialRequests} onChange={e => setForm(f => ({ ...f, specialRequests: e.target.value }))} style={{ resize: 'vertical' }} />
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem' }}>
                            {loading ? 'Submitting...' : 'Reserve My Table'}
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
