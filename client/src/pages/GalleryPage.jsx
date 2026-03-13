import { useEffect, useState } from 'react';
import { X, Filter } from 'lucide-react';
import { getGallery } from '../services/api';

const CATEGORIES = ['All', 'Cafe', 'Rooms', 'Beach', 'Food', 'Sunset', 'Activities'];

const fallbackImages = [
    { _id: '1', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80', caption: 'Gokarna Beach', category: 'Beach' },
    { _id: '2', imageUrl: 'https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80', caption: 'Our Cafe', category: 'Cafe' },
    { _id: '3', imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', caption: 'Ocean View Room', category: 'Rooms' },
    { _id: '4', imageUrl: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=600&q=80', caption: 'Fresh Food', category: 'Food' },
    { _id: '5', imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80', caption: 'Gokarna Sunset', category: 'Sunset' },
    { _id: '6', imageUrl: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&q=80', caption: 'Beach Activities', category: 'Activities' },
    { _id: '7', imageUrl: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80', caption: 'Om Beach', category: 'Beach' },
    { _id: '8', imageUrl: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80', caption: 'Desserts', category: 'Food' },
    { _id: '9', imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', caption: 'Mountain Beach', category: 'Beach' },
    { _id: '10', imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', caption: 'Beach Bungalow', category: 'Rooms' },
    { _id: '11', imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80', caption: 'Morning Coffee', category: 'Cafe' },
    { _id: '12', imageUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&q=80', caption: 'Yoga on Beach', category: 'Activities' },
];

export default function GalleryPage() {
    const [images, setImages] = useState([]);
    const [category, setCategory] = useState('All');
    const [lightbox, setLightbox] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getGallery().then(r => { setImages(r.data.length > 0 ? r.data : fallbackImages); setLoading(false); })
            .catch(() => { setImages(fallbackImages); setLoading(false); });
    }, []);

    const filtered = category === 'All' ? images : images.filter(i => i.category === category);

    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #1A1A2E 0%, #2d2d4e 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Gallery</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)' }}>Moments from our little paradise in Gokarna</p>
            </div>

            {/* Filter */}
            <div style={{ background: 'white', borderBottom: '1px solid #f0e8dc', padding: '1rem 0', position: 'sticky', top: '70px', zIndex: 40 }}>
                <div className="container" style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', alignItems: 'center' }}>
                    <Filter size={16} style={{ color: '#7a7a9a', flexShrink: 0 }} />
                    {CATEGORIES.map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)}
                            style={{
                                padding: '0.4rem 1rem', borderRadius: '9999px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '0.875rem',
                                background: category === cat ? '#1A1A2E' : '#f5f5f5', color: category === cat ? 'white' : '#555', fontWeight: category === cat ? 600 : 400, transition: 'all 0.2s'
                            }}>
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <section className="section-padded">
                <div className="container">
                    <div style={{ columns: '3 280px', gap: '1rem' }}>
                        {filtered.map((img, i) => (
                            <div key={img._id} onClick={() => setLightbox(i)}
                                style={{ breakInside: 'avoid', marginBottom: '1rem', borderRadius: '0.75rem', overflow: 'hidden', cursor: 'zoom-in', position: 'relative' }}>
                                <img src={img.imageUrl} alt={img.caption || 'Gallery'} style={{ width: '100%', display: 'block', transition: 'transform 0.4s' }}
                                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                                {img.caption && (
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0.75rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: 'white', fontSize: '0.8rem', fontWeight: 500 }}>
                                        {img.caption}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                    {!loading && filtered.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '4rem', color: '#7a7a9a' }}>No images in this category.</div>
                    )}
                </div>
            </section>

            {/* Lightbox */}
            {lightbox !== null && (
                <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
                    <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={20} />
                    </button>
                    <img src={filtered[lightbox]?.imageUrl} alt="" style={{ maxWidth: '90vw', maxHeight: '85vh', objectFit: 'contain', borderRadius: '0.75rem' }} onClick={e => e.stopPropagation()} />
                    {filtered[lightbox]?.caption && (
                        <p style={{ position: 'absolute', bottom: '2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{filtered[lightbox].caption}</p>
                    )}
                </div>
            )}
        </div>
    );
}
