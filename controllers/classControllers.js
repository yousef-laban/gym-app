let { Class } = require("../db/models");

exports.classList = async (req, res, next) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (erroe) {
    next(erroe);
  }
};

exports.classCreate = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.type !== "admin" && user.type !== "owner")
      throw { status: 401, message: "Only Admin Or Owner Can Create A Class" };

    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;

    const newClass = await Class.create(req.body);
    res.status(201).json(newClass);
  } catch (erroe) {
    next(erroe);
  }
};
