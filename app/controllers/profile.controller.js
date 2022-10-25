const db = require("../models");
const Profile = db.profiles;

// Create and Save a new Profile
exports.create = (req, res) => {
  // Validate request
  // if (!req.body.title) {
  //   res.status(400).send({ message: "Content can not be empty!" });
  //   return;
  // }

  // Create a Profile
  const profile = new Profile(req.body);

  // Save Profile in the database
  profile
    .save(profile)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Profile."
      });
    });
};

// Retrieve all Profiles from the database.
exports.findAll = (req, res) => {
  Profile.find({})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving profiles."
      });
    });
};

// Find a single Profile with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Profile.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Profile with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Profile with id=" + id });
    });
};

// Update a Profile by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Profile.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Profile with id=${id}. Maybe Profile was not found!`
        });
      } else res.send({ message: "Profile was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Profile with id=" + id
      });
    });
};
