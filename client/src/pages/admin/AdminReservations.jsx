import { useEffect, useState } from 'react';
import { Trash2, Check, X } from 'lucide-react';
import { getReservations, updateReservation, deleteReservation } from '../../services/api';

export default function AdminReservations() {
    const [reservations, setReservations] = useState([]);

    const load = () => getReservations().then(r => setReservations(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleStatus = async (id, status) => { await updateReservation(id, status); load(); };
    const del = async (id) => { if (!confirm('Delete?')) return; await deleteReservation(id); load(); };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Table Reservations</h1>
            <p style={{ color: '#7a7a9a', fontSize: '0.875rem', marginBottom: '2rem' }}>{reservations.length} reservation{reservations.length !== 1 ? 's' : ''}</p>
            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f0f0f0', background: '#fafafa' }}>
                            {['Name', 'Phone', 'Date', 'Time', 'Guests', 'Status', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#7a7a9a', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map(r => (
                            <tr key={r._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '0.9rem 1rem', fontWeight: 500, color: '#1A1A2E', fontSize: '0.875rem' }}>{r.name}</td>
                                <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.8rem' }}>{r.phone}</td>
                                <td style={{ padding: '0.9rem 1rem', color: '#7a7a9a', fontSize: '0.8rem' }}>{new Date(r.date).toLocaleDateString('en-IN')}</td>
                                <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.875rem' }}>{r.time}</td>
                                <td style={{ padding: '0.9rem 1rem', color: '#555', fontSize: '0.875rem' }}>{r.guests}</td>
                                <td style={{ padding: '0.9rem 1rem' }}><span className={`badge badge-${r.status}`}>{r.status}</span></td>
                                <td style={{ padding: '0.9rem 1rem' }}>
                                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                                        {r.status !== 'confirmed' && <button onClick={() => handleStatus(r._id, 'confirmed')} style={{ background: '#d1fae5', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#065f46' }}><Check size={14} /></button>}
                                        {r.status !== 'cancelled' && <button onClick={() => handleStatus(r._id, 'cancelled')} style={{ background: '#fee2e2', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#991b1b' }}><X size={14} /></button>}
                                        <button onClick={() => del(r._id)} style={{ background: '#f5f5f5', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#555' }}><Trash2 size={14} /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {reservations.length === 0 && <tr><td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: '#7a7a9a' }}>No reservations yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
