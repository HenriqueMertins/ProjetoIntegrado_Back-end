import { Router } from "express"
import { personalAlteraSenha, personalCreate, personalDelete, personalIndex, personalUpdate } from "./controllers/personalControllers.js"
import { alunoIndex, alunoCreate, alunoDelete, alunoUpdate, alunoAlteraSenha } from "./controllers/alunoController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { loginAluno, loginPersonal } from "./controllers/loginController.js"
import { treinoAlunoIndex, treinoCreate, treinoDelete, treinoIndex, treinolUpdate } from "./controllers/treinoController.js"
import { alunoPersonalIndex, personalAlunoIndex } from "./controllers/alunosPersonalController.js"
import { ResultadoTreinoCreate, ResultadoTreinoDelete, ResultadoTreinoIndex, ResultadoTreinoUpdate } from "./controllers/ResultadoTreinoController.js"

const router = Router()

router.get('/personais', personalIndex)
      .post('/personais', personalCreate)
      .delete('/personais/:id',  personalDelete)
      .put('/personais/:id', verificaLogin, personalUpdate)
      .put('/personais', verificaLogin, personalAlteraSenha)

router.get('/alunos', alunoIndex)
      .post('/alunos', alunoCreate)
      .delete('/alunos/:id',  alunoDelete)
      .put('/alunos/:id', verificaLogin, alunoUpdate)
      .put('/alunos', verificaLogin, alunoAlteraSenha)

router.get('/treinos', treinoIndex)
      .post('/treinos', treinoCreate)
      .delete('treinos', treinoDelete)
      .put('treinos', treinolUpdate)
      .get('/treinos/:personal_id/:dia', treinoAlunoIndex)

router.get('/alunosPersonal/:personal_id', alunoPersonalIndex)
      .get('/personalAlunos/:aluno_id', personalAlunoIndex)

router.get('/resultadoTreino', ResultadoTreinoIndex)
      .post('/resultadoTreino', ResultadoTreinoCreate)
      .delete('resultadoTreino', ResultadoTreinoDelete)
      .put('resultadoTreino', ResultadoTreinoUpdate)


router.post('/personal/login', loginPersonal)
// router.get('/personal/login', loginPersonal)
router.post('/aluno/login', loginAluno)
// router.get('/aluno/login', loginAluno)


export default router