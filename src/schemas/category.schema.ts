import mongoose, { Schema } from "mongoose";

export const categorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      text: true,
    },
    isActive: {
      type: Schema.Types.Boolean,
      required: true,
      default: true,
    },
    subCategories: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "category",
        },
      ],
      required: true,
      default: [],
    },
  },
  {
    collection: "category",
    timestamps: true,
  }
);

export const categoryModel = mongoose.model("category", categorySchema);
