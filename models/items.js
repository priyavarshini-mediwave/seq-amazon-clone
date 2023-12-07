// const { DataTypes } = require("sequelize");

const rating = require("./rating");

module.exports = function model(sequelize, types) {
  const Items = sequelize.define(
    "items",
    {
      item_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
      },
      item_name: {
        type: types.STRING,
        allowNull: false,
      },
      item_content: {
        type: types.STRING,
        allowNull: false,
      },
      item_price: {
        type: types.DECIMAL(10, 2),
        allowNull: false,
      },
      item_count: {
        type: types.INTEGER,
        allowNull: false,
      },
    },

    {
      tableName: "items",
      timestamps: false,
    }
  );

  Items.associate = function (models) {
    Items.hasMany(models.rating, {
      as: "rating",
      foreignKey: "item_id",
      sourceKey: "item_id",
    }),
      Items.hasMany(models.cart, {
        as: "cart",
        foreignKey: "item_id",
        sourceKey: "item_id",
      }),
      Items.hasMany(models.purchases, {
        as: "purchases",
        foreignKey: "item_id",
        sourceKey: "item_id",
      });
  };
  return Items;
};
// item_id SERIAL PRIMARY KEY,
//     item_name VARCHAR not null,
//     item_content VARCHAR,
//     price DECIMAL(10, 2) not null,
//     item_count integer not null,
