'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Define associations here
     * This method is called automatically by Sequelize.
     */
    static associate(models) {
      // Subject has many Tutorials
      Subject.hasMany(models.Tutorial, { foreignKey: 'subject_id', as: 'tutorials' });
    }
  }

  Subject.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
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
      modelName: 'Subject',
      tableName: 'Subjects',
      timestamps: false, // Since the table already has `created_at` and `updated_at`
      underscored: true, // Use snake_case column names
    }
  );

  return Subject;
};
