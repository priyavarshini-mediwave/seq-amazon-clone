"use strict";

const { sequelize } = require("../config/sequelize-config");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("items", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      item_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primarykey: true,
        unique: true,
      },
      item_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_content: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      item_price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      item_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("items");
  },
};
