import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Personal } from './Personal.js';
import { Aluno } from './Aluno.js';


export const Log = sequelize.define('log', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  descricao: {
    type: DataTypes.STRING(60),
    allowNull: false
  }
});

Log.belongsTo(Personal, {
  foreignKey: {
    name: 'personal_id',
    allowNull: true
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Personal.hasMany(Log, {
  foreignKey: 'personal_id'
})

Log.belongsTo(Aluno, {
    foreignKey: {
      name: 'aluno_id',
      allowNull: true
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  })
  
  Aluno.hasMany(Log, {
    foreignKey: 'aluno_id'
  })
  
