import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';
import { Personal } from './Personal.js';

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
  },
  dia: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 6,
    },
  },
});

Treino.belongsTo(Personal, {
  foreignKey: {
    name: 'personal_id',
    allowNull: false
  },
  onDelete: 'RESTRICT',
  onUpdate: 'CASCADE'
})

Personal.hasMany(Treino, {
  foreignKey: 'personal_id'
})




