const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  question: {
    type: String,
    minlength: 10,
    maxlength: 100
  }
});

module.exports = mongoose.model('question', QuestionSchema);
