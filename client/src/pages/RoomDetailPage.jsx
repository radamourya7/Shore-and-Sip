import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Wifi, Wind, Eye, Coffee, Users, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { getRoom, getBookedDates } from '../services/api';

export default function RoomDetailPage() {
    const { id } = useParams();
    const [room, setRoom] = useState(null);
    const [imgIdx, setImgIdx] = useState(0);
    const [bookedDates, setBookedDates] = useState([]);
    const [loading, setLoading] = useState(true);

    const fallbackRoom = {
        _id: id, name: 'Ocean View Deluxe', description: 'Wake up to stunning ocean views from your private balcony. This beautifully appointed room features premium bedding, a spacious bathroom with rain shower, and a private balcony overlooking the Arabian Sea. Perfect for a romantic getaway or a peaceful solo retreat.', pricePerNight: 3500, capacity: 2,
        amenities: ['WiFi', 'AC', 'Beach View', 'Balcony', 'Breakfast', 'Hot Water'],
        images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80', 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80'],
        beachView: true,
    };

    useEffect(() => {
        getRoom(id).then(r => { setRoom(r.data); setLoading(false); })
            .catch(() => { setRoom(fallbackRoom); setLoading(false); });
        getBookedDates(id).then(r => setBookedDates(r.data)).catch(() => { });
    }, [id]);

    if (loading) return <div style={{ textAlign: 'center', padding: '8rem', color: '#7a7a9a' }}>Loading...</div>;
    if (!room) return <div style={{ textAlign: 'center', padding: '8rem', color: '#7a7a9a' }}>Room not found.</div>;

    const imgs = room.images?.length > 0 ? room.images : [fallbackRoom.images[0]];

    return (
        <div>
            <div style={{ background: '#f7f5f0', padding: '1.5rem 0' }}>
                <div className="container">
                    <Link to="/rooms" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#7a7a9a', textDecoration: 'none', fontSize: '0.875rem' }}>
                        <ArrowLeft size={16} /> Back to Rooms
                    </Link>
                </div>
            </div>

            <section className="section-padded" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '3rem', alignItems: 'start' }}>
                        {/* Left - Images + Details */}
                        <div>
                            {/* Image Gallery */}
                            <div style={{ position: 'relative', borderRadius: '1.25rem', overflow: 'hidden', marginBottom: '1rem', height: '420px' }}>
                                <img src={imgs[imgIdx]} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                {imgs.length > 1 && (
                                    <>
                                        <button onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)}
                                            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ChevronLeft size={20} />
                                        </button>
                                        <button onClick={() => setImgIdx(i => (i + 1) % imgs.length)}
                                            style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <ChevronRight size={20} />
                                        </button>
                                    </>
                                )}
                            </div>
                            {imgs.length > 1 && (
                                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
                                    {imgs.map((img, i) => (
                                        <div key={i} onClick={() => setImgIdx(i)} style={{ width: '80px', height: '60px', borderRadius: '0.5rem', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${imgIdx === i ? '#D4854A' : 'transparent'}` }}>
                                            <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#1A1A2E' }}>{room.name}</h1>
                                {room.beachView && (
                                    <span style={{ background: 'rgba(212,133,74,0.1)', color: '#D4854A', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 600 }}>🌊 Beach View</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#7a7a9a' }}>
                                <Users size={16} /> <span style={{ fontSize: '0.9rem' }}>Up to {room.capacity} guests</span>
                            </div>
                            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>{room.description}</p>
                            <h3 style={{ fontWeight: 600, marginBottom: '1rem', color: '#1A1A2E' }}>Amenities</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {(room.amenities || []).map(a => (
                                    <span key={a} style={{ background: '#f0f7ff', color: '#1E6FA8', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 500 }}>{a}</span>
                                ))}
                            </div>
                        </div>

                        {/* Right - Booking Card */}
                        <div style={{ position: 'sticky', top: '80px' }}>
                            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
                                <div style={{ marginBottom: '1.5rem' }}>
                                    <span style={{ fontSize: '2rem', fontWeight: 700, color: '#D4854A' }}>₹{room.pricePerNight?.toLocaleString()}</span>
                                    <span style={{ color: '#7a7a9a', fontSize: '0.9rem' }}> / night</span>
                                </div>
                                <p style={{ color: '#7a7a9a', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Ready to book this room? Click below to fill the booking form.</p>
                                <Link to={`/book/${room._id}`} className="btn-primary" style={{ display: 'block', textAlign: 'center', fontSize: '1rem', padding: '0.85rem' }}>
                                    Book This Room
                                </Link>
                                <p style={{ textAlign: 'center', fontSize: '0.75rem', color: '#7a7a9a', marginTop: '1rem' }}>No payment required upfront</p>
                                <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                                    <h4 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem', color: '#1A1A2E' }}>Need help?</h4>
                                    <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#25D366', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500 }}>
                                        <span>💬</span> Chat on WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
