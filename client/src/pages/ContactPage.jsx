import { useState } from 'react';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { sendMessage } from '../services/api';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await sendMessage(form);
            setSent(true);
        } catch {
            alert('Failed to send message. Please try WhatsApp or email directly.');
        }
        setLoading(false);
    };

    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #D4854A 0%, #b8683a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Get in Touch</h1>
                <p style={{ color: 'rgba(255,255,255,0.82)' }}>We'd love to hear from you — a message away from paradise!</p>
            </div>

            <section className="section-padded">
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem', alignItems: 'start' }}>
                        {/* Info */}
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Shore & Sip Gokarna</h2>
                            <p style={{ color: '#7a7a9a', marginBottom: '2rem', lineHeight: 1.7 }}>Whether you have a question about rooms, the menu, or just want to say hello — we're always happy to chat!</p>

                            {[
                                { icon: <MapPin size={20} style={{ color: '#D4854A' }} />, label: 'Address', value: 'Beach Road, Near Om Beach, Gokarna, Karnataka 581326' },
                                { icon: <Phone size={20} style={{ color: '#D4854A' }} />, label: 'Phone', value: '+91 98765 43210', link: 'tel:+919876543210' },
                                { icon: <Mail size={20} style={{ color: '#D4854A' }} />, label: 'Email', value: 'hello@shoreandsip.in', link: 'mailto:hello@shoreandsip.in' },
                            ].map((item, i) => (
                                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                                    <div style={{ width: '44px', height: '44px', background: 'rgba(212,133,74,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{item.icon}</div>
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '0.15rem', fontSize: '0.9rem' }}>{item.label}</p>
                                        {item.link ? <a href={item.link} style={{ color: '#7a7a9a', textDecoration: 'none', fontSize: '0.9rem' }}>{item.value}</a> : <p style={{ color: '#7a7a9a', fontSize: '0.9rem' }}>{item.value}</p>}
                                    </div>
                                </div>
                            ))}

                            <a href="https://wa.me/919876543210?text=Hello%20Shore%20%26%20Sip!" target="_blank" rel="noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: '#25D366', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '9999px', fontWeight: 600, textDecoration: 'none', marginTop: '0.5rem', transition: 'opacity 0.2s' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                Chat on WhatsApp
                            </a>

                            <div style={{ marginTop: '2.5rem', borderRadius: '1rem', overflow: 'hidden', height: '250px' }}>
                                <iframe title="Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15388.408!2d74.3114!3d14.5479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca9d4a5aa31d1%3A0x3f47c4d293a3e1c!2sGokarna%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1709000000000"
                                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" />
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            {sent ? (
                                <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'white', borderRadius: '1.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                                    <CheckCircle size={56} style={{ color: '#22c55e', margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Message Sent!</h3>
                                    <p style={{ color: '#7a7a9a' }}>We'll get back to you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#1A1A2E', marginBottom: '1.75rem' }}>Send Us a Message</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                        <div className="form-group">
                                            <label>Name *</label>
                                            <input type="text" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Your name" />
                                        </div>
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+91 98765 43210" />
                                    </div>
                                    <div className="form-group">
                                        <label>Message *</label>
                                        <textarea required rows="5" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help..." style={{ resize: 'vertical' }} />
                                    </div>
                                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', fontSize: '1rem', gap: '0.5rem' }}>
                                        <Send size={16} /> {loading ? 'Sending...' : 'Send Message'}
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
