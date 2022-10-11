const { Thought, User, Reaction } = require('../models');
const errorMessage = "No thought with that ID";

module.exports = 
{
  GetAllThoughts(req, res)
	{
		Thought.find()
			.then((thoughts) => res.json(thoughts))
			.catch((error) => res.status(500).json(error));
	},
	GetThought(req, res)
	{
		Thought.findOne({ _id: req.params.id })
			.select('-__v')
			.then(async (thought) => ! thought
				? res.status(404).json({ message: errorMessage })
				: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	CreateThought(req, res) 
	{
		Thought.create(req.body)
			.then((thought) => User.findOneAndUpdate(
					{ _id: req.body.userId }, 
					{ $push: { thoughts : thought._id }}, 
					{ runValidators: true, new: true })
			.then((thought) => res.json(thought))
			.catch((err) => { console.log(err); return res.status(500).json(err); }));
	},
	UpdateThought(req, res) 
	{
		Thought.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: req.body },
			{ runValidators: true, new: true })
			.then((thought) => !thought
				? res.status(404).json({ message: errorMessage })
				: res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
	DeleteThought(req, res) 
	{
		Thought.findOneAndDelete({ _id: req.params.id })
			.then(() => res.json({ message: 'Thought deleted!' }))
			.catch((err) => res.status(500).json(err));
	},

	AddReactionToThought(req, res)
	{
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true })
			.then((thought) => ! thought
				? res.status(404).json({ message: errorMessage })
				: res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
	RemoveReactionFromThought(req, res)
	{
		Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions : { reactionId: req.params.reactionId } }},
			{ runValidators: true, new: true })
			.then((thought) => ! thought
				? res.status(404).json({ message: errorMessage })
				: res.json(thought))
			.catch((err) => res.status(500).json(err));
	},
};