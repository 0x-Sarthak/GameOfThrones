const express = require('express');
const bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');
const { userModel, logoutModel } = require('../model/user.model');

const userRouter = express.Router();

// registration of Admin
userRouter.post('/signup', async (req, res) => {
	const { email, password } = req.body;

	const user = await userModel.findOne({ email });
	if (user) {
		res.send('User already exist, please login');
	} else {
		try {
			bcrypt.hash(password, (saltround = 5), async function (err, hash) {
				if (err) {
					res.send(400).send({ msg: err.message });
				} else {
					const user = userModel({ ...req.body, password: hash });
					await user.save();
					res.status(200).json({
						msg: 'New user has been updated',
						registeredUser: req.body,
					});
				}
			});
		} catch (error) {
			res.status(400).send({ error: error.message });
		}
	}
});

//autentication of Admin
userRouter.post('login', async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (user) {
			bcrypt.compare(password, user.password, function (err, result) {
				if (result) {
					var token = jwt.sign({ userID: user.id, user: user.name }, 'masai', {
						expiresIn: '7d',
					});
					res.status(200).send({ msg: 'Login Successful', token });
				} else {
					res.status(200).send({ msg: 'Wrong crendetial' });
				}
			});
		} else {
			res.status(200).send({ msg: 'User not found' });
		}
	} catch (err) {
		res.status(400).send({ err: err.message });
	}
});

module.exports = {
	userRouter,
};
