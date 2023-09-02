import nodemailer from "nodemailer"

import { Aluno } from "../models/Aluno.js";
import { Personal } from "../models/Personal.js";
import { Log } from "../models/Log.js";

import md5 from 'md5'

// async..await is not allowed in global scope, must use a wrapper
async function main(nome, email, hash) {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "af7a249f1f6f79", // generated ethereal user
      pass: "3810a495a6053d", // generated ethereal password
    },
  });

  const link = "http://localhost:3000/trocasenha/"+hash

  let mensa = "<h5>Sistema de Avaliação de Restaurantes</h5>"
  mensa += `<h6>Estimado: ${nome}</h6>`
  mensa += "<h6>Você solicitou a troca de senha. "
  mensa += "Clique no link abaixo para alterar:</h6>"
  mensa += `<a href="${link}">Alterar sua senha</a>`

  // console.log(mensa)

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Sistema Avaliação Restaurante" <avalrest@email.com>', // sender address
    to: email, // list of receivers
    subject: "Solicitação Alteração de Senha", // Subject line
    text: `Copie e cole o endereço: ${link} para alterar`, // plain text body
    html: mensa, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

export const enviaEmailAluno = async (req, res) => {
  const { email } = req.body
  try {
    const aluno = await Aluno.findOne({ where: { email } })

    if (aluno == null) {
      res.status(400).json({ erro: "Erro... E-mail inválido" })
      return
    }
    const hash = md5(aluno.nome + email + Date.now())
    main(aluno.nome, email, hash).catch(console.error);

    res.status(200).json({ msg: "Ok. E-mail para alteração enviado com sucesso" })
  } catch (error) {
    res.status(400).json(error)
  }
}  

export const enviaEmailPersonal = async (req, res) => {
    const { email } = req.body
    try {
      const personal = await Personal.findOne({ where: { email } })
  
      if (personal == null) {
        res.status(400).json({ erro: "Erro... E-mail inválido" })
        return
      }
      const hash = md5(personal.nome + email + Date.now())
      main(personal.nome, email, hash).catch(console.error);
  
      res.status(200).json({ msg: "Ok. E-mail para alteração enviado com sucesso" })
    } catch (error) {
      res.status(400).json(error)
    }
  }  