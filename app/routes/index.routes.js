module.exports = app => {
  const profiles = require("../controllers/profile.controller.js");
  var router = require("express").Router();

  const {
    validateProfile,
  } = require('./validateProfile')

  // Create a new Profile
  router.post("/", validateProfile, profiles.create);

  // Retrieve all Profiles
  router.get("/", profiles.findAll);

  // Retrieve a single Profile with id
  router.get("/:id", profiles.findOne);

  // Update a Profile with id
  router.put("/:id", validateProfile, profiles.update);


  app.use("/api/profiles", router);
};
