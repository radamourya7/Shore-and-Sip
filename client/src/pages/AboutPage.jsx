export default function AboutPage() {
    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #1E6FA8 0%, #155a8a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Our Story</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto' }}>A little cafe with big ocean dreams, born from a love for Gokarna.</p>
            </div>

            <section className="section-padded">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {/* Story */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '1rem' }}>How Shore & Sip Began</h2>
                            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
                                Shore & Sip was born from a simple dream — to create a place where travelers could slow down, sip a good coffee, and feel the sand between their toes. Founded in 2019 by two beach lovers who fell in love with Gokarna's magic, our cafe and stay has become a home for wandering souls.
                            </p>
                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem' }}>
                                We started with a handful of tables, a second-hand espresso machine, and three cozy rooms. Today, we're proud to host guests from all over the world who come to experience Gokarna's pristine beaches, ancient temples, and laid-back way of life.
                            </p>
                        </div>
                        <div style={{ borderRadius: '1.25rem', overflow: 'hidden', height: '350px' }}>
                            <img src="https://images.unsplash.com/photo-1559305616-3f99cd43e353?w=600&q=80" alt="Our Cafe" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                    </div>

                    {/* Mission */}
                    <div style={{ background: 'linear-gradient(135deg, #fff8f2, #f0f7ff)', borderRadius: '1.5rem', padding: '3rem', marginBottom: '4rem', textAlign: 'center' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '1rem' }}>Our Mission</h2>
                        <p style={{ color: '#555', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto' }}>
                            To offer every guest a genuine, unhurried experience — good food, comfortable rest, and the kind of warmth that makes a trip unforgettable. We believe travel should feel like coming home.
                        </p>
                    </div>

                    {/* Gokarna */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
                        <div style={{ borderRadius: '1.25rem', overflow: 'hidden', height: '350px' }}>
                            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" alt="Gokarna Beach" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '1rem' }}>About Gokarna</h2>
                            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '1rem', fontSize: '0.95rem' }}>
                                Nestled on the western coast of Karnataka, Gokarna is a sacred town known for its ancient Mahabaleshwar Temple and stunning beaches. Unlike the crowded shores of Goa, Gokarna's beaches — Om Beach, Half Moon Beach, Paradise Beach — remain raw and unspoiled.
                            </p>
                            <p style={{ color: '#555', lineHeight: 1.8, fontSize: '0.95rem' }}>
                                The town blends pilgrimage and paradise, spiritual seekers and surfers, forested hillsides and golden sands. It's a place that gets under your skin and makes you extend your stay — every single time.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div style={{ marginTop: '5rem', textAlign: 'center' }}>
                        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '2.5rem' }}>What We Stand For</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                            {[
                                { emoji: '🌱', title: 'Sustainability', desc: 'We source local, seasonal ingredients and minimize plastic use across our property.' },
                                { emoji: '🤝', title: 'Community', desc: 'We partner with local fishermen, farmers, and artisans to support the Gokarna community.' },
                                { emoji: '💛', title: 'Warmth', desc: 'Every guest is family. We go above and beyond to make every stay memorable.' },
                                { emoji: '🌊', title: 'Nature', desc: 'We respect the ocean, the beaches, and the wildlife that make Gokarna so special.' },
                            ].map((v, i) => (
                                <div key={i} style={{ padding: '1.75rem', borderRadius: '1.25rem', background: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{v.emoji}</div>
                                    <h4 style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '0.5rem' }}>{v.title}</h4>
                                    <p style={{ color: '#7a7a9a', fontSize: '0.85rem', lineHeight: 1.6 }}>{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
