
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
  const { personal_id, nome, carga, serie, rep, dia  } = req.body


  if (!personal_id ||!nome || !carga || !serie || !rep || !dia) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const treino = await Treino.create({
        personal_id, nome, carga, serie, rep, dia
    });
    res.status(201).json(treino)
  } catch (error) {
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

  const { personal_id, nome, carga, serie, rep, dia } = req.body

  if (!personal_id || !nome || !carga || !serie || !rep || !dia) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe id do personal, nome, carga, serie, rep e dia"
      })
    return
  }

  try {
    const treino = await Treino.findOne({ where: { id } })

    if (treino == null) {
      res.status(400).json({ erro: "Erro... Id inválido" })
      return
    }
    treino.update({ personal_id:personal_id, nome: nome, carga: carga, serie: serie, rep: rep, dia: dia})


    res.status(200).json({ id, msg: "Ok! Update com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}

export const treinoAlunoIndex = async (req, res) => {
  const { personal_id, dia } = req.params;

  try {
    const treinos = await Treino.findAll({ where: { personal_id, dia } });

    res.status(200).json(treinos);
  } catch (error) {
    console.error(error);
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
};

