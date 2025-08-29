import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    todoChecklist: [todoSchema],
    attachments: [
      {
        type: String,
      },
    ],
    assignTo: [
      {
        type: mongoose.Schema.Types.ObjectId, //user ka ref
        ref: User,
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId, //user ka ref jisne task add kia
      ref: User,
    },
    status: {
      type: String,
      enum: ["pending", "progress", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    dueDate: {
      type: Date,
      required: false,
    },
    progress: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
