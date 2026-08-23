import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { pool } from "./database.js";
import { fail, ok } from "./responses.js";

const router = express.Router();

export function userToken(idUsuario, usuario, email) {
	return jwt.sign({idUsuario: idUsuario, usuario: usuario, email: email}, 
		process.env.JWT_SECRET, 
		{expiresIn: "30d"})
}

router.post("/login", async (req, res) => {
	const { email, senha } = req.body;

	if (!email || !senha) {
		return fail(res, "Email e senha são obrigatórios.", 400);
	}

	try {
		const sql = "SELECT * FROM tbUsuarios WHERE email = ?";

		const [result] = await pool.query(sql, [email]);

		if (result.length === 0) {
			return fail(res, "Email ou senha inválidos.", 401);
		}

		const senhaCorreta = await bcrypt.compare(senha, result[0].senha);

		if (!senhaCorreta) {
			return fail(res, "Email ou senha inválidos.", 401);
		}

		const token = userToken(result[0].idUsuario, result[0].usuario, result[0].email)
		
		return ok(res, { token: token }, "Login realizado com sucesso.");


	} catch (err) {
		console.error("Erro ao buscar dados:", err);

		return fail(res, "Erro ao buscar dados", 500);
	}
});

export default router;
