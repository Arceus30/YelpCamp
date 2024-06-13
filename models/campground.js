const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const Review = require("./review");

const ImageSchema = new Schema({
    url: String,
    filename: String,
});

ImageSchema.virtual("thumbnail").get(function () {
    return this.url.replace("/upload", "/upload/w_200");
});

const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new Schema(
    {
        title: String,
        price: Number,
        description: String,
        geometry: {
            type: {
                type: String,
                enum: ["Point"],
                reqiured: true,
            },
            coordinates: {
                type: [Number],
                required: true,
            },
        },
        location: String,
        images: [ImageSchema],
        reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
        author: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        date: { type: Date, default: Date.now() },
    },
    opts
);

CampgroundSchema.virtual("properties.popUp").get(function () {
    return `<a href="campgrounds/${this._id}">
            <h6>${this.title}</h6>
        </a>`;
});

CampgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews,
            },
        });
    }
});

module.exports = model("Campground", CampgroundSchema);
