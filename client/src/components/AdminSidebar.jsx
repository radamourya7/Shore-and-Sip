import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Waves, LayoutDashboard, Bed, CalendarCheck, UtensilsCrossed, Image, MessageSquare, Star, BookOpen, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const nav = [
    { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
    { to: '/admin/bookings', icon: <CalendarCheck size={18} />, label: 'Bookings' },
    { to: '/admin/reservations', icon: <BookOpen size={18} />, label: 'Reservations' },
    { to: '/admin/rooms', icon: <Bed size={18} />, label: 'Rooms' },
    { to: '/admin/menu', icon: <UtensilsCrossed size={18} />, label: 'Menu' },
    { to: '/admin/gallery', icon: <Image size={18} />, label: 'Gallery' },
    { to: '/admin/reviews', icon: <Star size={18} />, label: 'Reviews' },
    { to: '/admin/messages', icon: <MessageSquare size={18} />, label: 'Messages' },
];

export default function AdminSidebar() {
    const { admin, logoutAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => { logoutAdmin(); navigate('/admin/login'); };

    return (
        <div className="admin-sidebar">
            <div style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <Waves size={22} style={{ color: '#D4854A' }} />
                    <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700 }}>Shore & Sip</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.45)' }}>Admin Dashboard</p>
            </div>

            <div style={{ marginBottom: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.07)', borderRadius: '0.75rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.1rem' }}>Logged in as</p>
                <p style={{ fontWeight: 600, fontSize: '0.875rem', color: 'white' }}>{admin?.name}</p>
            </div>

            <nav style={{ flex: 1 }}>
                {nav.map(item => (
                    <NavLink key={item.to} to={item.to} end={item.to === '/admin'}
                        style={({ isActive }) => ({
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '0.7rem 0.75rem', borderRadius: '0.6rem', marginBottom: '0.2rem',
                            textDecoration: 'none', fontSize: '0.875rem', fontWeight: isActive ? 600 : 400,
                            background: isActive ? 'rgba(212,133,74,0.2)' : 'transparent',
                            color: isActive ? '#FFB87A' : 'rgba(255,255,255,0.65)',
                            transition: 'all 0.2s',
                        })}>
                        {item.icon} {item.label}
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <Link to="/" target="_blank" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>← View Website</Link>
                <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.15)', color: '#fca5a5', border: 'none', borderRadius: '0.6rem', padding: '0.6rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem', transition: 'background 0.2s' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>
        </div>
    );
}
