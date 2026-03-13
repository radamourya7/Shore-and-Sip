import { useEffect, useState } from 'react';
import { Trash2, Check, X, Star } from 'lucide-react';
import { getAllReviews, updateReview, deleteReview } from '../../services/api';

export default function AdminReviews() {
    const [reviews, setReviews] = useState([]);

    const load = () => getAllReviews().then(r => setReviews(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handle = async (id, isApproved) => { await updateReview(id, { isApproved }); load(); };
    const del = async (id) => { if (!confirm('Delete?')) return; await deleteReview(id); load(); };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Reviews</h1>
            <p style={{ color: '#7a7a9a', fontSize: '0.875rem', marginBottom: '2rem' }}>{reviews.filter(r => !r.isApproved).length} pending approval</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {reviews.map(r => (
                    <div key={r._id} style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                                <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.9rem' }}>{r.name}</span>
                                <span style={{ fontSize: '0.75rem', color: '#7a7a9a' }}>{r.email}</span>
                                <div style={{ display: 'flex', gap: '1px' }}>
                                    {[...Array(5)].map((_, i) => <Star key={i} size={12} fill={i < r.rating ? '#F59E0B' : 'none'} stroke={i < r.rating ? '#F59E0B' : '#d1d5db'} />)}
                                </div>
                                {r.isApproved ? <span style={{ background: '#d1fae5', color: '#065f46', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>Approved</span>
                                    : <span style={{ background: '#fef3c7', color: '#92400e', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600 }}>Pending</span>}
                            </div>
                            <p style={{ color: '#555', fontSize: '0.875rem', fontStyle: 'italic' }}>"{r.comment}"</p>
                            <p style={{ color: '#7a7a9a', fontSize: '0.75rem', marginTop: '0.25rem' }}>{new Date(r.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                            {!r.isApproved && <button onClick={() => handle(r._id, true)} title="Approve" style={{ background: '#d1fae5', border: 'none', borderRadius: '0.4rem', padding: '0.4rem 0.5rem', cursor: 'pointer', color: '#065f46' }}><Check size={14} /></button>}
                            {r.isApproved && <button onClick={() => handle(r._id, false)} title="Unapprove" style={{ background: '#fef3c7', border: 'none', borderRadius: '0.4rem', padding: '0.4rem 0.5rem', cursor: 'pointer', color: '#92400e' }}><X size={14} /></button>}
                            <button onClick={() => del(r._id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '0.4rem', padding: '0.4rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                        </div>
                    </div>
                ))}
                {reviews.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>No reviews yet.</div>}
            </div>
        </div>
    );
}
