import mongoose from 'mongoose';

const { Schema } = mongoose;
const docSchema = new Schema(
  {
    Barcode: { type: String, index: true },
    ProductCode: String,
    UnitCode: String,
    FeatureCode: String,
    ProductName: String,
    ProducerName: String,
    UnitName: String,
    FeatureName: String,
    Price: Number,
    PriceDiscount: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('price', docSchema);
