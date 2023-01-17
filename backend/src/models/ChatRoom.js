const { Sequelize, DataTypes } = require("sequelize");
const db = require("../constants/db");

const ChatRoom = db.define(
  "ChatRoom",
  {
    // Model attributes are defined here
    dummy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    // Other model options go here
  }
);

module.exports = ChatRoom;
