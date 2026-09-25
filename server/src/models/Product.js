import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    attributes: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },

    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      }
    ],

    occasion: {
      type: [String],
      default: [],
    },

    style: {
      type: [String],
      default: [],
    },

    targetAudience: {
      type: [String],
      default: [],
    },

    tags: {
      type: [String],
      default: [],
    },

    searchKeywords: {
      type: [String],
      default: [],
    },

    enrichedDescription: {
      type: String,
      default: "",
    },

    embedding: {
    type: [Number],
    select: false,//intially not fetched whenever done a find or findone operation , explicit selection is required using .select('+embedding')
    default: [],
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  materials: {
  type: [String],
  default: [],
  },

  colors: {
    type: [String],
    default: [],
  },

  features: {
    type: [String],
    default: [],
  }

  },

  {
    timestamps: true,
  }

);

const Product = mongoose.model("Product", productSchema);

export default Product;