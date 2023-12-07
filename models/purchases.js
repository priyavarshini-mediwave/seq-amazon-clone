const { DataTypes } = require("sequelize");

module.exports = function model(sequelize, types) {
  const Purchases = sequelize.define(
    "purchases",
    {
      purchases_id: {
        type: types.UUID,
        defaultValue: types.UUIDV4,
        primarykey: true,
        unique: true,
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
      status: {
        type: types.STRING,
        allowNull: false,
      },
      date_of_order: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      tableName: "purchases",
      timestamps: false,
    }
  );

  Purchases.associate = function (models) {
    Purchases.belongsTo(models.users, {
      as: "users",
      foreignKey: "user_id",
      targetKey: "user_id",
    });
    Purchases.belongsTo(models.items, {
      as: "items",
      foreignKey: "item_id",
      targetKey: "item_id",
    });
  };

  return Purchases;
};
