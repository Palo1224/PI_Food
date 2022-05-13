const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      summary: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      healthScore: {
        type: DataTypes.FLOAT,
      },
      steps: {
        type: DataTypes.STRING,
      },
      image:{
        type:DataTypes.STRING
      }
    },
    {
      timestamps: false,
    }
  );
};
