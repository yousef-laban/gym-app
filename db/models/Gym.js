const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Gym = sequelize.define("Gym", {
    slug: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Gym, {
    source: ["name"],
  });

  // relation
  Gym.associate = (models) => {
    models.User.hasMany(Gym, {
      as: "gym",
      foreignKey: "ownerId", // change the column name frome ShopId tp shopId
      allowNull: false,
    });

    Gym.belongsTo(models.User, {
      foreignKey: "ownerId",
    });
  };

  return Gym;
};
