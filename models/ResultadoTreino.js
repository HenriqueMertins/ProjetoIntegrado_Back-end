import { DataTypes } from 'sequelize';
import { sequelize } from '../databases/conecta.js';

import { Aluno } from './Aluno.js';
import { Treino } from './Treino.js';

export const ResultadoTreino = sequelize.define('resultadoTreino', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    data: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    "uniqueKeys": { "col1_col2_unique": { "fields": ["data","aluno_id", "personal_id"], customIndex: true } }

});

ResultadoTreino.belongsTo(Aluno, {
    foreignKey: {
        name: 'aluno_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

Aluno.hasMany(ResultadoTreino, {
    foreignKey: 'aluno_id'
})

ResultadoTreino.belongsTo(Treino, {
    foreignKey: {
        name: 'treino_id',
        allowNull: false
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
})

Treino.hasMany(ResultadoTreino, {
    foreignKey: 'treino_id'
})