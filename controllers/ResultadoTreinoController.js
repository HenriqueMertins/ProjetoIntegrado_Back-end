
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
  }
};

export const ResultadoTreinoDelete = async (req, res) => {
  const { id } = req.params;

  try {
    await ResultadoTreino.destroy({ where: { id } });
    res.status(200).json({ id, msg: "Ok! Excluído com sucesso" })
  } catch (error) {
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })

  }
}

export const ResultadoTreinoUpdate = async (req, res) => {
  const { id } = req.params;

  const { aluno_id, treino_id, data, carga, serie, rep } = req.body

  if (!aluno_id || !treino_id || !data || !carga || !serie || !rep) {
    res.status(400).json(
      {
        id: 0,
        msg: "Erro... informe id do personal, nome, carga, serie, rep e dia"
      })
    return
  }

  try {
    const treino = await ResultadoTreino.findOne({ where: { id } })

    if (treino == null) {
      res.status(400).json({ erro: "Erro... Id inválido" })
      return
    }
    treino.update({ aluno_id: aluno_id, treino_id: treino_id, data: data, carga: carga, serie: serie, rep: rep })


    res.status(200).json({ id, msg: "Ok! Update com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}