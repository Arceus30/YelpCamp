// .env
if (process.env.NODE_ENV !== "production") require("dotenv").config();

const mongoose = require("mongoose");
const { Campground, Review, User } = require("../models");
const cities = require("./cities");
const { places, descriptors } = require("./helpers");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

// Database Connection
const dbUrl = process.env.DB_URL;
mongoose
    .connect(dbUrl)
    .then(() => {
        console.log("Database connected");
    })
    .catch((e) => {
        console.log(`Connection error: ${e}`);
    });

// inserting seed data
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    await User.deleteMany({});

    const username = "keshav",
        email = "keshavkhandelwal30@gmail.com",
        password = "keshav";

    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 1000;

        // Image URL to be uploaded to Cloudinary
        const imageUrl = `https://picsum.photos/300/200?random=${i}`;

        // Upload the image to Cloudinary directly from the URL
        const result = await cloudinary.uploader.upload(imageUrl, {
            folder: "yelpCampSeed",
        });

        const camp = new Campground({
            author: registeredUser._id,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ],
            },
            images: [
                {
                    url: result.secure_url,
                    filename: result.public_id,
                },
            ],
            date: Date.now(),
        });
        await camp.save();
    }
};

seedDB()
    .then(() => {
        console.log("Data Added");
        mongoose.connection.close();
        console.log("Connection Closed");
    })
    .catch((e) => {
        console.log(`Error 1: ${e.message}`);
    });
