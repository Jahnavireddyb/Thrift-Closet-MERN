// server/models/Listing.js
import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: { type: String, required: true, index: 'text' },
  description: { type: String, required: true },
  images: [{ url: String, alt: String }],
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  category: { type: String, index: true }, // e.g., "Women > Tops"
  brand: { type: String, index: true },
  size: { type: String, index: true },     // e.g., S, M, 28x30
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Gently Used', 'Good', 'Fair'],
    required: true
  },
  material: String,
  color: { type: String, index: true },
  measurements: { bust: Number, waist: Number, hips: Number, length: Number },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['ACTIVE', 'RESERVED', 'SOLD'], default: 'ACTIVE' },
  shipping: {
    method: { type: String, default: 'Standard' },
    price: { type: Number, default: 0 },
    fromZip: String
  },
  tags: [String],
}, { timestamps: true });

listingSchema.index({ title: 'text', description: 'text', brand: 1, size: 1, color: 1, category: 1 });

export default mongoose.model('Listing', listingSchema);