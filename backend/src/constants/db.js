const { Sequelize } = require("sequelize");

const db = new Sequelize("sqlite::memory:", {
  define: {
    timestamps: false,
  },
});

module.exports = db;
