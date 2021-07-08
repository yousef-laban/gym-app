const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Class = sequelize.define("Class", {
    slug: { type: DataTypes.STRING, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },

    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING },

    type: { type: DataTypes.STRING },
  });
  SequelizeSlugify.slugifyModel(Class, {
    source: ["name"],
  });

  // relation
  Class.associate = (models) => {
    models.Gym.hasMany(Class, {
      as: "class",
      foreignKey: "gymId", // change the column name frome ShopId tp shopId
      allowNull: false,
    });

    Class.belongsTo(models.Gym, {
      foreignKey: "gymId",
    });
  };

  return Class;
};
