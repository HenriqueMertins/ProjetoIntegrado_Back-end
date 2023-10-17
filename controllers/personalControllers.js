import bcrypt from 'bcrypt'

import { Personal } from '../models/Personal.js'
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

export const personalAlteraSenha = async (req, res) => {
  const { cpf, senha, novaSenha } = req.body

  if (!cpf || !senha || !novaSenha) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const personal = await Personal.findOne({ where: { cpf } })

    if (personal == null) {
      res.status(400).json({ erro: "Erro... CPF inválido" })
      return
    }

    const mensaValidacao = validaSenha(novaSenha)
    if (mensaValidacao.length >= 1) {
      res.status(400).json({ id: 0, msg: mensaValidacao })
      return
    }

    if (bcrypt.compareSync(senha, personal.senha)) {

      // gera a criptografia da nova senha
      const salt = bcrypt.genSaltSync(12)
      const hash = bcrypt.hashSync(novaSenha, salt)
      personal.senha = hash

      // salva a nova senha
      await personal.save()

      res.status(200).json({ msg: "Ok. Senha Alterada com Sucesso" })
    } else {

      // registra um log desta tentativa de troca de senha
      await Log.create({
        descricao: "Tentativa de Alteração de Senha",
        personal_id: personal.id
      })

      res.status(400).json({ erro: "Erro... Senha inválida" })
    }
  } catch (error) {
    res.status(400).json(error)
  }
}


export const personalIndex = async (req, res) => {

  try {
    const personais = await Personal.findAll();
    res.status(200).json(personais)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const personalCreate = async (req, res) => {
  const { nome, cpf, cref, fone, senha, ativo } = req.body


  if (!nome || !cpf || !cref || !fone || !senha || !ativo) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const personal = await Personal.create({
      nome, cpf, cref, fone, senha, ativo
    });
    res.status(201).json(personal)
  } catch (error) {
    if (error.type = "unique violatio") {
      res.status(406).json({ id: 0, msg: "Erro... cref ou cpf já cadastrado" })
    } else {
      res.status(400).send(error)
    }
  }
}

export const personalDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Personal.destroy({ where: { id } });
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })

  }
}

export const personalUpdate = async (req, res) => {
  const { id } = req.params;

  const { nome, cpf, cref, fone, senha, ativo } = req.body

  if (!nome || !cpf || !cref || !fone || !senha || !ativo) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe nome, cpf, cref, telefone e senha e atividade do personal"
      })
    return
  }

  try {
    const personal = await Personal.findOne({ where: { id } })

    if (personal == null) {
      res.status(400).json({ erro: "Erro... Id inválido" })
      return
    }
    personal.update({ nome: nome, cpf: cpf, cref: cref, fone: fone, senha: senha, ativo: ativo })
    personal.save() //testar se pode tirar isso aqui


    res.status(200).json({ id, msg: "Ok! Update com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}