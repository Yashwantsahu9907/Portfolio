import mongoose from 'mongoose';

const educationSchema = mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, 'Please add a degree'],
    },
    institution: {
      type: String,
      required: [true, 'Please add an institution'],
    },
    period: {
      type: String,
      required: [true, 'Please add a period (e.g., 2017 - 2021)'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  }
);

const Education = mongoose.model('Education', educationSchema);

export default Education;
