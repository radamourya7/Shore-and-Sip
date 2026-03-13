import { Link } from 'react-router-dom';
import { Waves, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
    return (
        <footer style={{ background: '#1A1A2E', color: 'rgba(255,255,255,0.85)', paddingTop: '3.5rem', paddingBottom: '1.5rem' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                            <Waves size={24} style={{ color: '#D4854A' }} />
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', fontWeight: 700, color: 'white' }}>
                                Shore <span style={{ color: '#D4854A' }}>&</span> Sip
                            </span>
                        </div>
                        <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
                            A cozy beachside cafe and stay nestled in the tranquil town of Gokarna, Karnataka.
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}><Instagram size={20} /></a>
                            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}><Facebook size={20} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.6)', transition: 'color 0.2s' }}><Twitter size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Explore</h4>
                        {[['/', 'Home'], ['/menu', 'Cafe Menu'], ['/rooms', 'Rooms & Stay'], ['/gallery', 'Gallery'], ['/guide', 'Tourist Guide'], ['/about', 'About Us']].map(([to, label]) => (
                            <Link key={to} to={to} style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>{label}</Link>
                        ))}
                    </div>

                    {/* Services */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Services</h4>
                        {[['/book', 'Book a Room'], ['/reserve', 'Table Reservation'], ['/reviews', 'Reviews'], ['/contact', 'Contact Us']].map(([to, label]) => (
                            <Link key={to} to={to} style={{ display: 'block', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}>{label}</Link>
                        ))}
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 style={{ fontWeight: 600, color: 'white', marginBottom: '1rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                            <div className="flex items-start gap-2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                                <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0, color: '#D4854A' }} />
                                <span>Beach Road, Near Om Beach, Gokarna, Karnataka 581326</span>
                            </div>
                            <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                                <Phone size={14} style={{ color: '#D4854A' }} />
                                <a href="tel:+919876543210" style={{ color: 'inherit', textDecoration: 'none' }}>+91 98765 43210</a>
                            </div>
                            <div className="flex items-center gap-2" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                                <Mail size={14} style={{ color: '#D4854A' }} />
                                <a href="mailto:hello@shoreandsip.in" style={{ color: 'inherit', textDecoration: 'none' }}>hello@shoreandsip.in</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>© {new Date().getFullYear()} Shore & Sip Gokarna. All rights reserved.</p>
                    <Link to="/admin/login" style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.25)', textDecoration: 'none' }}>Admin</Link>
                </div>
            </div>
        </footer>
    );
}
