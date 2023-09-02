import { Router } from "express"
import { personalAlteraSenha, personalCreate, personalDelete, personalIndex, personalUpdate } from "./controllers/personalControllers.js"
import { alunoIndex, alunoCreate, alunoDelete, alunoUpdate, alunoAlteraSenha } from "./controllers/alunoController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { loginAluno, loginPersonal } from "./controllers/loginController.js"

const router = Router()

router.get('/personais', personalIndex)
      .post('/personais', personalCreate)
      .delete('/personais/:id', personalDelete)
      .put('/personais/:id', personalUpdate)
      .put('/personais', personalAlteraSenha)

router.get('/alunos', verificaLogin, alunoIndex)
      .post('/alunos', alunoCreate)
      .delete('/alunos/:id', alunoDelete)
      .put('/alunos/:id', alunoUpdate)
      .put('/alunos', alunoAlteraSenha)

router.get('/personal/login', loginPersonal)
router.get('/aluno/login', loginAluno)
      

export default router