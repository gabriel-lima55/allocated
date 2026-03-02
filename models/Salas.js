const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Salas = sequelize.define(
  'Salas',
  {
    numero: {
      type: DataTypes.ENUM('1', '2', '3'),
      primaryKey: true,
    },
      disponibilidade: {
        type: DataTypes.ENUM('disponivel', 'ocupada'),
        allowNull: false,
      },
      
  },
  
  {
    tableName: 'Salas', // Nome real da tabela no banco de dados
    timestamps: false, // Se não quiser usar colunas createdAt e updatedAt
    // ... outras opções ...
  }
);


module.exports = Salas;

