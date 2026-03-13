import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowRight, Star, MapPin, Wifi, Coffee, Bed, Sunset, ChevronRight } from 'lucide-react';
import { getReviews, getRooms } from '../services/api';

const heroImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80',
    'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1600&q=80',
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1600&q=80',
];

const highlights = [
    { icon: <Coffee size={28} />, title: 'Artisan Coffee', desc: 'Freshly brewed specialty coffees with a view of the Arabian Sea.' },
    { icon: <Bed size={28} />, title: 'Cozy Rooms', desc: 'Thoughtfully designed rooms steps away from pristine beaches.' },
    { icon: <Sunset size={28} />, title: 'Sunset Terrace', desc: 'Watch Gokarna sunsets from our panoramic rooftop terrace.' },
    { icon: <Wifi size={28} />, title: 'Fast WiFi', desc: 'Stay connected while you unwind — high-speed internet throughout.' },
];

const galleryPreviews = [
    'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80',
];

export default function HomePage() {
    const [heroIdx, setHeroIdx] = useState(0);
    const [reviews, setReviews] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        getReviews().then(r => setReviews(r.data.slice(0, 3))).catch(() => { });
        getRooms().then(r => setRooms(r.data.slice(0, 3))).catch(() => { });
    }, []);

    return (
        <div>
            {/* HERO */}
            <section style={{ position: 'relative', height: '100vh', minHeight: '600px', overflow: 'hidden' }}>
                {heroImages.map((img, i) => (
                    <div key={i} style={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'opacity 1s ease', opacity: heroIdx === i ? 1 : 0,
                    }} />
                ))}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.55) 100%)' }} />
                <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', color: 'white' }}>
                    <p style={{ color: '#FFB87A', fontWeight: 600, letterSpacing: '0.15em', marginBottom: '0.75rem', textTransform: 'uppercase', fontSize: '0.875rem' }}>
                        ✦ Gokarna, Karnataka
                    </p>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem', maxWidth: '700px' }}>
                        Where the Beach Meets Your <span style={{ color: '#FFB87A' }}>Perfect Escape</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', maxWidth: '500px', lineHeight: 1.7 }}>
                        Sip artisan coffee, enjoy fresh food, and stay in our cozy beach rooms — all in one magical place.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link to="/rooms" className="btn-primary" style={{ fontSize: '1rem' }}>
                            Book Your Stay <ArrowRight size={18} />
                        </Link>
                        <Link to="/menu" className="btn-outline" style={{ fontSize: '1rem', borderColor: 'white', color: 'white' }}>
                            View Menu
                        </Link>
                    </div>
                </div>
                {/* Hero dots */}
                <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem' }}>
                    {heroImages.map((_, i) => (
                        <button key={i} onClick={() => setHeroIdx(i)}
                            style={{ width: heroIdx === i ? '24px' : '8px', height: '8px', borderRadius: '9999px', background: 'white', opacity: heroIdx === i ? 1 : 0.4, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }} />
                    ))}
                </div>
            </section>

            {/* HIGHLIGHTS */}
            <section className="section-padded" style={{ background: '#FFFDF8' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h2 className="section-heading">Experience Shore & Sip</h2>
                        <p className="section-sub">Everything you need for the perfect Gokarna getaway</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {highlights.map((h, i) => (
                            <div key={i} style={{ textAlign: 'center', padding: '2rem 1.5rem', borderRadius: '1.25rem', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', transition: 'transform 0.3s, box-shadow 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'; }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(212,133,74,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: '#D4854A' }}>{h.icon}</div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem', color: '#1A1A2E' }}>{h.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: '#7a7a9a', lineHeight: 1.6 }}>{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ROOMS HIGHLIGHT */}
            {rooms.length > 0 && (
                <section className="section-padded" style={{ background: 'linear-gradient(135deg, #FFF8F2 0%, #F0F7FF 100%)' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 className="section-heading">Our Rooms</h2>
                                <p className="section-sub" style={{ marginBottom: 0 }}>Comfortable stays just steps from the beach</p>
                            </div>
                            <Link to="/rooms" className="btn-outline" style={{ whiteSpace: 'nowrap' }}>View All Rooms <ChevronRight size={16} /></Link>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {rooms.map(room => (
                                <div key={room._id} className="card">
                                    <div style={{ height: '200px', overflow: 'hidden' }}>
                                        <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80'} alt={room.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.25rem', color: '#1A1A2E' }}>{room.name}</h3>
                                        <p style={{ color: '#7a7a9a', fontSize: '0.875rem', marginBottom: '0.75rem' }}>{room.description?.slice(0, 80)}...</p>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 700, color: '#D4854A', fontSize: '1.1rem' }}>₹{room.pricePerNight?.toLocaleString()}<span style={{ color: '#7a7a9a', fontSize: '0.8rem', fontWeight: 400 }}>/night</span></span>
                                            <Link to={`/rooms/${room._id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>Book Now</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* GALLERY PREVIEW */}
            <section className="section-padded" style={{ background: '#1A1A2E' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 className="section-heading" style={{ color: 'white' }}>Life at Shore & Sip</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>Moments worth capturing in paradise</p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                        {galleryPreviews.map((img, i) => (
                            <div key={i} style={{ aspectRatio: i === 0 ? '1/1' : '1/1', overflow: 'hidden', borderRadius: '0.75rem', gridColumn: i === 0 ? 'span 1' : '' }}>
                                <img src={img} alt="gallery" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                            </div>
                        ))}
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link to="/gallery" className="btn-primary">View Full Gallery <ArrowRight size={16} /></Link>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS */}
            {reviews.length > 0 && (
                <section className="section-padded">
                    <div className="container">
                        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                            <h2 className="section-heading">What Our Guests Say</h2>
                            <p className="section-sub">Real experiences from real travelers</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                            {reviews.map(r => (
                                <div key={r._id} style={{ padding: '1.75rem', borderRadius: '1.25rem', background: 'white', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                    <div style={{ display: 'flex', gap: '2px', marginBottom: '0.75rem' }}>
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} size={16} fill={i < r.rating ? '#F59E0B' : 'none'} stroke={i < r.rating ? '#F59E0B' : '#d1d5db'} />
                                        ))}
                                    </div>
                                    <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem', fontStyle: 'italic' }}>"{r.comment}"</p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4854A, #1E6FA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>{r.name?.[0]}</div>
                                        <div>
                                            <p style={{ fontWeight: 600, fontSize: '0.875rem', color: '#1A1A2E' }}>{r.name}</p>
                                            <p style={{ fontSize: '0.75rem', color: '#7a7a9a' }}>Verified Guest</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <Link to="/reviews" className="btn-outline">Read More Reviews</Link>
                        </div>
                    </div>
                </section>
            )}

            {/* LOCATION */}
            <section className="section-padded" style={{ background: '#F7F5F0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                        <h2 className="section-heading">Find Us in Gokarna</h2>
                        <p className="section-sub"><MapPin size={14} style={{ display: 'inline', color: '#D4854A', marginRight: '4px' }} />Beach Road, Near Om Beach, Gokarna, Karnataka 581326</p>
                    </div>
                    <div style={{ borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', height: '400px' }}>
                        <iframe
                            title="Shore & Sip Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15388.408!2d74.3114!3d14.5479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca9d4a5aa31d1%3A0x3f47c4d293a3e1c!2sGokarna%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709000000000"
                            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
                        />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ background: 'linear-gradient(135deg, #D4854A 0%, #b8683a 100%)', padding: '5rem 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', fontWeight: 700, marginBottom: '1rem' }}>
                        Ready for Your Gokarna Adventure?
                    </h2>
                    <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.1rem', marginBottom: '2rem' }}>Book a room or reserve a table — we can't wait to host you!</p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link to="/book" style={{ background: 'white', color: '#D4854A', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none', transition: 'transform 0.3s' }}>
                            Book a Room
                        </Link>
                        <Link to="/reserve" style={{ background: 'transparent', border: '2px solid white', color: 'white', padding: '0.75rem 2rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none' }}>
                            Reserve a Table
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
