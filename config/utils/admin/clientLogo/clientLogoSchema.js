import mongoose from 'mongoose';

const clientLogoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: 'Client Logo',
    },
    logo: {
      type: String,
      required: [true, 'Logo image is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorting
clientLogoSchema.index({ order: 1, createdAt: -1 });

const ClientLogo = mongoose.models.ClientLogo || mongoose.model('ClientLogo', clientLogoSchema);

export default ClientLogo;
