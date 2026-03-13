import { useEffect, useState } from 'react';
import { ShoppingBag, Leaf } from 'lucide-react';
import { getMenu } from '../services/api';

const CATEGORIES = ['All', 'Coffee', 'Breakfast', 'Main Meals', 'Desserts', 'Beverages', 'Snacks'];

const fallbackItems = [
    { _id: '1', name: 'Cold Brew', category: 'Coffee', price: 120, isVeg: true, description: 'Smooth cold brew with a hint of chocolate.', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=400&q=80' },
    { _id: '2', name: 'Eggs Benedict', category: 'Breakfast', price: 220, isVeg: false, description: 'Poached eggs on toasted muffin with hollandaise sauce.', image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=400&q=80' },
    { _id: '3', name: 'Grilled Fish Curry', category: 'Main Meals', price: 380, isVeg: false, description: 'Fresh Gokarna catch in coastal spice curry.', image: 'https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=400&q=80' },
    { _id: '4', name: 'Mango Cheesecake', category: 'Desserts', price: 180, isVeg: true, description: 'Creamy cheesecake with fresh Alphonso mango topping.', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80' },
    { _id: '5', name: 'Fresh Lime Soda', category: 'Beverages', price: 80, isVeg: true, description: 'Chilled fresh lime with sweet or salted soda.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=400&q=80' },
    { _id: '6', name: 'Avocado Toast', category: 'Breakfast', price: 190, isVeg: true, description: 'Smashed avocado on sourdough with chilli flakes.', image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=400&q=80' },
    { _id: '7', name: 'Cappuccino', category: 'Coffee', price: 110, isVeg: true, description: 'Rich espresso with velvety steamed milk foam.', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&q=80' },
    { _id: '8', name: 'Pasta Aglio Olio', category: 'Main Meals', price: 280, isVeg: true, description: 'Spaghetti with garlic, chilli, and olive oil.', image: 'https://images.unsplash.com/photo-1627286374174-52d857f89b41?w=400&q=80' },
];

export default function MenuPage() {
    const [items, setItems] = useState([]);
    const [activeCategory, setActiveCategory] = useState('All');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMenu().then(r => {
            setItems(r.data.length > 0 ? r.data : fallbackItems);
            setLoading(false);
        }).catch(() => { setItems(fallbackItems); setLoading(false); });
    }, []);

    const filtered = activeCategory === 'All' ? items : items.filter(i => i.category === activeCategory);

    return (
        <div>
            {/* Page Header */}
            <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ color: '#FFB87A', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Fresh & Flavourful</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Our Cafe Menu</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '500px', margin: '0 auto' }}>Made with love, fresh ingredients, and a dash of coastal magic.</p>
            </div>

            {/* Category Tabs */}
            <div style={{ background: 'white', borderBottom: '1px solid #f0e8dc', position: 'sticky', top: '70px', zIndex: 40 }}>
                <div className="container" style={{ overflowX: 'auto', display: 'flex', gap: '0.25rem', padding: '1rem 1.5rem' }}>
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: '0.5rem 1.25rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                                background: activeCategory === cat ? '#D4854A' : '#f5f5f5',
                                color: activeCategory === cat ? 'white' : '#555',
                                fontWeight: activeCategory === cat ? 600 : 400,
                                transition: 'all 0.2s', fontSize: '0.875rem',
                            }}>{cat}</button>
                    ))}
                </div>
            </div>

            {/* Menu Grid */}
            <section className="section-padded">
                <div className="container">
                    {loading ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                            {[...Array(8)].map((_, i) => <div key={i} style={{ height: '280px', borderRadius: '1.25rem', background: '#f0f0f0', animation: 'pulse 1.5s infinite' }} />)}
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
                            {filtered.map(item => (
                                <div key={item._id} className="card" style={{ position: 'relative' }}>
                                    <div style={{ height: '180px', overflow: 'hidden' }}>
                                        <img src={item.image || 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&q=80'}
                                            alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                            onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                                            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                                    </div>
                                    <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                                        <span style={{ background: item.isVeg ? '#22c55e' : '#ef4444', width: '20px', height: '20px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <Leaf size={12} color="white" />
                                        </span>
                                    </div>
                                    <div style={{ padding: '1.25rem' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
                                            <h3 style={{ fontWeight: 600, color: '#1A1A2E', fontSize: '1rem' }}>{item.name}</h3>
                                            <span style={{ fontWeight: 700, color: '#D4854A', fontSize: '1rem', whiteSpace: 'nowrap' }}>₹{item.price}</span>
                                        </div>
                                        <span style={{ background: 'rgba(212,133,74,0.1)', color: '#D4854A', padding: '0.15rem 0.6rem', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, display: 'inline-block', marginBottom: '0.5rem' }}>{item.category}</span>
                                        <p style={{ fontSize: '0.8rem', color: '#7a7a9a', lineHeight: 1.6 }}>{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!loading && filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>
                            <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
                            <p>No items in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
