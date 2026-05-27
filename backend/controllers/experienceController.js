import Experience from '../models/Experience.js';

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).sort({
      order: 1,
      startDate: -1,
    });

    res.json(experiences);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an experience
// @route   POST /api/experience
// @access  Private/Admin
const createExperience = async (req, res) => {
  try {
    const {
      company,
      role,
      type,
      startDate,
      endDate,
      isCurrent,
      location,
      description,
      technologies,
      logo,
      order,
    } = req.body;

    const experience = new Experience({
      company,
      role,
      type,
      startDate,
      endDate: isCurrent ? null : endDate,
      isCurrent,
      location,
      description,
      technologies,
      logo,
      order: order || 0,
    });

    const createdExperience = await experience.save();

    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: 'Invalid experience data' });
  }
};

// @desc    Update an experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      experience.company = req.body.company || experience.company;
      experience.role = req.body.role || experience.role;
      experience.type = req.body.type || experience.type;
      experience.startDate =
        req.body.startDate || experience.startDate;

      experience.isCurrent =
        req.body.isCurrent !== undefined
          ? req.body.isCurrent
          : experience.isCurrent;

      experience.endDate = experience.isCurrent
        ? null
        : req.body.endDate || experience.endDate;

      experience.location =
        req.body.location || experience.location;

      experience.description =
        req.body.description || experience.description;

      experience.technologies =
        req.body.technologies || experience.technologies;

      experience.logo = req.body.logo || experience.logo;

      experience.order =
        req.body.order !== undefined
          ? req.body.order
          : experience.order;

      const updatedExperience = await experience.save();

      res.json(updatedExperience);
    } else {
      res.status(404).json({
        message: 'Experience not found',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: 'Invalid experience data',
    });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      await experience.deleteOne();

      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({
        message: 'Experience not found',
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};