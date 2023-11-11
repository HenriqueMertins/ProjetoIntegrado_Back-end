import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

import bcrypt from 'bcrypt'

export const Treino = sequelize.define('Treino', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  carga: {
    type: DataTypes.INTEGER(45),
    allowNull: false,
  },
  serie: {
    type: DataTypes.INTEGER(45),
    allowNull: false,
  },
  rep: {
    type: DataTypes.INTEGER(45),
    allowNull: false
  }
},
//    {
//     tableName: "treinos"
  
// }
);




