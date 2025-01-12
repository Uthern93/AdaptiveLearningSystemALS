'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    question_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Content',
        key: 'content_id',
      },
    },
    options: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    correct_answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    difficulty_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'Questions',
    underscored: true,
    timestamps: true,
  });

  // Defining the relationship
  Question.associate = (models) => {
    Question.belongsTo(models.Content, {
      foreignKey: 'content_id',
      as: 'content',
    });
  };

  return Question;
};
