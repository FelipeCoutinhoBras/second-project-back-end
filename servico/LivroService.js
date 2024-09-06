const { DataTypes, Op } = require("sequelize");
const LivroModel = require("../model/Livro");

module.exports = {
  // Lista todos os livros
  list: async function () {
    return await LivroModel.findAll();
  },

  // Adiciona um novo livro
  save: async function (titulo, ano, descricao, estado) {
    return await LivroModel.create({
      titulo,
      ano,
      descricao,
      estado,
    });
  },

  // Atualiza um livro existente
  update: async function (id, titulo, ano, descricao, estado) {
    const livroExistente = await LivroModel.findByPk(id);
    if (!livroExistente) {
      return null; // Retorna null se o livro não for encontrado
    }

    await LivroModel.update(
      {
        titulo,
        ano,
        descricao,
        estado,
      },
      {
        where: { id },
      }
    );

    return await LivroModel.findByPk(id); // Retorna o livro atualizado
  },

  // Remove um livro pelo ID
  delete: async function (id) {
    return await LivroModel.destroy({ where: { id } });
  },

  // Obtém um livro pelo ID
  getById: async function (id) {
    return await LivroModel.findByPk(id);
  },

  // Verifica se o livro está emprestado pelo ID
  getLivroEmprestado: async function (id) {
    return await LivroModel.findOne({
      where: { [Op.and]: [{ id }, { estado: "emprestado" }] },
    });
  },

  // Obtém um livro pelo título (parcial)
  getByName: async function (titulo) {
    return await LivroModel.findOne({
      where: { titulo: { [Op.like]: `%${titulo}%` } },
    });
  },
};
