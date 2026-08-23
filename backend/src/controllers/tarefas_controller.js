import { pool } from "../utils/database.js";
import { ok, created, fail } from "../utils/responses.js";

export const getTarefas = async (req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM tbTarefas');

    return ok(res, result);

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao buscar dados", 500);
  }
}

export const getTarefaById = async (req, res) => {
  const idTarefa = req.params.idTarefa;

  try {
    const [result] = await pool.query(`
      SELECT * FROM tbTarefas
      WHERE idTarefa = ?
    `, [idTarefa]);

    if (result.length === 0) {
      return fail(res, "Tarefa não encontrada", 404);
    }

    return ok(res, result[0]);

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const getTarefaByUserID = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const sql = `
      SELECT * FROM tbTarefas
      WHERE idUsuario = ?
    `;

    const [result] = await pool.query(sql, [idUsuario]);

    return ok(res, result);

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const createTarefa = async (req, res) => {
  const { nome_da_tarefa, tempo, relevancia, status, idUsuario } = req.body;

  if (!nome_da_tarefa || !tempo || !relevancia || !status || !idUsuario) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const sql = `
      INSERT INTO tbTarefas (nome_da_tarefa, tempo, relevancia, status, idUsuario)
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [
      nome_da_tarefa, tempo, relevancia, status, idUsuario
    ]);

    if (result.affectedRows === 0) {
      return fail(res, "Erro ao inserir dados", 400);
    }

    return created(res, null, "Tarefa criada com sucesso");

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao inserir dados", 500);
  }
};

export const updateTarefa = async (req, res) => {
  const idTarefa = req.params.idTarefa;
  const { nome_da_tarefa, tempo, relevancia, status, idUsuario } = req.body;

  if (!nome_da_tarefa || !tempo || !relevancia || !status || !idUsuario) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const sql = `
      UPDATE tbTarefas
      SET nome_da_tarefa = ?, tempo = ?, relevancia = ?, status = ?, idUsuario = ?
      WHERE idTarefa = ?
    `;

    const [result] = await pool.query(sql, [
      nome_da_tarefa, tempo, relevancia, status, idUsuario, idTarefa
    ]);

    if (result.affectedRows === 0) {
      return fail(res, "Tarefa não encontrada", 404);
    }

    return ok(res, null, "Tarefa atualizada com sucesso");

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const patchTarefa = async (req, res) => {
  const idTarefa = req.params.idTarefa;
  const { coluna, valor } = req.body;

  if (!coluna || valor === undefined) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  const colunasPermitidas = [
    "nome_da_tarefa",
    "tempo",
    "relevancia",
    "status",
    "idUsuario"
  ];

  if (!colunasPermitidas.includes(coluna)) {
    return fail(res, "Coluna inválida", 400);
  }

  try {
    const sql = `
      UPDATE tbTarefas
      SET ${coluna} = ?
      WHERE idTarefa = ?
    `;

    const [result] = await pool.query(sql, [valor, idTarefa]);

    if (result.affectedRows === 0) {
      return fail(res, "Tarefa não encontrada", 404);
    }

    return ok(res, null, "Campo atualizado com sucesso");

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const deleteTarefa = async (req, res) => {
  const idTarefa = req.params.idTarefa;

  try {
    const [result] = await pool.query(
      "DELETE FROM tbTarefas WHERE idTarefa = ?",
      [idTarefa]
    );

    if (result.affectedRows === 0) {
      return fail(res, "Tarefa não encontrada", 404);
    }

    return ok(res, null, "Tarefa deletada com sucesso");

  } catch (err) {
    console.error(err);
    return fail(res, "Erro ao deletar dados", 500);
  }
};