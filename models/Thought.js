const { Schema, model } = require('mongoose');

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
      get: () => this.createdAt.toLocaleDateString(),
    },
    username: 
    {
      type: String,
      required: true,
    },
    reactions: [{ type: Schema.Types.ObjectId, ref: 'Reactions', },],
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
  return reactions.length();
})

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;