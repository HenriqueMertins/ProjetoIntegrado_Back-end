
import { ResultadoTreino } from "../models/ResultadoTreino.js";
import { sequelize } from '../databases/conecta.js';
import { QueryTypes } from 'sequelize';


export const ResultadoTreinoIndex = async (req, res) => {
  try {
    const resultados = await ResultadoTreino.findAll();
    res.status(200).json(resultados);
  } catch (error) {
    res.status(400).send(error);
  }
};

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

export const resultadoTreinoAlunoIndex = async (req, res) => {
  const { personal_id, aluno_id, dia, data } = req.params;

  try {
    const treinosFeitos = await sequelize.query(`
      SELECT
        t.id AS treinoid,
        t.nome,
        t.carga,
        t.serie,
        t.rep,
        t.dia,
        rt.id AS resultid,
        rt.carga AS resulcarga,
        rt.serie AS resulserie,
        rt.rep AS resulrep,
        rt.data AS resuldata,
        true as realizado
      FROM Treinos t
      INNER JOIN resultadoTreinos rt ON t.id = rt.treino_id
      WHERE t.personal_id = ${personal_id}
        AND t.dia = ${dia}
        AND  rt.aluno_id = ${aluno_id}
        AND  rt.data = '${data}'
      union 
      SELECT
        t.id AS treinoid,
        t.nome,
        t.carga,
        t.serie,
        t.rep,
        t.dia,
        0 resultid,
        0 resulcarga,
        0 resulserie,
        0 resulrep,
        '1970-01-01' resuldata,
        false as realizado
      FROM Treinos t
      WHERE t.personal_id = ${personal_id}
        AND t.dia = ${dia}
        AND NOT EXISTS (
          SELECT 1
          FROM resultadoTreinos rt
          WHERE t.id = rt.treino_id
            AND rt.aluno_id = ${aluno_id}
            AND rt.data = '${data}'
        )
    `, { type: QueryTypes.SELECT });

    res.status(200).json( treinosFeitos );
  } catch (error) {
    console.error(error);
    res.status(400).json({ id: 0, msg: "Erro: " + error.message });
  }
};
