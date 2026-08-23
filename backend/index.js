import express from 'express'
import cors from 'cors';

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(cors());

import usuariosRouter from "./src/routes/usuarios.js";
import tarefasRouter from "./src/routes/tarefas.js";
import devsRouter from "./src/routes/devs.js";
import authRouter from "./src/utils/auth.js"

app.use("/usuarios", usuariosRouter);
app.use("/tarefas", tarefasRouter);
app.use("/devs", devsRouter);
app.use("/auth", authRouter)

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})