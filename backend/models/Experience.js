import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: [
        'Full-time',
        'Part-time',
        'Internship',
        'Contract',
        'Freelance',
      ],
      default: 'Full-time',
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
    },

    isCurrent: {
      type: Boolean,
      default: false,
    },

    location: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    technologies: {
      type: [String],
      default: [],
    },

    logo: {
      type: String, // URL or name for icon
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

const Experience = mongoose.model(
  'Experience',
  experienceSchema
);

export default Experience;