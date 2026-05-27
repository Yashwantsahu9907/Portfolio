import Contact from '../models/Contact.js';

// Create a new message
const createMessage = async (req, res ) => {   // Run when contact form submitting
    const { name, email, subject, message } = req.body;   // Data comes from frontend

    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error('All field are required');
    }
    const contact = await Contact.create({
        name,
        email,
        subject,
        message,
    });

    res.status(201).json({   // res.json pass the data which comes from frontend
        success: true,
        message: 'Message sent successfully',
        data: contact,
    });


};

// get all messages 

const getMessages = async (req, res) => {   // fetch all messages for admin 
    const messages = await Contact.find({}).sort({ createdAt: -1 });   //latest message first

    res.json(messages);
};


export { createMessage, getMessages, };