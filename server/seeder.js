import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';
import Room from './models/Room.js';
import MenuItem from './models/MenuItem.js';
import Review from './models/Review.js';

dotenv.config();

const seed = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Create admin user if not exists
    const existing = await User.findOne({ email: 'admin@shoreandsip.in' });
    if (!existing) {
        await User.create({ name: 'Admin', email: 'admin@shoreandsip.in', password: 'Admin@123', role: 'admin' });
        console.log('✅ Admin user created: admin@shoreandsip.in / Admin@123');
    } else {
        console.log('ℹ️  Admin user already exists');
    }

    // Seed rooms
    const roomCount = await Room.countDocuments();
    if (roomCount === 0) {
        await Room.create([
            { name: 'Ocean View Deluxe', description: 'Wake up to stunning ocean views from your private balcony. Features premium bedding, rain shower, and panoramic sea views.', pricePerNight: 3500, capacity: 2, amenities: ['WiFi', 'AC', 'Beach View', 'Balcony', 'Hot Water'], category: 'Deluxe', beachView: true },
            { name: 'Garden Retreat', description: 'A serene garden-facing room with lush tropical greenery outside your window. Peaceful and ideal for solo travelers.', pricePerNight: 2200, capacity: 2, amenities: ['WiFi', 'AC', 'Breakfast', 'Hot Water'], category: 'Standard', beachView: false },
            { name: 'Beach Bungalow', description: 'Private bungalow just 50 meters from the shore with a hammock porch, outdoor shower, and total beach access.', pricePerNight: 5000, capacity: 4, amenities: ['WiFi', 'Beach View', 'Balcony', 'Breakfast', 'Hammock'], category: 'Bungalow', beachView: true },
            { name: 'Sunset Cottage', description: 'A charming cottage with the best sunset views in Gokarna. Cozy, private, and perfectly positioned on the hillside.', pricePerNight: 4200, capacity: 2, amenities: ['WiFi', 'Beach View', 'Balcony', 'Hot Water', 'Mini Kitchen'], category: 'Cottage', beachView: true },
        ]);
        console.log('✅ Sample rooms seeded');
    }

    // Seed menu items
    const menuCount = await MenuItem.countDocuments();
    if (menuCount === 0) {
        await MenuItem.create([
            { name: 'Cold Brew Coffee', category: 'Coffee', price: 120, description: 'Smooth 24-hour cold brew with optional oat milk.', isVeg: true },
            { name: 'Cappuccino', category: 'Coffee', price: 95, description: 'Rich espresso with perfectly steamed milk foam.', isVeg: true },
            { name: 'Avocado Toast', category: 'Breakfast', price: 190, description: 'Smashed avocado on sourdough with chilli flakes and a poached egg.', isVeg: true },
            { name: 'Eggs Benedict', category: 'Breakfast', price: 220, description: 'Classic poached eggs on English muffin with hollandaise sauce.', isVeg: false },
            { name: 'Grilled Fish Curry', category: 'Main Meals', price: 380, description: 'Fresh local catch in coastal Konkani curry with steamed rice.', isVeg: false },
            { name: 'Pasta Aglio Olio', category: 'Main Meals', price: 280, description: 'Spaghetti with garlic, olive oil, chilli, and parsley.', isVeg: true },
            { name: 'Mango Cheesecake', category: 'Desserts', price: 180, description: 'Creamy no-bake cheesecake topped with fresh Alphonso mango.', isVeg: true },
            { name: 'Fresh Lime Soda', category: 'Beverages', price: 70, description: 'Classic sweet or salted fresh lime soda, perfectly chilled.', isVeg: true },
            { name: 'Watermelon Juice', category: 'Beverages', price: 90, description: 'Fresh blended watermelon with mint and a hint of black salt.', isVeg: true },
            { name: 'Banana Pancakes', category: 'Breakfast', price: 150, description: 'Fluffy pancake stack with caramelized banana and honey drizzle.', isVeg: true },
        ]);
        console.log('✅ Sample menu items seeded');
    }

    // Seed reviews
    const reviewCount = await Review.countDocuments();
    if (reviewCount === 0) {
        await Review.create([
            { name: 'Priya Sharma', email: 'priya@gmail.com', rating: 5, comment: 'Absolutely magical place! The beach view room was stunning and the cold brew was some of the best I\'ve had. Will definitely be back!', isApproved: true },
            { name: 'James Miller', email: 'james@mail.com', rating: 5, comment: 'Shore & Sip is a hidden gem. Unplugged from everything for a week, ate the most delicious food, and felt so welcomed. A must-do in Gokarna.', isApproved: true },
            { name: 'Ananya Patel', email: 'ananya@gmail.com', rating: 4, comment: 'Lovely atmosphere and super helpful staff. The fish curry was outstanding. Would love a few more vegan options on the menu!', isApproved: true },
        ]);
        console.log('✅ Sample reviews seeded');
    }

    console.log('\n🎉 Seeding complete!');
    console.log('   Admin: admin@shoreandsip.in / Admin@123');
    process.exit();
};

seed().catch(err => { console.error(err); process.exit(1); });
