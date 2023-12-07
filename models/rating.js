const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Rating = sequelize.define(
    "rating",
    {
      rating_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      ratingValue: {
        type: types.INTEGER,
        allowNull: false,
      },

      user_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "users",
          },
          key: "user_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
      item_id: {
        type: types.UUID,
        references: {
          model: {
            tableName: "items",
          },
          key: "item_id",
        },
        allowNull: false,
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "rating",
      timestamps: false,
    }
  );

  Rating.associate = function (models) {
    Rating.belongsTo(models.users, {
      as: "users",
      foreignKey: "user_id",
      targetKey: "user_id",
    }),
      Rating.belongsTo(models.items, {
        as: "items",
        foreignKey: "item_id",
        targetKey: "item_id",
      });
  };

  return Rating;
};
