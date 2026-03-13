import { useEffect, useState } from 'react';
import { Star, Send, CheckCircle } from 'lucide-react';
import { getReviews, createReview } from '../services/api';

function StarRating({ value, onChange }) {
    const [hovered, setHovered] = useState(0);
    return (
        <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={28} fill={(hovered || value) >= n ? '#F59E0B' : 'none'} stroke={(hovered || value) >= n ? '#F59E0B' : '#d1d5db'}
                    style={{ cursor: 'pointer' }} onMouseEnter={() => setHovered(n)} onMouseLeave={() => setHovered(0)} onClick={() => onChange(n)} />
            ))}
        </div>
    );
}

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', rating: 0, comment: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getReviews().then(r => setReviews(r.data)).catch(() => { });
    }, []);

    const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.rating) { alert('Please select a star rating.'); return; }
        setLoading(true);
        try {
            await createReview(form);
            setSubmitted(true);
        } catch {
            alert('Failed to submit review. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Guest Reviews</h1>
                {avg && <p style={{ color: 'rgba(255,255,255,0.8)' }}>⭐ {avg} out of 5 — based on {reviews.length} verified reviews</p>}
            </div>

            <section className="section-padded">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'start' }}>
                        {/* Reviews */}
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#1A1A2E', marginBottom: '1.5rem' }}>
                                {reviews.length > 0 ? `${reviews.length} Reviews` : 'No reviews yet — be the first!'}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                {reviews.map(r => (
                                    <div key={r._id} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'linear-gradient(135deg, #D4854A, #1E6FA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>{r.name?.[0]}</div>
                                                <div>
                                                    <p style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.95rem' }}>{r.name}</p>
                                                    <p style={{ fontSize: '0.75rem', color: '#7a7a9a' }}>{new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '2px' }}>
                                                {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < r.rating ? '#F59E0B' : 'none'} stroke={i < r.rating ? '#F59E0B' : '#d1d5db'} />)}
                                            </div>
                                        </div>
                                        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic' }}>"{r.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Submit Review */}
                        <div style={{ position: 'sticky', top: '80px' }}>
                            {submitted ? (
                                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                                    <CheckCircle size={56} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Thanks for your Review!</h3>
                                    <p style={{ color: '#7a7a9a', fontSize: '0.9rem' }}>Your review will appear after admin approval.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E', marginBottom: '1.5rem' }}>Share Your Experience</h3>
                                    <div className="form-group">
                                        <label>Your Name *</label>
                                        <input required type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="John Doe" />
                                    </div>
                                    <div className="form-group">
                                        <label>Email *</label>
                                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="john@email.com" />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating *</label>
                                        <StarRating value={form.rating} onChange={n => setForm(f => ({ ...f, rating: n }))} />
                                    </div>
                                    <div className="form-group">
                                        <label>Your Review *</label>
                                        <textarea required rows="4" value={form.comment} onChange={e => setForm(f => ({ ...f, comment: e.target.value }))} placeholder="Tell us about your experience..." style={{ resize: 'vertical' }} />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', gap: '0.5rem' }}>
                                        <Send size={16} /> {loading ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
