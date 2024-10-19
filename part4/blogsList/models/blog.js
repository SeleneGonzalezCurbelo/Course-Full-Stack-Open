// models/blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  user: { // Cambiar de array a un solo usuario
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  likes: {
    type: Number,
    default: 0,
    min: 0,
  },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Blog', blogSchema);
