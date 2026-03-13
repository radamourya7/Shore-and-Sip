import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Waves } from 'lucide-react';

const links = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/rooms', label: 'Rooms' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/guide', label: 'Guide' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav style={{ background: 'rgba(255,253,248,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #f0e8dc' }}
            className="sticky top-0 z-50 w-full">
            <div className="container flex items-center justify-between" style={{ padding: '1rem 1.5rem' }}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', color: '#1A1A2E', textDecoration: 'none' }}>
                    <Waves size={28} style={{ color: '#D4854A' }} />
                    <span>Shore <span style={{ color: '#D4854A' }}>&</span> Sip</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map(l => (
                        <NavLink key={l.to} to={l.to} end={l.to === '/'}
                            style={({ isActive }) => ({
                                padding: '0.5rem 1rem',
                                borderRadius: '9999px',
                                textDecoration: 'none',
                                fontWeight: 500,
                                fontSize: '0.9rem',
                                transition: 'all 0.2s',
                                color: isActive ? '#D4854A' : '#333344',
                                background: isActive ? 'rgba(212,133,74,0.1)' : 'transparent',
                            })}>
                            {l.label}
                        </NavLink>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden md:flex items-center gap-3">
                    <Link to="/reserve" className="btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Reserve Table</Link>
                    <Link to="/rooms" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>Book Stay</Link>
                </div>

                {/* Mobile Menu Button */}
                <button onClick={() => setOpen(!open)} className="md:hidden" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1A1A2E' }}>
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            {open && (
                <div style={{ background: 'white', borderTop: '1px solid #f0e8dc', padding: '1rem 1.5rem' }}>
                    {links.map(l => (
                        <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}
                            style={{ display: 'block', padding: '0.75rem 0', textDecoration: 'none', color: '#333344', fontWeight: 500, borderBottom: '1px solid #f5f5f5' }}>
                            {l.label}
                        </NavLink>
                    ))}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
                        <Link to="/reserve" onClick={() => setOpen(false)} className="btn-outline" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}>Reserve Table</Link>
                        <Link to="/rooms" onClick={() => setOpen(false)} className="btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: '0.875rem' }}>Book Stay</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
