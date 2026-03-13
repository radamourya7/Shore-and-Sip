import { useEffect, useState } from 'react';
import { Plus, Trash2, X, Leaf } from 'lucide-react';
import { getMenu, createMenuItem, deleteMenuItem } from '../../services/api';

const CATEGORIES = ['Coffee', 'Breakfast', 'Main Meals', 'Desserts', 'Beverages', 'Snacks'];

export default function AdminMenu() {
    const [items, setItems] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ name: '', description: '', price: '', category: 'Coffee', isVeg: true });
    const [loading, setLoading] = useState(false);

    const load = () => getMenu().then(r => setItems(r.data)).catch(() => { });
    useEffect(() => { load(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v));
        try { await createMenuItem(fd); load(); setShowForm(false); setForm({ name: '', description: '', price: '', category: 'Coffee', isVeg: true }); }
        catch { alert('Failed to add item.'); }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!confirm('Delete this item?')) return;
        await deleteMenuItem(id);
        load();
    };

    return (
        <div style={{ padding: '2rem', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E' }}>Menu Items</h1>
                    <p style={{ color: '#7a7a9a', fontSize: '0.875rem' }}>{items.length} items on the menu</p>
                </div>
                <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={16} /> Add Item</button>
            </div>

            {showForm && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
                    <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', width: '100%', maxWidth: '480px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#1A1A2E' }}>Add Menu Item</h2>
                            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} style={{ color: '#7a7a9a' }} /></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group"><label>Item Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Cold Brew Coffee" /></div>
                            <div className="form-group"><label>Description</label><textarea rows="2" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} style={{ resize: 'vertical' }} /></div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group"><label>Price (₹) *</label><input required type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                                <div className="form-group"><label>Category *</label>
                                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                                        {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                                <input type="checkbox" id="isVeg" checked={form.isVeg} onChange={e => setForm(f => ({ ...f, isVeg: e.target.checked }))} />
                                <label htmlFor="isVeg" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Vegetarian</label>
                            </div>
                            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{loading ? 'Adding...' : 'Add Item'}</button>
                        </form>
                    </div>
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #f0f0f0', background: '#fafafa' }}>
                            {['Name', 'Category', 'Price', 'Veg', 'Actions'].map(h => (
                                <th key={h} style={{ textAlign: 'left', padding: '1rem', fontSize: '0.75rem', fontWeight: 600, color: '#7a7a9a', textTransform: 'uppercase' }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id} style={{ borderBottom: '1px solid #f5f5f5' }}>
                                <td style={{ padding: '0.85rem 1rem', fontWeight: 500, color: '#1A1A2E', fontSize: '0.875rem' }}>{item.name}</td>
                                <td style={{ padding: '0.85rem 1rem' }}><span style={{ background: 'rgba(212,133,74,0.1)', color: '#D4854A', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>{item.category}</span></td>
                                <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#D4854A', fontSize: '0.875rem' }}>₹{item.price}</td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                                    <span style={{ background: item.isVeg ? '#d1fae5' : '#fee2e2', color: item.isVeg ? '#065f46' : '#991b1b', padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '3px', width: 'fit-content' }}>
                                        <Leaf size={10} /> {item.isVeg ? 'Veg' : 'Non-Veg'}
                                    </span>
                                </td>
                                <td style={{ padding: '0.85rem 1rem' }}>
                                    <button onClick={() => handleDelete(item._id)} style={{ background: '#fee2e2', border: 'none', borderRadius: '0.4rem', padding: '0.35rem 0.5rem', cursor: 'pointer', color: '#ef4444' }}><Trash2 size={14} /></button>
                                </td>
                            </tr>
                        ))}
                        {items.length === 0 && <tr><td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#7a7a9a' }}>No menu items yet.</td></tr>}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
