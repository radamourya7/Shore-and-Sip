import { useEffect, useState } from 'react';
import { CalendarCheck, Bed, UtensilsCrossed, MessageSquare, Star, BookOpen, TrendingUp } from 'lucide-react';
import { getBookings, getRooms, getMenu, getMessages, getAllReviews, getReservations } from '../../services/api';

export default function AdminDashboard() {
    const [stats, setStats] = useState({ bookings: 0, rooms: 0, menu: 0, messages: 0, reviews: 0, reservations: 0 });
    const [recentBookings, setRecentBookings] = useState([]);

    useEffect(() => {
        Promise.allSettled([getBookings(), getRooms(), getMenu(), getMessages(), getAllReviews(), getReservations()])
            .then(([b, r, m, msg, rev, res]) => {
                const bookings = b.status === 'fulfilled' ? b.value.data : [];
                setStats({
                    bookings: bookings.length,
                    rooms: r.status === 'fulfilled' ? r.value.data.length : 0,
                    menu: m.status === 'fulfilled' ? m.value.data.length : 0,
                    messages: msg.status === 'fulfilled' ? msg.value.data.length : 0,
                    reviews: rev.status === 'fulfilled' ? rev.value.data.length : 0,
                    reservations: res.status === 'fulfilled' ? res.value.data.length : 0,
                });
                setRecentBookings(bookings.slice(0, 5));
            });
    }, []);

    const cards = [
        { icon: <CalendarCheck size={24} />, label: 'Total Bookings', value: stats.bookings, color: '#D4854A', bg: 'rgba(212,133,74,0.1)' },
        { icon: <Bed size={24} />, label: 'Rooms', value: stats.rooms, color: '#1E6FA8', bg: 'rgba(30,111,168,0.1)' },
        { icon: <UtensilsCrossed size={24} />, label: 'Menu Items', value: stats.menu, color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
        { icon: <BookOpen size={24} />, label: 'Reservations', value: stats.reservations, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
        { icon: <Star size={24} />, label: 'Reviews', value: stats.reviews, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
        { icon: <MessageSquare size={24} />, label: 'Messages', value: stats.messages, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
    ];

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E' }}>Dashboard Overview</h1>
                <p style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>Welcome back! Here's what's happening at Shore & Sip.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
                {cards.map((c, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                        <div style={{ width: '46px', height: '46px', borderRadius: '0.75rem', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, marginBottom: '1rem' }}>{c.icon}</div>
                        <p style={{ fontSize: '2rem', fontWeight: 700, color: '#1A1A2E', lineHeight: 1 }}>{c.value}</p>
                        <p style={{ fontSize: '0.8rem', color: '#7a7a9a', marginTop: '0.25rem' }}>{c.label}</p>
                    </div>
                ))}
            </div>

            {recentBookings.length > 0 && (
                <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#1A1A2E', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <TrendingUp size={18} style={{ color: '#D4854A' }} /> Recent Bookings
                    </h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #f0f0f0' }}>
                                    {['Guest', 'Room', 'Check-In', 'Check-Out', 'Status'].map(h => (
                                        <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.75rem', fontSize: '0.75rem', fontWeight: 600, color: '#7a7a9a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {recentBookings.map(b => (
                                    <tr key={b._id} style={{ borderBottom: '1px solid #f9f9f9' }}>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', fontWeight: 500, color: '#1A1A2E' }}>{b.name}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#555' }}>{b.room?.name || '—'}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#7a7a9a' }}>{new Date(b.checkIn).toLocaleDateString('en-IN')}</td>
                                        <td style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#7a7a9a' }}>{new Date(b.checkOut).toLocaleDateString('en-IN')}</td>
                                        <td style={{ padding: '0.75rem' }}>
                                            <span className={`badge badge-${b.status}`}>{b.status}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
