const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const ReviewSchema = new Schema({
    rating: Number,
    body: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    date: { type: Date, default: Date.now() },
});

module.exports = model("Review", ReviewSchema);
