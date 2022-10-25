module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      name: String,
      birthday: String,
      location: String,
      team: String,
      gender: String,
      sports: [{type:String}],
      about: String,
      interests: String,
      image: String,
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Profile = mongoose.model("profile", schema);
  return Profile;
};
