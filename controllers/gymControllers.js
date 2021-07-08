let { Gym } = require("../db/models");

exports.gymList = async (req, res, next) => {
  try {
    const gymes = await Gym.findAll();
    res.json(gymes);
  } catch (erroe) {
    next(erroe);
  }
};

exports.gymCreate = async (req, res, next) => {
  try {
    const { user } = req;

    if (user.type !== "admin")
      throw { status: 401, message: "Only Admin Can Create A Gym" };

    if (req.file) req.body.image = `http://localhost:8000/${req.file.path}`;

    const newGym = await Gym.create(req.body);
    res.status(201).json(newGym);
  } catch (erroe) {
    next(erroe);
  }
};
