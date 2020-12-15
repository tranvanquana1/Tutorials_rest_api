const Tutorial = require("../models/tutorials.model");

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? limit * page : 0;
  return { limit, offset };
};

exports.create = (req, res, next) => {
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  Tutorial.create(req.body)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res, next) => {
  const { page, size, title } = req.query;
  const { limit, offset } = getPagination(page, size);
  const condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.paginate(condition, { offset, limit })
    .then((data) => {
      res.status(200).send({
        totalItems: data.totalDocs,
        tutorials: data.docs,
        totalPage: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials",
      });
    });
};

exports.findOne = (req, res, next) => {
  const id = req.params.id;
  Tutorial.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Not found Tutorial with id" + id });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving tutorials with id " + id,
      });
    });
};

exports.update = (req, res, next) => {
  if (!req.body)
    return res.status(400).send({ message: "data to update not be empty" });

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Cannot update Tutorial. Maybe Tutorial not found",
        });
      } else {
        res.status(200).send("Tutorial was updated successfully");
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial",
      });
    });
};
exports.delete = (req, res, next) => {
  const id = req.params.id;

  Tutorial.findOneAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Cannot delete Tutorial. Maybe tutorial not found",
        });
      } else {
        res.status(200).send({ message: "Tutorial was deleted successfull" });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "could not delete tutorial",
      });
    });
};

exports.deleteAll = (req, res, next) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.status(200).send({ message: "Tutorials were deleted successfully" });
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Cannot delete tutorials" });
    });
};

exports.findAllPublished = (req, res, next) => {
  const { page, size } = req.query;
  const { limit, offset } = getPagination(page, size);
  Tutorial.paginate({ published: true }, { offset, limit })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials",
      });
    });
};
