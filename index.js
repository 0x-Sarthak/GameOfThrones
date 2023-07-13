const { connection } = require('./db');
const { userRouter } = require('./routes/user.routes');
const { contentRouter } = require('./routes/content.routes');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { logoutModel } = require('./model/user.model');
const app = express();
app.use(cors());
app.use(express.json());

app.get('/logout', async (req, res) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (token) {
		try {
			const user = logoutModel({ token });
			await user.save();
			if (user) {
				res.send({ msg: 'User has been logged out' });
			}
		} catch (error) {
			res.status(400).json({ err: err.message });
		}
	}
});

app.use('/users', userRouter);
app.use('/employees', contentRouter);

app.listen(process.env.PORT, async () => {
	try {
		await connection;
		console.log(`runnigng at port ${process.env.PORT}`);
		console.log('connected to db');
	} catch (err) {
		console.log(err.message);
		console.log('somthing went wrong');
	}
});
