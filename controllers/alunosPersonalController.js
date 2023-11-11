
import { Aluno } from '../models/Aluno.js';
import { Personal } from '../models/Personal.js';
// lista os alunos no perfil do personal
export const alunoPersonalIndex = async (req, res) => {

    try {
        const { personal_id } = req.params;
        console.log(personal_id)
        const alunos = await Aluno.findAll({ where: { personal_id: personal_id } })
        res.status(200).json(alunos)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

// lista o personal no perfil dos alunos
export const personalAlunoIndex = async (req, res) => {

    try {
        const { aluno_id } = req.params;
        console.log(aluno_id)
        const aluno = await Aluno.findOne({
            where: { id: aluno_id },
            include: Personal
        })
        res.status(200).json(aluno.Personal)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}