import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Wind, Eye, Coffee, Users, Star } from 'lucide-react';
import { getRooms } from '../services/api';

const amenityIcons = {
    WiFi: <Wifi size={14} />, AC: <Wind size={14} />, 'Beach View': <Eye size={14} />,
    Balcony: <Star size={14} />, Breakfast: <Coffee size={14} />, default: <Star size={14} />,
};

const fallbackRooms = [
    { _id: '1', name: 'Ocean View Deluxe', description: 'Wake up to stunning ocean views from your private balcony in this beautiful room.', pricePerNight: 3500, capacity: 2, amenities: ['WiFi', 'AC', 'Beach View', 'Balcony'], images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'], beachView: true },
    { _id: '2', name: 'Garden Retreat', description: 'A serene garden-facing room with lush greenery and tropical vibes.', pricePerNight: 2200, capacity: 2, amenities: ['WiFi', 'AC', 'Breakfast'], images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80'], beachView: false },
    { _id: '3', name: 'Beach Bungalow', description: 'Private bungalow just 50 meters from the shore with a hammock porch.', pricePerNight: 5000, capacity: 4, amenities: ['WiFi', 'Beach View', 'Balcony', 'Breakfast'], images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80'], beachView: true },
];

export default function RoomsPage() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getRooms().then(r => { setRooms(r.data.length > 0 ? r.data : fallbackRooms); setLoading(false); })
            .catch(() => { setRooms(fallbackRooms); setLoading(false); });
    }, []);

    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #1E6FA8 0%, #155a8a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ color: '#a8d8f0', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Your Perfect Retreat</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Rooms & Stay</h1>
                <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '500px', margin: '0 auto' }}>From beachside bungalows to cozy garden rooms — find your ideal Gokarna stay.</p>
            </div>

            <section className="section-padded">
                <div className="container">
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {[...Array(3)].map((_, i) => <div key={i} style={{ height: '380px', borderRadius: '1.25rem', background: '#f0f0f0' }} />)}
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                            {rooms.map(room => (
                                <div key={room._id} className="card">
                                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                                        <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'}
                                            alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                                        {room.beachView && (
                                            <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#D4854A', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>
                                                🌊 Beach View
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1A1A2E' }}>{room.name}</h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#7a7a9a', fontSize: '0.8rem' }}>
                                                <Users size={14} /> {room.capacity}
                                            </div>
                                        </div>
                                        <p style={{ color: '#7a7a9a', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>{room.description?.slice(0, 100)}...</p>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                                            {(room.amenities || []).slice(0, 4).map(a => (
                                                <span key={a} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#f0f7ff', color: '#1E6FA8', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
                                                    {amenityIcons[a] || amenityIcons.default} {a}
                                                </span>
                                            ))}
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <span style={{ fontSize: '1.4rem', fontWeight: 700, color: '#D4854A' }}>₹{room.pricePerNight?.toLocaleString()}</span>
                                                <span style={{ color: '#7a7a9a', fontSize: '0.8rem' }}>/night</span>
                                            </div>
                                            <Link to={`/rooms/${room._id}`} className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
                                                View & Book
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
