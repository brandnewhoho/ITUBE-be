const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const saltRound = 10;

router.post('/sign_in', async (req, res) => {
	console.log('req.body', req.body);
	const { email, password } = req.body;
	const options = {
		attributes: ['id', 'password', 'nickname'],
		where: [{ email: email }],
	};
	const result = await User.findOne(options);
	console.log('result', result);
	if (result) {
		const compare_pw = await bcrypt.compare(password, result.password);
		if (compare_pw) {
			const token = jwt.sign({ user_id: result.id }, secret, {
				expiresIn: 60 * 60 * 24,
			});
			console.log('token', token);
			res.send({
				success: true,
				nickname: result.nickname,
				user_id: result.id,
				token: token,
				message: '로그인 성공',
			});
		} else {
			res.send({
				success: false,
				data: '',
				message: '비밀번호가 잘못되었습니다',
			});
		}
	} else {
		res.send({ success: false, data: '', message: '없는 사용자입니다' });
	}
});

router.post('/sign_up', async (req, res) => {
	const new_user = req.body;
	let options = {
		attributes: ['email'],
		where: [{ email: new_user.email }],
	};
	const result = await User.findOne(options);
	if (result) {
		return res.send({
			success: false,
			data: result,
			message: '사용중인 email입니다',
		});
	} else {
		const hashed = await bcrypt.hash(new_user.password, saltRound);
		new_user.password = hashed;
		try {
			const result = await User.create(new_user);
			return res.send({
				success: true,
				data: result,
				message: '회원 가입 성공',
			});
		} catch (error) {
			console.error(error);
			res.send({
				success: false,
				data: new_user,
				message: '회원 가입에 실패하였습니다',
			});
		}
	}
});

router.post('/validation', async (req, res) => {
	console.log('1111111');
	const auth = req.get('Authorization');
	console.log('auth', auth);
	if (!(auth && auth.startsWith('Bearer'))) {
		return res.send({ success: false, message: 'Auth error' });
	}

	const token = auth.split(' ')[1];
	console.log('token', token);
	jwt.verify(token, secret, async (error, decoded) => {
		if (error) {
			return res.send({ success: false, message: 'Auth error', error });
		} else {
			const user_id = decoded.user_id;
			console.log('user_id= decoded.user_id', user_id);
			let options = {
				attributes: ['nickname'],
				where: [{ id: user_id }],
			};

			try {
				const nickname = await User.findOne(options);
				return res.send({ success: true, user_id, nickname });
			} catch (error) {
				console.log('user fetch error', error);
				return res.send({
					success: false,
					message: 'Error fetching user data',
				});
			}
		}
	});
});
module.exports = router;
