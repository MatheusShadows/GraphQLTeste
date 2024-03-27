import { Model, DataTypes } from 'sequelize';

class Usuarios extends Model {
   static init(sequelize) {
      super.init(
         {
            usuario_id: {
               type: DataTypes.UUID,
               allowNull: false,
               defaultValue: sequelize.fn('random_uuid'),
               primaryKey: true,
            },
            usuario_nome: {
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
               allowNull: true
            }
         },
         {
            sequelize,
         }
      );

      return this;
   }
}

export default Usuarios;
