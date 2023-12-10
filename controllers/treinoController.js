
import { Treino } from '../models/Treino.js';
import { Log } from "../models/Log.js";


export const treinoIndex = async (req, res) => {

  try {
    const treinos = await Treino.findAll();
    res.status(200).json(treinos)
  } catch (error) {
    res.status(400).send(error)
  }
}

export const treinoCreate = async (req, res) => {
  const { personal_id, nome, carga, serie, rep  } = req.body


  if (!personal_id ||!nome || !carga || !serie || !rep) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const treino = await Treino.create({
        personal_id, nome, carga, serie, rep
    });
    res.status(201).json(treino)
  } catch (error) {
    // if (error.type = "unique violatio") {
    //   res.status(406).json({ id: 0, msg: "Erro... cref ou cpf já cadastrado" })
    // } else {
    //   res.status(400).send(error)
    // }
  }
}

export const treinoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await Treino.destroy({ where: { id } });
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })

  }
}

export const treinolUpdate = async (req, res) => {
  const { id } = req.params;

  const { personal_id, nome, carga, serie, rep } = req.body

  if (!personal_id || !nome || !carga || !serie || !rep) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe nome,  carga, serie e rep"
      })
    return
  }

  try {
    const treino = await Treino.findOne({ where: { id } })

    if (treino == null) {
      res.status(400).json({ erro: "Erro... Id inválido" })
      return
    }
    treino.update({ personal_id:personal_id, nome: nome, carga: carga, serie: serie, rep: rep})
    // treino.save() //testar se pode tirar isso aqui


    res.status(200).json({ id, msg: "Ok! Update com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}