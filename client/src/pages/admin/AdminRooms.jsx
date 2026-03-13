import { useEffect, useState } from 'react';
import { Plus, Trash2, Edit, X } from 'lucide-react';
import { getRooms, createRoom, deleteRoom } from '../../services/api';

export default function AdminRooms() {
    const [rooms, setRooms] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', pricePerNight: '', capacity: 2, amenities: '', category: 'Standard', beachView: false });
    const [loading, setLoading] = useState(false);

    const load = () => getRooms().then(r => setRooms(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => {
            if (k === 'amenities') fd.append(k, JSON.stringify(v.split(',').map(s => s.trim()).filter(Boolean)));
            else fd.append(k, v);
        });
        try { await createRoom(fd); load(); setShowForm(false); setForm({ name: '', description: '', pricePerNight: '', capacity: 2, amenities: '', category: 'Standard', beachView: false }); }
        catch { alert('Failed to create room.'); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this room?')) return;
        await deleteRoom(id);
        load();
    };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E' }}>Rooms</h1>
                    <p style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>{rooms.length} room{rooms.length !== 1 ? 's' : ''} listed</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary" style={{ gap: '0.5rem' }}><Plus size={16} /> Add Room</button>
            </div>

            {/* Add Room Modal */}
            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '560px', maxHeight: '90vh', overflowY: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E' }}>Add New Room</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#7a7a9a' }}><X size={20} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label>Room Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ocean View Deluxe" /></div>
                            <div className="form-group"><label>Description *</label><textarea required rows="3" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group"><label>Price per Night (₹) *</label><input required type="number" value={form.pricePerNight} onChange={e => setForm(f => ({ ...f, pricePerNight: e.target.value }))} /></div>
                                <div className="form-group"><label>Capacity *</label><input required type="number" min="1" value={form.capacity} onChange={e => setForm(f => ({ ...f, capacity: e.target.value }))} /></div>
                            </div>
                            <div className="form-group"><label>Amenities (comma-separated)</label><input value={form.amenities} onChange={e => setForm(f => ({ ...f, amenities: e.target.value }))} placeholder="WiFi, AC, Beach View, Balcony" /></div>
                            <div className="form-group"><label>Category</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                    {['Standard', 'Deluxe', 'Suite', 'Bungalow', 'Cottage'].map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <input type="checkbox" id="beachView" checked={form.beachView} onChange={e => setForm(f => ({ ...f, beachView: e.target.checked }))} />
                                <label htmlFor="beachView" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Beach View Room</label>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                {loading ? 'Creating...' : 'Create Room'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {rooms.map(room => (
                    <div key={room._id} style={{ background: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                        <div style={{ height: '160px', overflow: 'hidden', position: 'relative' }}>
                            <img src={room.images?.[0] || 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80'} alt={room.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            {room.beachView && <span style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: '#D4854A', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.7rem' }}>Beach View</span>}
                        </div>
                        <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div><h3 style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '0.15rem' }}>{room.name}</h3>
                                    <p style={{ color: '#D4854A', fontWeight: 700 }}>₹{room.pricePerNight?.toLocaleString()}/night</p></div>
                                <button onClick={() => handleDelete(room._id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '0.5rem', padding: '0.4rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={15} /></button>
                            </div>
                        </div>
                    </div>
                ))}
                {rooms.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>No rooms yet. Click "Add Room" to get started.</div>}
            </div>
        </div>
    );
}
