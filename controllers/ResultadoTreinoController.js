
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

export const resultadoTreinoAlunoIndex = async (req, res) => {
  const { personal_id,aluno_id,dia,data } = req.params;

  try {

   
    const resultados = await sequelize.query(`select t.id treinoid, t.nome, t.carga, t.serie,t.rep,t.dia,`
    + ` rt.id resultid, rt.carga resulcarga, rt.serie resulserie, rt.rep resulrep, rt.data resuldata `
    +` from Treinos t  left join resultadoTreinos rt on t.id=rt.treino_id  `
    +` where t.personal_id = ${personal_id} and t.dia = ${dia} `
    +` and (rt.aluno_id is null or rt.aluno_id =${aluno_id})`
    +` and (rt.data is null or rt.data ='${data}')`,
     { type: QueryTypes.SELECT });

    res.status(200).json(resultados);
  } catch (error) {
    console.error(error);
    res.status(400).json({ id: 0, msg: "Erro: " + error.message })
  }
};




// select *
// from Treinos t   
// where t.personal_id =1 and t.dia =1


// select *
// from resultadoTreinos rt  
// where rt.aluno_id =1 
// and rt.`data` ='2023-12-18'
// and rt.treino_id =1


// select *
// from Treinos t  left join resultadoTreinos rt  on t.id=rt.treino_id 
// where t.personal_id =1 and t.dia =1
// and (rt.aluno_id is null or rt.aluno_id =1)