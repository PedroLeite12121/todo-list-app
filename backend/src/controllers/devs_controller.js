import { pool } from "../utils/database.js";
import { ok, created, fail } from "../utils/responses.js";

export const getDevs = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tbDevs");
    return ok(res, result);
    
  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const getDevById = async (req, res) => {
  const idDev = req.params.idDev;

  try {
    const [result] = await pool.query(
      "SELECT * FROM tbDevs WHERE idDev = ?",
      [idDev]
    );

    if (result.length === 0) {
      return fail(res, "Desenvolvedor não encontrado", 404);
    }

    return ok(res, result[0]);

  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const createDev = async (req, res) => {
  const { nome, img, funcao, link_github } = req.body;

  if (!nome || !img || !funcao || !link_github) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const sql = `
      INSERT INTO tbDevs (nome, img, funcao, link_github)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [nome, img, funcao, link_github]);

    if (result.affectedRows === 0) {
      return fail(res, "Erro ao inserir dados", 400);
    }

    return created(res, null, "Desenvolvedor criado com sucesso");

  } catch (err) {
    console.error("Erro ao inserir dados:", err);
    return fail(res, "Erro ao inserir dados", 500);
  }
};

export const updateDev = async (req, res) => {
  const idDev = req.params.idDev;
  const { nome, img, funcao, link_github } = req.body;

  if (!nome || !img || !funcao || !link_github) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const sql = `
      UPDATE tbDevs
      SET nome = ?, img = ?, funcao = ?, link_github = ?
      WHERE idDev = ?
    `;

    const [result] = await pool.query(sql, [nome, img, funcao, link_github, idDev]);

    if (result.affectedRows === 0) {
      return fail(res, "Desenvolvedor não encontrado", 404);
    }

    return ok(res, null, "Dados atualizados com sucesso");

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const patchDev = async (req, res) => {
  const idDev = req.params.idDev;
  const { coluna, valor } = req.body;

  if (!coluna || valor === undefined) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  const colunasPermitidas = ["nome", "img", "funcao", "link_github"];

  if (!colunasPermitidas.includes(coluna)) {
    return fail(res, "Coluna inválida", 400);
  }

  try {
    const sql = `
      UPDATE tbDevs
      SET ${coluna} = ?
      WHERE idDev = ?
    `;

    const [result] = await pool.query(sql, [valor, idDev]);

    if (result.affectedRows === 0) {
      return fail(res, "Desenvolvedor não encontrado", 404);
    }

    return ok(res, null, "Campo atualizado com sucesso");

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const deleteDev = async (req, res) => {
  const idDev = req.params.idDev;

  try {
    const [result] = await pool.query(
      "DELETE FROM tbDevs WHERE idDev = ?",
      [idDev]
    );

    if (result.affectedRows === 0) {
      return fail(res, "Desenvolvedor não encontrado", 404);
    }

    return ok(res, null, "Desenvolvedor deletado com sucesso");

  } catch (err) {
    console.error("Erro ao deletar dados:", err);
    return fail(res, "Erro ao deletar dados", 500);
  }
};