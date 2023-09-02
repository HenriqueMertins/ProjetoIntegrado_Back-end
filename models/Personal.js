import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

import bcrypt from 'bcrypt'

export const Personal = sequelize.define('Personal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.INTEGER(45),
    allowNull: false,
    unique: true
  },
  cref: {
    type: DataTypes.INTEGER(45),//CHAR? e tem que ser unique
    allowNull: false,
    unique: true
  },
  fone: {
    type: DataTypes.CHAR(11),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  ativo: {
    type: DataTypes.BOOLEAN
  }
},
   {
    tableName: "personais"
  
});

Personal.beforeCreate(personal => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(personal.senha, salt)
  personal.senha = hash  
});


