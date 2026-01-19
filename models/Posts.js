const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  }, // this is done in order to map the posts to the repsective users and alllow only the respective users to add delete etc. their own posts
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  }, // name of user bcz if user deletes his acc then i need not delete his resp post
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users', // reference is uses here as i wnat to associate my like with particular users
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Post = mongoose.model('post', PostSchema);
