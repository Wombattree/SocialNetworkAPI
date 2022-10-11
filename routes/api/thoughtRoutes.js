const router = require('express').Router();
const { GetAllThoughts, GetThought, CreateThought, UpdateThought, DeleteThought, AddReactionToThought, RemoveReactionFromThought } = require('../../controllers/thoughtController.js');

router.route('/')
	.get(GetAllThoughts)
	.post(CreateThought);

router
	.route('/:id')
	.get(GetThought)
	.put(UpdateThought)
	.delete(DeleteThought);

router
	.route("/:thoughtId/reactions/:reactionId")
	.delete(RemoveReactionFromThought);

router
	.route("/:thoughtId/reactions/")
	.post(AddReactionToThought)

module.exports = router;