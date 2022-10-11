const router = require('express').Router();
const { GetAllUsers, GetUser, CreateUser, UpdateUser, DeleteUser, AddFriendToUser, RemoveFriendFromUser } = require('../../controllers/userController.js');

router.route('/')
	.get(GetAllUsers)
	.post(CreateUser);

router
	.route('/:id')
	.get(GetUser)
	.put(UpdateUser)
	.delete(DeleteUser);

router
	.route("/:userId/friends/:friendId")
	.put(AddFriendToUser)
	.delete(RemoveFriendFromUser);

module.exports = router;
