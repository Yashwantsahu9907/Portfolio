import Project from '../models/Project.js';
import Contact from '../models/Contact.js';
import Skill from '../models/Skill.js';

const getDashboardStats = async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const totalMessages = await Contact.countDocuments();
        const totalSkills = await Skill.countDocuments();

        // Get recent projects as activity
        const recentProjects = await Project.find().sort({ createdAt: -1 }).limit(5).lean();
        
        // Map to a common activity format
        const recentActivity = recentProjects.map(p => ({
            id: p._id,
            text: `Added new project: "${p.title}"`,
            date: p.createdAt
        }));

        res.json({
            stats: {
                totalProjects,
                totalMessages,
                totalSkills
            },
            recentActivity
        });
    } catch (error) {
        console.error("Dashboard stats error:", error);
        res.status(500).json({ message: 'Server error while fetching dashboard stats', error: error.message });
    }
};

export { getDashboardStats };
