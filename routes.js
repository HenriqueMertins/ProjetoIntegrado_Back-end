import { Router } from "express"
import { personalAlteraSenha, personalCreate, personalDelete, personalIndex, personalUpdate } from "./controllers/personalControllers.js"
import { alunoIndex, alunoCreate, alunoDelete, alunoUpdate, alunoAlteraSenha } from "./controllers/alunoController.js"
import { verificaLogin } from "./middlewares/verificaLogin.js"
import { loginAluno, loginPersonal } from "./controllers/loginController.js"

const router = Router()

router.get('/personais', personalIndex)
      .post('/personais', personalCreate)
      .delete('/personais/:id', verificaLogin, personalDelete)
      .put('/personais/:id', verificaLogin, personalUpdate)
      .put('/personais', verificaLogin, personalAlteraSenha)

router.get('/alunos', alunoIndex)
      .post('/alunos', alunoCreate)
      .delete('/alunos/:id', verificaLogin, alunoDelete)
      .put('/alunos/:id', verificaLogin, alunoUpdate)
      .put('/alunos', verificaLogin, alunoAlteraSenha)

router.post('/personal/login', loginPersonal)
// router.get('/personal/login', loginPersonal)
router.post('/aluno/login', loginAluno)
// router.get('/aluno/login', loginAluno)
      

export default router