const Usuarios = require('../models/Usuarios');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


class salaController {

  static async login(req, res) {
    try {
      const { nome, senha } = req.body;

      // Verifique se o usuário existe
      const usuarios = await Usuarios.findOne({ where: { nome } });
      if (!usuarios) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }

      // Verifique a senha
      const validPassword = await bcrypt.compare(senha, usuarios.senha);
      if (!validPassword) {
        return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      }

      // Gere um token JWT
      const token = jwt.sign({ userId: usuarios.matricula }, 'secret_key');

      return res.json({ token, usuario:{matricula: usuarios.matricula} });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  }

  static async create(req, res) {
    try {
      const { nome, tipo, matricula, senha } = req.body;
      const usuarios = await Usuarios.create({ nome, tipo, matricula, senha });
      return res.status(201).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao criar o usuario.' });
    }
  }

  static async findAll(req, res) {
    const where = {}
    if(req.query.tipo){
      where.tipo = req.query.tipo;
    }
    try {
      const usuarios = await Usuarios.findAll({where});
      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao listar os usuario.' });
    }
  }
  static async put(req, res) {
    try {
      const { matricula } = req.params; // O ID do usuário que você deseja atualizar
      const { nome, tipo, senha } = req.body;

      // Verifique se o usuário com o ID especificado existe
      const usuarios = await Usuarios.findByPk(matricula);

      if (!usuarios) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Atualize os campos do usuário
      usuarios.nome = nome;
      usuarios.tipo = tipo;
      usuarios.senha = senha;
      await usuarios.save();

      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
  }

  static async patch(req, res) {
    try {
      const { matricula } = req.params; // O ID do usuário que você deseja atualizar

      // Verifique se o usuário com o ID especificado existe
      const usuarios = await Usuarios.findByPk(matricula);

      if (!usuarios) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }


      await usuarios.update(req.body);

      return res.status(200).json(usuarios);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao atualizar o usuário.' });
    }
  }

  static async delete(req, res) {
    try {
      const { matricula } = req.params; // O ID do usuário que você deseja excluir

      // Verifique se o usuário com o ID especificado existe
      const usuarios = await Usuarios.findByPk(matricula);

      if (!usuarios) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      // Exclua o usuário
      await usuarios.destroy();

      return res.status(204).send(); // Status 204 indica que a operação foi bem-sucedida, mas não há conteúdo para enviar
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao excluir o usuário.' });
    }
  }
}

module.exports = salaController;
