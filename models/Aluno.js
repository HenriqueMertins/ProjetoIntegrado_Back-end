import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Personal } from './Personal.js';

import bcrypt from 'bcrypt'

export const Aluno = sequelize.define('aluno', {
  id: {
    type: DataTypes.INTEGER, //integer ou char
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(45),
    allowNull: false,
    unique: true
  },
  fone: {
    type: DataTypes.CHAR(11),
    allowNull: false
  },
  senha: {
    type: DataTypes.STRING(200),//string ou char
    allowNull: false
  }
});

Aluno.belongsTo(Personal, {
  foreignKey: {
    name: 'personal_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Personal.hasMany(Aluno, {
  foreignKey: 'personal_id'
})

Aluno.beforeCreate(aluno => {
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(aluno.senha, salt)
  aluno.senha = hash  
});

