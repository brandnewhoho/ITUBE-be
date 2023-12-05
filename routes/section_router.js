const express = require('express');
const { Video, Section, Channel } = require('../models');
const router = express.Router();

router.get('/channel/:user_id', async (req, res) => {
	const { user_id } = req.params;
	try {
		let options = {
			attributes: ['id', 'title'],
			where: [{ user_id: user_id }, { type: 1 }],
		};
		const user_channel_sections = await Section.findAll(options);
		res.status(200).json({ success: true, data: user_channel_sections });
	} catch (error) {
		console.error('Error fetching user sections:', error);
		res
			.status(500)
			.json({ success: false, message: 'Error fetching user sections' });
	}
});

router.get('/video/:user_id', async (req, res) => {
	const { user_id } = req.params;
	try {
		let options = {
			attributes: ['id', 'title'],
			where: [{ user_id: user_id }, { type: 0 }],
		};
		const user_video_sections = await Section.findAll(options);
		res.status(200).json({ success: true, data: user_video_sections });
	} catch (error) {
		console.error('Error fetching user sections:', error);
		res
			.status(500)
			.json({ success: false, message: 'Error fetching user sections' });
	}
});

router.get('/:user_id', async (req, res) => {
	console.log('start');
	const { user_id } = req.params;
	console.log('user_id', user_id);
	try {
		let options = {
			attributes: ['id', 'type', 'title'],
			where: [{ user_id: user_id }],
			include: [Channel, Video],
		};
		const user_sections = await Section.findAll(options);

		console.log('user_sections -----', user_sections);
		res.status(200).json({ success: true, user_sections });
	} catch (error) {
		console.error('Error fetching user sections:', error);
		res
			.status(500)
			.json({ success: false, message: 'Error fetching user sections.' });
	}
});

module.exports = router;
