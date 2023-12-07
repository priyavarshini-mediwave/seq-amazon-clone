module.exports = function model(sequelize, types) {
  const favourites = sequelize.define(
    "favourites",
    {
      fav_id: {
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
    },
    {
      tableName: "favourites",
      timestamps: false,

      // defaultScope: {
      //     where: {
      //         status: 'Active'
      //     }
      // }
    }
  );

  favourites.associate = function (models) {
    favourites.belongsTo(models.items, {
      foreignKey: "item_id",
      targetKey: "item_id",
    }),
      favourites.belongsTo(models.users, {
        foreignKey: "user_id",
        targetKey: "user_id",
      });
  };

  return favourites;
};
