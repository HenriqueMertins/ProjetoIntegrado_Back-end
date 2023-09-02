import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import * as dotenv from 'dotenv'
import { Aluno } from '../models/Aluno.js'
import { Personal } from '../models/Personal.js'
import { Log } from '../models/Log.js'
dotenv.config()


export const loginAluno = async (req, res) => {
  const { cpf, senha } = req.body
  // evita de que a mensagem dê "pistas" para um possível invasor
  const mensaErroPadrao = "Erro... CPF ou senha inválido"
  if (!cpf || !senha) {
    //    res.status(400).json({ erro: "Informe cpf e senha de acesso" })
    res.status(400).json({ erro: mensaErroPadrao })
    return
  }

  // verifica se o cpf está cadastrado
  try {
    const aluno = await Aluno.findOne({ where: { cpf } })


    if (aluno == null) {
      // res.status(400).json({ erro: "Erro... cpf inválido" })
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }
    if (bcrypt.compareSync(senha, aluno.senha)) {

      const token = jwt.sign({
        user_logado_id: aluno.id,
        user_logado_nome: aluno.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )
      res.status(200).json({ msg: "Ok. Logado", token })
    } else {

      // registra um log desta tentativa de acesso
      await Log.create({
        descricao: "Tentativa de Acesso com Senha Inválida",
        aluno_id: aluno.id
      })

      // res.status(400).json({ erro: "Erro... Cpf inválida" })      
      res.status(400).json({ erro: mensaErroPadrao })
    }
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

export const loginPersonal = async (req, res) => {
  const { cpf, senha } = req.body
  // evita de que a mensagem dê "pistas" para um possível invasor
  const mensaErroPadrao = "Erro... CPF ou senha inválidooo"
  if (!cpf || !senha) {
    //    res.status(400).json({ erro: "Informe cpf e senha de acesso" })
    res.status(400).json({ erro: mensaErroPadrao })
    return
  }

  // verifica se o cpf está cadastrado
  try {
    const personal = await Personal.findOne({ where: { cpf } })


    if (personal == null) {
      // res.status(400).json({ erro: "Erro... cpf inválido" })
      res.status(400).json({ erro: mensaErroPadrao })
      return
    }
    if (bcrypt.compareSync(senha, personal.senha)) {

      const token = jwt.sign({
        user_logado_id: personal.id,
        user_logado_nome: personal.nome
      },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      )
      res.status(200).json({ msg: "Ok. Logado", token })
    } else {

      // registra um log desta tentativa de acesso
      await Log.create({
        descricao: "Tentativa de Acesso com Senha Inválida",
        personal_id: personal.id
      })

      // res.status(400).json({ erro: "Erro... Cpf inválida" })      
      res.status(400).json({ erro: mensaErroPadrao })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}
