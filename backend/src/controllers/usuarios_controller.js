import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "../utils/database.js";
import { ok, created, fail } from "../utils/responses.js";
import { userToken } from "../utils/auth.js";

export const getUsers = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM tbUsuarios");
    return ok(res, result);

  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const getUserById = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    const [result] = await pool.query(
      "SELECT * FROM tbUsuarios WHERE idUsuario = ?",
      [idUsuario]
    );

    if (result.length === 0) {
      return fail(res, "Usuário não encontrado", 404);
    }

    return ok(res, result);

  } catch (err) {
    console.error("Erro ao buscar dados:", err);
    return fail(res, "Erro ao buscar dados", 500);
  }
};

export const createUser = async (req, res) => {
  const { nome, usuario, email, senha } = req.body;

  if (!nome || !usuario || !email || !senha) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const [existingUser] = await pool.query(
      "SELECT idUsuario FROM tbUsuarios WHERE usuario = ?",
      [usuario]
    );

    if (existingUser.length > 0) {
      return fail(res, "Usuário já existe", 409);
    }

    const [existingEmail] = await pool.query(
      "SELECT idUsuario FROM tbUsuarios WHERE email = ?",
      [email]
    );

    if (existingEmail.length > 0) {
      return fail(res, "Email já existe", 409);
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `
      INSERT INTO tbUsuarios (nome, usuario, email, senha)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await pool.query(sql, [nome, usuario, email, senhaHash]);

    if (result.affectedRows === 0) {
      return fail(res, "Erro ao inserir dados", 400);
    }

    const idUsuario = result.insertId

    const token = userToken(idUsuario, usuario, email)

    return created(res, { token: token }, "Usuário criado com sucesso");

  } catch (err) {
    console.error("Erro ao inserir dados:", err);
    return fail(res, "Erro ao inserir dados", 500);
  }
};

export const updateUser = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  const { nome, usuario, email, senha } = req.body;

  if (!nome || !usuario || !email || !senha) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    const sql = `
      UPDATE tbUsuarios
      SET nome = ?, usuario = ?, email = ?, senha = ?
      WHERE idUsuario = ?
    `;

    const [result] = await pool.query(sql, [nome, usuario, email, senhaHash, idUsuario]);

    if (result.affectedRows === 0) {
      return fail(res, "Usuário não encontrado", 404);
    }

    return ok(res, null, "Usuário atualizado com sucesso");

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const patchUser = async (req, res) => {
  const idUsuario = req.params.idUsuario;
  let { coluna, valor } = req.body;

  if (!coluna || valor === undefined) {
    return fail(res, "Todos os campos são obrigatórios", 400);
  }

  const colunasPermitidas = ["nome", "usuario", "email", "senha"];

  if (!colunasPermitidas.includes(coluna)) {
    return fail(res, "Coluna inválida", 400);
  }

  try {
    if (coluna === "senha") {
      valor = await bcrypt.hash(valor, 10);
    }

    const sql = `
      UPDATE tbUsuarios
      SET ${coluna} = ?
      WHERE idUsuario = ?
    `;

    const [result] = await pool.query(sql, [valor, idUsuario]);

    if (result.affectedRows === 0) {
      return fail(res, "Usuário não encontrado", 404);
    }

    return ok(res, null, "Campo atualizado com sucesso");

  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return fail(res, "Erro ao atualizar dados", 500);
  }
};

export const deleteUser = async (req, res) => {
  const idUsuario = req.params.idUsuario;

  try {
    await pool.query(
      "DELETE FROM tbTarefas WHERE idUsuario = ?",
      [idUsuario]
    );
    
    const [result] = await pool.query(
      "DELETE FROM tbUsuarios WHERE idUsuario = ?",
      [idUsuario]
    );

    if (result.affectedRows === 0) {
      return fail(res, "Usuário não encontrado", 404);
    }

    return ok(res, null, "Usuário deletado com sucesso");

  } catch (err) {
    console.error("Erro ao deletar dados:", err);
    return fail(res, "Erro ao deletar dados", 500);
  }
};