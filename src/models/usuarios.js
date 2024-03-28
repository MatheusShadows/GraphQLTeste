import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';

class Usuarios extends Model {
   static init(sequelize) {
      super.init(
         {
            usuario_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               unique: true
            },
            usuario_nome: {
               type: DataTypes.STRING,
               allowNull: false
            },
            usuario_email: {
               type: DataTypes.STRING,
               allowNull: false
            },
            usuario_data_nascimento: {
               type: DataTypes.DATEONLY,
               allowNull: true
            },
            usuario_documento: {
               type: DataTypes.STRING,
               allowNull: true
            },
            usuario_senha: {
               type: DataTypes.STRING,
               allowNull: false
            },
         },
         {
            sequelize,
            timestamps: true,
            hooks: {
               beforeCreate: async function(record){
                  if (record.usuario_senha) {
                     record.usuario_senha = await bcrypt.hash(record.usuario_senha, 8);
                 }
               },
               beforeUpdate: async function(record){
                  if (record.usuario_senha) {
                     record.usuario_senha = await bcrypt.hash(record.usuario_senha, 8);
                 }
               }
            }
         }
      );

      return this;
   }
}

export default Usuarios;
