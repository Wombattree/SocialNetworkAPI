const { User, Thought } = require('../models');
const errorMessage = "No user with that ID";

module.exports = 
{
	GetAllUsers(req, res) 
	{
		User.find()
			.then((users) => res.json(users))
			.catch((error) => res.status(500).json(error));
	},
	GetUser(req, res) 
	{
		User.findOne({ _id: req.params.id })
			.select('-__v')
			.then(async (user) => ! user
				? res.status(404).json({ message: errorMessage })
				: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	createUser(req, res) 
	{
		User.create(req.body)
		.then((user) => res.json(user))
		.catch((err) => { console.log(err); return res.status(500).json(err); });
	},
	updateUser(req, res) 
	{
		User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ runValidators: true, new: true })
			.then((user) => ! user
				? res.status(404).json({ message: errorMessage })
				: res.json(user))
			.catch((err) => res.status(500).json(err));
	},
	deleteUser(req, res) 
	{
		User.findOneAndDelete({ _id: req.params.id })
			.then((user) => ! user
				? res.status(404).json({ message: errorMessage })
				: Thought.deleteMany({ _id: { $in: user.thoughts } }))
			.then(() => res.json({ message: 'User and their thoughts deleted!' }))
			.catch((err) => res.status(500).json(err));
	},
};