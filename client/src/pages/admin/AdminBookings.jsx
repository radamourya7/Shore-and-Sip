import { useEffect, useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';
import { getBookings, updateBookingStatus, deleteBooking } from '../../services/api';

export default function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = () => getBookings().then(r => { setBookings(r.data); setLoading(false); }).catch(() => setLoading(false));
    useEffect(() => { load(); }, []);

    const handleStatus = async (id, status) => {
        await updateBookingStatus(id, status);
        load();
    };
    const handleDelete = async (id) => {
        if (!confirm('Delete this booking?')) return;
        await deleteBooking(id);
        load();
    };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Bookings</h1>
            <p style={{ color: '#7a7a9a', fontSize: '0.875rem', marginBottom: '2rem' }}>{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>

            {loading ? <p>Loading...</p> : (
                <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #f0f0f0', background: '#fafafa' }}>
                                {['Guest', 'Email', 'Phone', 'Room', 'Check-In', 'Check-Out', 'Guests', 'Amount', 'Status', 'Actions'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#7a7a9a', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                    <td style={{ padding: '0.9rem 1rem', fontWeight: 500, color: '#1A1A2E', fontSize: '0.875rem' }}>{b.name}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.8rem' }}>{b.email}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.8rem' }}>{b.phone}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.8rem' }}>{b.room?.name || '—'}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#7a7a9a', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{new Date(b.checkIn).toLocaleDateString('en-IN')}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#7a7a9a', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{new Date(b.checkOut).toLocaleDateString('en-IN')}</td>
                                    <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.8rem' }}>{b.guests}</td>
                                    <td style={{ padding: '0.9rem 1rem', fontWeight: 600, color: '#D4854A', fontSize: '0.875rem' }}>₹{b.totalAmount?.toLocaleString()}</td>
                                    <td style={{ padding: '0.9rem 1rem' }}>
                                        <span className={`badge badge-${b.status}`}>{b.status}</span>
                                    </td>
                                    <td style={{ padding: '0.9rem 1rem' }}>
                                        <div style={{ display: 'flex', gap: '0.4rem' }}>
                                            {b.status !== 'confirmed' && (
                                                <button onClick={() => handleStatus(b._id, 'confirmed')} title="Confirm" style={{ background: '#d1fae5', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#065f46' }}><Check size={14} /></button>
                                            )}
                                            {b.status !== 'cancelled' && (
                                                <button onClick={() => handleStatus(b._id, 'cancelled')} title="Cancel" style={{ background: '#fee2e2', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#991b1b' }}><X size={14} /></button>
                                            )}
                                            <button onClick={() => handleDelete(b._id)} title="Delete" style={{ background: '#f5f5f5', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#555' }}><Trash2 size={14} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {bookings.length === 0 && (
                                <tr><td colSpan={10} style={{ padding: '3rem', textAlign: 'center', color: '#7a7a9a' }}>No bookings yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
