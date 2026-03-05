import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_name: {
      type: String,
      required: true,
    },
    product_desc: {
      type: String,
      required: true,
    },
    product_category: {
      type: String,
      required: true,
    },
    product_price: {
      type: Number,
      required: true,
    },
    vendor_name: {
      type: String,
      required: true,
    },
    product_status: {
      type: String,
      enum: ["available", "not_available"],
      default: "available",
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;