import { Schema, model } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    categories: [{
        type: String,
        required: true,
    }],
    date: {
        type: Date,
        default: Date.now,
    }
})

const BlogModel = model("Blog", blogSchema);

export default BlogModel;