const sections = [
    {
        emoji: '🏖️',
        title: 'Best Beaches in Gokarna',
        items: [
            { name: 'Om Beach', desc: 'Shaped like the Om symbol, this is the most popular beach with cafes, parasailing, and beach yoga.' },
            { name: 'Half Moon Beach', desc: 'A secluded crescent beach accessible by boat or a scenic 30-min trek from Om Beach.' },
            { name: 'Paradise Beach', desc: 'The most remote and pristine beach — perfect for those who want total peace and nature.' },
            { name: 'Gokarna Main Beach', desc: 'A town beach used by pilgrims and locals, great for sunrises and evening walks.' },
            { name: 'Kudle Beach', desc: 'Calm, clean, and perfect for swimming. Lined with cafes and guesthouses.' },
        ],
    },
    {
        emoji: '🧗',
        title: 'Things to Do in Gokarna',
        items: [
            { name: 'Visit Mahabaleshwara Temple', desc: 'One of Karnataka\'s most important Shiva temples, drawing pilgrims and curious travelers alike.' },
            { name: 'Beach Trek', desc: 'Trek from Gokarna Beach to Om to Half Moon to Paradise. Stunning coastal views throughout.' },
            { name: 'Water Sports', desc: 'Try parasailing, banana boat rides, and snorkeling at Om Beach or Kudle Beach.' },
            { name: 'Yoga Retreats', desc: 'Gokarna has numerous yoga studios and retreat centers offering drop-in classes and full programs.' },
            { name: 'Sunset Kayaking', desc: 'Rent a kayak at sunset and paddle along the rocky coastline for unforgettable views.' },
        ],
    },
    {
        emoji: '🌅',
        title: 'Best Sunset Spots',
        items: [
            { name: 'Om Beach Viewpoint', desc: 'Hike up the hill at the southern end of Om Beach for a panoramic sunset view.' },
            { name: 'Kudle Beach', desc: 'Wide open, west-facing beach — perfect for watching the sun sink into the Arabian Sea.' },
            { name: 'Shore & Sip Terrace', desc: 'Our very own rooftop is a local favorite for sundowners with a cold brew or cocktail.' },
            { name: 'Rocky Cliffside Trail', desc: 'The path between Half Moon and Paradise beaches offers dramatic clifftop sunset moments.' },
        ],
    },
    {
        emoji: '💡',
        title: 'Local Travel Tips',
        items: [
            { name: 'Best Time to Visit', desc: 'October to February is ideal. Avoid June–August monsoon when many beaches and boats close.' },
            { name: 'Getting There', desc: 'Nearest railway station is Gokarna Road (2km away). From Goa: 5hrs bus; From Bangalore: 9hrs overnight bus.' },
            { name: 'Getting Around', desc: 'Rent a scooter (₹350–500/day) or take shared autos. Boats run between the major beaches.' },
            { name: 'Cash is King', desc: 'Many beach shacks and small cafes are cash-only. Carry enough rupees. ATMs are in town.' },
            { name: 'Respect the Culture', desc: 'Gokarna is a pilgrimage town. Dress modestly in the town center and near temples.' },
            { name: 'Pack Light', desc: 'Trekking between beaches involves sandy paths and rocky sections. Comfortable sandals are a must.' },
        ],
    },
];

export default function TouristGuidePage() {
    return (
        <div>
            <div style={{ background: 'linear-gradient(135deg, #D4854A 0%, #b8683a 100%)', padding: '5rem 0 3rem', textAlign: 'center', color: 'white' }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Your Complete Guide</p>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>Explore Gokarna</h1>
                <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '500px', margin: '0 auto' }}>Everything you need to know to plan the perfect Gokarna trip.</p>
            </div>

            <section className="section-padded">
                <div className="container" style={{ maxWidth: '900px' }}>
                    {sections.map((section, si) => (
                        <div key={si} style={{ marginBottom: '4rem' }}>
                            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.75rem', color: '#1A1A2E', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <span style={{ fontSize: '2rem' }}>{section.emoji}</span> {section.title}
                            </h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {section.items.map((item, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '1.25rem', background: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', alignItems: 'flex-start' }}>
                                        <div style={{ width: '36px', height: '36px', background: 'rgba(212,133,74,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4854A', fontWeight: 700, fontSize: '0.875rem', flexShrink: 0 }}>{i + 1}</div>
                                        <div>
                                            <h4 style={{ fontWeight: 600, color: '#1A1A2E', marginBottom: '0.25rem', fontSize: '1rem' }}>{item.name}</h4>
                                            <p style={{ color: '#7a7a9a', fontSize: '0.875rem', lineHeight: 1.6 }}>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
