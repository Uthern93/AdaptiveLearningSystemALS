'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Define associations here
     * This method is called automatically by Sequelize.
     */
    static associate(models) {
      // Question belongs to Tutorial
      Question.belongsTo(models.Tutorial, { foreignKey: 'tutorial_id', as: 'tutorial' });
    }
  }

  Question.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tutorial_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Tutorials',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      question_text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      correct_answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      difficulty_level: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Question',
      tableName: 'Questions',
      timestamps: false, // Since the table already has `created_at` and `updated_at`
      underscored: true, // Use snake_case column names
    }
  );

  return Question;
};
