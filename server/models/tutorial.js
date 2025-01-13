'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tutorial extends Model {
    /**
     * Define associations here
     * This method is called automatically by Sequelize.
     */
    static associate(models) {
      // Tutorial belongs to Subject
      Tutorial.belongsTo(models.Subject, { foreignKey: 'subject_id', as: 'subjects' });
      Tutorial.hasMany(models.Question, { foreignKey: 'tutorial_id', as: 'questions'});
    }
    
  }

  Tutorial.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subject_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Subjects', // Model the foreign key references
          key: 'id',
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
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
      modelName: 'Tutorial',
      tableName: 'tutorials',
      timestamps: false, // Since the table already has `created_at` and `updated_at`
      underscored: true, // Use snake_case column names
    }
  );

  return Tutorial;
};
