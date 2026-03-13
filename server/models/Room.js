import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    pricePerNight: { type: Number, required: true },
    capacity: { type: Number, default: 2 },
    amenities: [{ type: String }],
    images: [{ type: String }],
    category: { type: String, default: 'Standard' },
    isAvailable: { type: Boolean, default: true },
    beachView: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);
