import { useEffect, useState } from 'react';
import { Plus, Trash2, Upload, X } from 'lucide-react';
import { getGallery, uploadGalleryImage, deleteGalleryImage } from '../../services/api';

const CATEGORIES = ['Cafe', 'Rooms', 'Beach', 'Food', 'Sunset', 'Activities'];

export default function AdminGallery() {
    const [images, setImages] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ caption: '', category: 'Beach', image: null });
    const [loading, setLoading] = useState(false);

    const load = () => getGallery().then(r => setImages(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.image) return alert('Please select an image.');
        setLoading(true);
        const fd = new FormData();
        fd.append('image', form.image);
        fd.append('caption', form.caption);
        fd.append('category', form.category);
        try { await uploadGalleryImage(fd); load(); setShowForm(false); setForm({ caption: '', category: 'Beach', image: null }); }
        catch { alert('Failed to upload.'); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this image?')) return;
        await deleteGalleryImage(id);
        load();
    };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E' }}>Gallery</h1>
                    <p style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>{images.length} images</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={16} /> Upload Image</button>
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '460px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E' }}>Upload Image</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} style={{ color: '#7a7a9a' }} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Image File *</label>
                                <input type="file" accept="image/*" required onChange={e => setForm(f => ({ ...f, image: e.target.files[0] }))} />
                            </div>
                            <div className="form-group"><label>Caption</label><input value={form.caption} onChange={e => setForm(f => ({ ...f, caption: e.target.value }))} placeholder="Sunset at Om Beach" /></div>
                            <div className="form-group"><label>Category *</label>
                                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                                <Upload size={16} /> {loading ? 'Uploading...' : 'Upload'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map(img => (
                    <div key={img._id} style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', background: '#f5f5f5', aspectRatio: '4/3' }}>
                        <img src={img.imageUrl} alt={img.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0)', transition: 'background 0.2s', display: 'flex', alignItems: 'flex-end', padding: '0.75rem' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.35)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}>
                            <span style={{ color: 'white', fontSize: '0.75rem', flex: 1, fontWeight: 500 }}>{img.caption || img.category}</span>
                            <button onClick={() => handleDelete(img._id)} style={{ background: 'rgba(239,68,68,0.9)', border: 'none', borderRadius: '0.4rem', padding: '0.3rem', cursor: 'pointer', color: 'white' }}><Trash2 size={13} /></button>
                        </div>
                    </div>
                ))}
                {images.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>No gallery images. Click "Upload Image" to add some.</div>}
            </div>
        </div>
    );
}
