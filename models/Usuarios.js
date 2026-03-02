const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuarios = sequelize.define(
    'Usuarios',
  
    {
      
      matricula: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      nome: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tipo: {
        type: DataTypes.ENUM('aluno', 'ADM'),
        allowNull: false,
        defaultValue: 'aluno'
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      reserva: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Reservas', // Nome da tabela de usuários
        key: 'id_reserva' // Coluna de referência na tabela de usuários
      }
    },
  },
  {
    hooks: {
      beforeCreate: async (usuarios) => {
        // Hash the password using bcrypt before creating the record
        const hashedPassword = await bcrypt.hash(usuarios.senha, 10);
        usuarios.senha = hashedPassword;
      },
      beforeUpdate: async (usuarios, options) => {
        // Check if the password is being updated
        if (options.fields.includes('senha')) {
          // Hash the updated password using bcrypt
          const hashedPassword = await bcrypt.hash(usuarios.senha, 10);
          usuarios.senha = hashedPassword;
        }
      },
    }
  },
  {
    tableName: 'Usuarios', // Nome real da tabela no banco de dados
    timestamps: true, // Se não quiser usar colunas createdAt e updatedAt
    // ... outras opções ...
  }
);


module.exports = Usuarios;

