import mongoose from 'mongoose';

const gallerySchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    caption: { type: String },
    category: {
        type: String,
        enum: ['Cafe', 'Rooms', 'Beach', 'Food', 'Sunset', 'Activities'],
        default: 'Beach',
    },
}, { timestamps: true });

export default mongoose.model('Gallery', gallerySchema);
