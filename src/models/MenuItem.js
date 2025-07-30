import mongoose, { Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
  name: String,
  price: Number,
});

const MenuItemSchema = new Schema({
  image: { type: String },
  name: { type: String },
  description: { type: String },
  category: { type: mongoose.Types.ObjectId, ref: 'Category', required: true },
  basePrice: { type: Number },
  sizes: { type: [ExtraPriceSchema] },
  extraIngredientPrices: { type: [ExtraPriceSchema] },
}, {
  timestamps: true,
  collection: 'menuitems'   // ✅ This is now applied correctly
});

export const MenuItem = mongoose.models.MenuItem || mongoose.model("MenuItem", MenuItemSchema);
