const Section = require('../models/Section');

const getAllSections = async (req, res) => {
	try {
		const sections = await Section.findAll();
		res.json(sections);
	} catch (error) {
		console.error('Error retrieving sections:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const getSectionById = async (req, res) => {
	const { user_id } = req.params;
	try {
		let options = {
			attributes: ['id'],
			where: [{ user_id: user_id }],
		};
		const section = await Section.findAll(options);
		if (!section) {
			res.status(404).json({ error: 'Section not found' });
			return;
		}
		res.json(section);
	} catch (error) {
		console.error('Error retrieving section by ID:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

const addSection = async (req, res) => {
	const { name, type, content } = req.body;
	try {
		const newSection = await Section.create({ name, type, content });
		res.json(newSection);
	} catch (error) {
		console.error('Error adding section:', error.message);
		res.status(500).json({ error: 'Internal Server Error' });
	}
};

module.exports = { getAllSections, getSectionById, addSection };
