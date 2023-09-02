import bcrypt from 'bcrypt'

import { Aluno } from '../models/Aluno.js'
import { Log } from "../models/Log.js";

function validaSenha(senha) {

  const mensa = []

  // .length: retorna o tamanho da string (da senha)
  if (senha.length < 8) {
    mensa.push("Erro... senha deve possuir, no mínimo, 8 caracteres")
  }

  // contadores
  let pequenas = 0
  let grandes = 0
  let numeros = 0
  let simbolos = 0

  // percorre as letras da variável senha
  for (const letra of senha) {
    // expressão regular
    if ((/[a-z]/).test(letra)) {
      pequenas++
    }
    else if ((/[A-Z]/).test(letra)) {
      grandes++
    }
    else if ((/[0-9]/).test(letra)) {
      numeros++
    } else {
      simbolos++
    }
  }

  if (pequenas == 0 || grandes == 0 || numeros == 0 || simbolos == 0) {
    mensa.push("Erro... senha deve possuir letras minúsculas, maiúsculas, números e símbolos")
  }

  return mensa
}

export const alunoAlteraSenha = async (req, res) => {
  const { cpf, senha, novaSenha } = req.body

  if (!cpf || !senha || !novaSenha) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const aluno = await Aluno.findOne({ where: { cpf } })

    if (aluno == null) {
      res.status(400).json({ erro: "Erro... CPF inválido" })
      return
    }

    const mensaValidacao = validaSenha(novaSenha)
    if (mensaValidacao.length >= 1) {
      res.status(400).json({ id: 0, msg: mensaValidacao })
      return
    }

    if (bcrypt.compareSync(senha, aluno.senha)) {

      // gera a criptografia da nova senha
      const salt = bcrypt.genSaltSync(12)
      const hash = bcrypt.hashSync(novaSenha, salt)
      aluno.senha = hash

      // salva a nova senha
      await aluno.save()

      res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" })
    } else {

      // registra um log desta tentativa de troca de senha
      await Log.create({
        descricao: "Tentativa de Alteração de Senha",
        aluno_id: aluno.id
      })

      res.status(400).json({ erro: "Erro... Senha inválida" })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}


export const alunoIndex = async (req, res) => {

  try {
    const alunos = await Aluno.findAll();
    res.status(200).json(alunos)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const alunoCreate = async (req, res) => {
  const { nome, cpf, fone, senha, personal_id } = req.body

  if (!nome || !cpf || !fone || !senha || !personal_id) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }
  console.log(req.body)

  try {
    const aluno = await Aluno.create({
      nome, cpf, fone, senha, personal_id
    });
    console.log(req.body)
    res.status(201).json(aluno)
  } catch (error) {
    if (error.type = "unique violatio") {
      console.log(error)
      res.status(406).json({ id: 0, msg: "Erro... cpf já cadastrado" })
    } else {
      res.status(400).send(error)
    }
  }
}

export const alunoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Aluno.destroy({ where: { id } });

    await Log.create({
      descricao: "Exclusão do Aluno " + id,
      personal_id_id: user_logado_id
    })

    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
}

export const alunoUpdate = async (req, res) => {
  const { id } = req.params;

  const { nome, cpf, fone, senha, personal_id } = req.body

  if (!nome || !cpf || !fone || !senha || !personal_id) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe nome, cpf, telefone e senha e atividade do aluno"
      })
    return
  }

  try {
    const aluno = await Aluno.findOne({ where: { id } })

    if (aluno == null) {
      res.status(400).json({ erro: "Erro... Mastricula inválida" })
      return
    }
    aluno.update({ nome: nome, cpf: cpf, fone: fone, senha: senha, personal_id: personal_id })
    aluno.save() //testar se pode tirar isso aqui


    res.status(200).json({ id, msg: "Ok! Update com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}