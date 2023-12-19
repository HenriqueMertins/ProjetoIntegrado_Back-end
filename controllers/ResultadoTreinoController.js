
import { ResultadoTreino } from "../models/ResultadoTreino.js";

export const ResultadoTreinoIndex = async (req, res) => {
  try {
    const resultados = await ResultadoTreino.findAll();
    res.status(200).json(resultados);
  } catch (error) {
    res.status(400).send(error);
  }
};

// aluno_id, personal_id, data(dia/mes/ano), carga, serie, repeticao, 

export const ResultadoTreinoCreate = async (req, res) => {
  const { aluno_id, treino_id, data, carga, serie, rep } = req.body


  if (!aluno_id || !treino_id || !data || !carga || !serie || !rep) {
    res.status(400).json({ id: 0, msg: "Erro... Informe os dados" })
    return
  }

  try {
    const treino = await ResultadoTreino.create({
      aluno_id, treino_id, data, carga, serie, rep
    });
    res.status(201).json(treino)
  } catch (error) {
    console.log(error)
  }
};

