import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        'Frontend Development',
        'Backend Development',
        'Database & Storage',
        'Tools & DevOps',
        'Other',
      ],
    },

    level: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    icon: {
      type: String,
      required: true,
      default: 'Code',
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

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;