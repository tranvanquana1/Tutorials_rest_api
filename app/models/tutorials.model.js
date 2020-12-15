const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Schema = mongoose.Schema;

const TutorialSchema = new Schema(
  {
    title: String,
    description: String,
    published: Boolean,
  },
  { timestamps: true }
);

TutorialSchema.plugin(mongoosePaginate);

TutorialSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = mongoose.model("tutorial", TutorialSchema);
