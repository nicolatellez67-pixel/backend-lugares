import "dotenv/config";

import inquirer from "inquirer";
import chalk from "chalk";
import bcrypt from "bcrypt";

import { connectDB } from "../src/database/connection";
import Usuario from "../src/database/models/usuario";

async function createUser() {
  try {
    await connectDB();

    console.log(chalk.yellow("=== Crear Usuario ==="));

    const questions: any[] = [
      {
        type: "input",
        name: "nombre",
        message: "Nombre:",
      },
      {
        type: "input",
        name: "email",
        message: "Email:",
      },
      {
        type: "password",
        name: "password",
        message: "Password:",
        mask: "*",
      },
      {
        type: "list",
        name: "rol",
        message: "Rol:",
        choices: ["ADMIN", "DOCENTE", "TUTOR"],
      },
    ];

    const answers = await inquirer.prompt(questions);

    const existe = await Usuario.findOne({
      email: answers.email,
    });

    if (existe) {
      console.log(chalk.red("❌ Ya existe un usuario con ese email"));
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(answers.password, 10);

    const usuario = await Usuario.create({
      nombre: answers.nombre,
      email: answers.email,
      password: hashedPassword,
      rol: answers.rol,
      activo: true,
    });

    console.log(chalk.green(`✅ Usuario creado: ${usuario.nombre}`));

    process.exit(0);
  } catch (error) {
    console.error(chalk.red("❌ Error creando usuario"), error);
    process.exit(1);
  }
}

createUser();