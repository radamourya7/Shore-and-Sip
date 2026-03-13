import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const { default: User } = await import('./models/User.js');
const { default: Room } = await import('./models/Room.js');
const { default: MenuItem } = await import('./models/MenuItem.js');
const { default: Review } = await import('./models/Review.js');

// Set admin role
await User.updateOne({ email: 'admin@shoreandsip.in' }, { role: 'admin' });
console.log('✅ Admin role set for admin@shoreandsip.in');

// Seed rooms
const roomCount = await Room.countDocuments();
if (roomCount === 0) {
    await Room.create([
        { name: 'Ocean View Deluxe', description: 'Wake up to stunning ocean views from your private balcony. Premium bedding, rain shower, panoramic sea views.', pricePerNight: 3500, capacity: 2, amenities: ['WiFi', 'AC', 'Beach View', 'Balcony'], category: 'Deluxe', beachView: true },
        { name: 'Garden Retreat', description: 'Serene garden-facing room with lush tropical greenery. Peaceful and ideal for solo travelers.', pricePerNight: 2200, capacity: 2, amenities: ['WiFi', 'AC', 'Breakfast'], category: 'Standard', beachView: false },
        { name: 'Beach Bungalow', description: 'Private bungalow 50m from the shore with a hammock porch and beach access.', pricePerNight: 5000, capacity: 4, amenities: ['WiFi', 'Beach View', 'Balcony', 'Breakfast'], category: 'Bungalow', beachView: true },
    ]);
    console.log('✅ Rooms seeded');
}

// Seed menu items
const menuCount = await MenuItem.countDocuments();
if (menuCount === 0) {
    await MenuItem.create([
        { name: 'Cold Brew Coffee', category: 'Coffee', price: 120, description: 'Smooth 24h cold brew with optional oat milk.', isVeg: true },
        { name: 'Cappuccino', category: 'Coffee', price: 95, description: 'Rich espresso with velvety steamed milk foam.', isVeg: true },
        { name: 'Avocado Toast', category: 'Breakfast', price: 190, description: 'Smashed avocado on sourdough with chilli flakes.', isVeg: true },
        { name: 'Eggs Benedict', category: 'Breakfast', price: 220, description: 'Classic poached eggs on English muffin, hollandaise sauce.', isVeg: false },
        { name: 'Grilled Fish Curry', category: 'Main Meals', price: 380, description: 'Fresh Gokarna catch in coastal Konkani curry with rice.', isVeg: false },
        { name: 'Pasta Aglio Olio', category: 'Main Meals', price: 280, description: 'Spaghetti with garlic, olive oil, and chilli.', isVeg: true },
        { name: 'Mango Cheesecake', category: 'Desserts', price: 180, description: 'Creamy no-bake cheesecake with Alphonso mango.', isVeg: true },
        { name: 'Fresh Lime Soda', category: 'Beverages', price: 70, description: 'Sweet or salted fresh lime with chilled soda.', isVeg: true },
    ]);
    console.log('✅ Menu items seeded');
}

// Seed reviews
const reviewCount = await Review.countDocuments();
if (reviewCount === 0) {
    await Review.create([
        { name: 'Priya Sharma', email: 'priya@gmail.com', rating: 5, comment: 'Absolutely magical place! The beach view room was stunning and the cold brew was some of the best I\'ve had. Will definitely be back!', isApproved: true },
        { name: 'James Miller', email: 'james@mail.com', rating: 5, comment: 'Shore & Sip is a hidden gem. Unplugged for a week, ate delicious food, felt so welcomed. A must-do in Gokarna.', isApproved: true },
        { name: 'Ananya Patel', email: 'ananya@gmail.com', rating: 4, comment: 'Lovely atmosphere and super helpful staff. The fish curry was outstanding!', isApproved: true },
    ]);
    console.log('✅ Reviews seeded');
}

console.log('\n🎉 Setup complete! Login: admin@shoreandsip.in / Admin@123');
process.exit();
