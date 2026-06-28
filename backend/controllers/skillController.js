import Skill from '../models/Skill.js';

// get skills
const getSkills = async (req, res) => {
    try {
        const skills = await Skill.find({}).sort({
            order: 1,   // for ascending order
            createdAt: -1,   //when same order occur show latest first 
        });

        res.json(skills);
    } catch (error) {

        console.error("Skill fetch error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Create skill

const createSkill = async (req, res) => {
    try {
        const { name, category, level, icon, order } = req.body;

        const skill = new Skill({
            name, category, level, icon: icon || 'code',
            order: order || 0,
        });

        const createSkill = await skill.save();
        res.status(201).json(createSkill);
    } catch (error) {
        res.status(400).json({ message: 'Invalid skill data ' });
    }
};


//Update skill

const updateSkill = async (req, res) => {
    try {
        const { name, category, level, icon, order } = req.body;

        const skill = await Skill.findById(req.params.id);

        if (skill) {
            skill.name = name || skill.name;
            skill.category = category || skill.category;
            skill.level = level !== undefined ? level : skill.level;
            skill.icon = icon || skill.icon;
            skill.order = order !== undefined ? order : skill.order;

            const updatedSkill = await skill.save();

            res.json(updatedSkill);
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Invalid skill data' });
    }
};

// Delete a skill

const deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);

        if (skill) {
            await skill.deleteOne();

            res.json({ message: 'Skill removed' });
        } else {
            res.status(404).json({ message: 'Skill not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

export { getSkills, createSkill, updateSkill, deleteSkill, };