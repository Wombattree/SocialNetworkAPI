const { Schema, Types } = require('mongoose');

const Reaction = new Schema(
  {
    reactionId: 
    {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: 
    {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    username: 
    {
      type: String,
      required: true,
    },
    createdAt: 
    {
      type: Date,
      default: Date.now(),
      get: GetFormatedDate,
    },
  },
  {
    toJSON: { getters: true, },
    id: false,
  }
);

function GetFormatedDate(createdAt)
{
  return createdAt.toLocaleDateString();
}

module.exports = Reaction;