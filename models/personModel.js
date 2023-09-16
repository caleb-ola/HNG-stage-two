const mongoose = require("mongoose");
const validator = require("validator");
const { default: slugify } = require("slugify");

const personSchema = new mongoose.Schema({
  name: {
    type: "string",
    unique: true,
    // required: [true, "Please provide a name"],
    max: [60, "Name cannot be more than 60 characters"],
  },
  email: {
    type: String,
    // required: [true, "Please provide an email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  age: Number,
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  occupation: {
    type: String,
    max: [50, "Occupation cannot be more than 50 characters"],
  },
  hngTrack: {
    type: String,
    max: [50, "Occupation cannot be more than 50 characters"],
  },
  // slug: String,
});

// // personSchema.pre(/^find/, function (next) {
// //   this.slug = slugify(this.name, { lower: true });
// //   next();
// // });
// personSchema.pre(/^find/, function (next) {
//   this.populate({
//     select: "-__v",
//   });
// });

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
