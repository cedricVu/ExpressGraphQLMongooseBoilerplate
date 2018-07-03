'use strict';
import Mongoose from 'mongoose';
import TodoModelClass from './classes/Todo';

const schema = new Mongoose.Schema(
  {
    user: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: true
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

schema.loadClass(TodoModelClass);

module.exports = Mongoose.model('Todo', schema);
