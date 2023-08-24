const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "64e118a617b5bae570ddd56a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dw4kyffua/image/upload/v1692695515/YelpCamp/ecjesvxtzcfez5dhna8z.jpg",

          filename: "YelpCamp/ecjesvxtzcfez5dhna8z",
        },
        {
          url: "https://res.cloudinary.com/dw4kyffua/image/upload/v1692696485/YelpCamp/ri4xuohgo48jglah6zkv.png",
          filename: "YelpCamp/ri4xuohgo48jglah6zkv",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa necessitatibus nihil quidem tempora ratione exercitationem ipsum dolorem, fuga, cumque ducimus beatae recusandae. Fuga sit est maxime sapiente delectus impedit eius?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
