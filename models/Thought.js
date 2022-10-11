const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema
(
  {
    thoughtText: 
    {
      type: String,
      required: true,
      min: 1,
      max: 280,
    },
    createdAt: 
    {
      type: Date,
      default: Date.now(),
      get: GetFormatedDate,
    },
    username: 
    {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: 
    {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () 
{
  return this.reactions.length;
})

function GetFormatedDate(createdAt)
{
  return createdAt.toLocaleDateString();
}

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;