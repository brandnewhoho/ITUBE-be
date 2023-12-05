const express = require('express');
const Section = require('../models/Section');
const Video = require('../models/Video');
const Channel = require('../models/Channel');
const router = express.Router();

router.post('/video', async (req, res) => {
	console.log('req.params', req.query);
	const { section_id, section_title, user_id } = req.query;

	const new_video = req.body;
	console.log('new_video', new_video);
	if (section_title) {
		console.log('section_title', section_title);
		const new_section = {
			title: section_title,
			type: 0,
			user_id: user_id,
		};
		try {
			const result = await Section.create(new_section);
			console.log('section create 성공', result);
			new_video.section_id = result.id;
			console.log('new_video --> ', new_video);
		} catch (error) {
			console.log('section create 실패', error);
		}
	} else {
		new_video.section_id = section_id;
	}
	console.log('비디오 등록 전 new_video', new_video);
	try {
		const result = await Video.create(new_video);
		return res.status(200).json({
			success: true,
			data: result,
			message: '새로운 비디오 등록 성공',
		});
	} catch (error) {
		console.error('새로운 비디오 등록 실패', error);
		return res.status(500).json({
			success: false,
			message: '새로운 비디오 등록 실패',
		});
	}
});

router.post('/channel', async (req, res) => {
	console.log('req.params', req.query);
	const { section_id, section_title, user_id } = req.query;

	const new_channel = req.body;
	console.log('new_channel', new_channel);
	if (section_title) {
		console.log('section_title', section_title);
		const new_section = {
			title: section_title,
			type: 1,
			user_id: user_id,
		};
		try {
			const result = await Section.create(new_section);
			console.log('section create 성공', result);
			new_channel.section_id = result.id;
			console.log('new_channel --> ', new_channel);
		} catch (error) {
			console.log('section create 실패', error);
		}
	} else {
		new_channel.section_id = section_id;
	}
	console.log('채널 등록 전 new_channel', new_channel);
	try {
		const result = await Channel.create(new_channel);
		return res.status(200).json({
			success: true,
			data: result,
			message: '새로운 채널 등록 성공',
		});
	} catch (error) {
		console.error('새로운 채널 등록 실패', error);
		return res.status(500).json({
			success: false,
			data: result,
			message: '새로운 채널 등록 실패',
		});
	}
});

module.exports = router;
