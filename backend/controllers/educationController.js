import Education from '../models/Education.js';

// @desc    Get all education
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res) => {
  try {
    const education = await Education.find({}).sort({ createdAt: -1 });
    res.json(education);
  } catch (error) {
    res.status(500);
    throw new Error('Server Error');
  }
};

// @desc    Create an education record
// @route   POST /api/education
// @access  Private/Admin
const createEducation = async (req, res) => {
  try {
    const { degree, institution, period, description } = req.body;

    const education = new Education({
      degree,
      institution,
      period,
      description,
    });

    const createdEducation = await education.save();
    res.status(201).json(createdEducation);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Update an education record
// @route   PUT /api/education/:id
// @access  Private/Admin
const updateEducation = async (req, res) => {
  try {
    const { degree, institution, period, description } = req.body;

    const education = await Education.findById(req.params.id);

    if (education) {
      education.degree = degree || education.degree;
      education.institution = institution || education.institution;
      education.period = period || education.period;
      education.description = description || education.description;

      const updatedEducation = await education.save();
      res.json(updatedEducation);
    } else {
      res.status(404);
      throw new Error('Education not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

// @desc    Delete an education record
// @route   DELETE /api/education/:id
// @access  Private/Admin
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (education) {
      await education.deleteOne();
      res.json({ message: 'Education removed' });
    } else {
      res.status(404);
      throw new Error('Education not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

export { getEducation, createEducation, updateEducation, deleteEducation };
