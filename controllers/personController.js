const { default: slugify } = require("slugify");
const Person = require("../models/personModel");
const { lowerCase } = require("lodash");

exports.createPerson = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
      gender: req.body.gender,
      occupation: req.body.occupation,
      hngTrack: req.body.hngTrack,
      slug: slugify(lowerCase(req.body.name)),
    };
    const newPerson = await Person.create(data);
    res.status(201).json({
      status: "success",
      data: {
        data: newPerson,
      },
    });
  } catch (error) {
    console.error("Error creating person:", error);
    res.status(500).send("Error creating person");
  }
};

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find().select("-__v");

    res.status(200).json({
      status: "success",
      data: {
        data: people,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getPerson = async (req, res) => {
  try {
    const slug = req.params.slug;
    const person = await Person.findOne({ slug }).select("-__v");
    if (!person) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        data: person,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const newSlug = slugify(lowerCase(req.body.name));
    const slug = req.params.slug;
    const person = await Person.findOneAndUpdate(
      { slug },
      { ...req.body, slug: newSlug },
      {
        new: true,
        runValidators: true,
      }
    ).select("-__v");
    if (!person) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).json({
      status: "success",
      data: {
        data: person,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const slug = req.params.slug;
    const person = await Person.findOneAndDelete({ slug });
    if (!person) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    return res.status(500).json({
      status: "failed",
      error: err,
    });
  }
};
