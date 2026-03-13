import { useEffect, useState } from 'react';
import { Trash2, Mail, Eye } from 'lucide-react';
import { getMessages, markMessageRead, deleteMessage } from '../../services/api';

export default function AdminMessages() {
    const [messages, setMessages] = useState([]);

    const load = () => getMessages().then(r => setMessages(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleRead = async (id) => { await markMessageRead(id); load(); };
    const handleDelete = async (id) => { if (!confirm('Delete this message?')) return; await deleteMessage(id); load(); };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '0.5rem' }}>Messages</h1>
            <p style={{ color: '#7a7a9a', fontSize: '0.875rem', marginBottom: '2rem' }}>{messages.filter(m => !m.isRead).length} unread messages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {messages.map(m => (
                    <div key={m._id} style={{ background: m.isRead ? 'white' : '#fffbf5', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: m.isRead ? 'none' : '1px solid rgba(212,133,74,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '0.95rem' }}>{m.name}</span>
                                    {!m.isRead && <span style={{ background: '#D4854A', color: 'white', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 600 }}>NEW</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem' }}>
                                    <a href={`mailto:${m.email}`} style={{ color: '#7a7a9a', fontSize: '0.8rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '3px' }}><Mail size={12} />{m.email}</a>
                                    {m.phone && <span style={{ color: '#7a7a9a', fontSize: '0.8rem' }}>📞 {m.phone}</span>}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                                <span style={{ fontSize: '0.75rem', color: '#7a7a9a', whiteSpace: 'nowrap' }}>{new Date(m.createdAt).toLocaleDateString('en-IN')}</span>
                                {!m.isRead && <button onClick={() => handleRead(m._id)} title="Mark read" style={{ background: '#d1fae5', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#065f46' }}><Eye size={14} /></button>}
                                <button onClick={() => handleDelete(m._id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                            </div>
                        </div>
                        <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.6 }}>{m.message}</p>
                    </div>
                ))}
                {messages.length === 0 && <div style={{ textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>No messages yet.</div>}
            </div>
        </div>
    );
}
