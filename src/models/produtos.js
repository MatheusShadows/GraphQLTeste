import { Model, DataTypes } from 'sequelize';

class Produtos extends Model {
   static init(sequelize) {
      super.init(
         {
            produto_id: {
               type: DataTypes.INTEGER,
               allowNull: false,
               autoIncrement: true,
               primaryKey: true,
               unique: true
            },
            produto_nome: {
               type: DataTypes.STRING,
               allowNull: false
            },
            produto_id_externo: {
               type: DataTypes.STRING,
               allowNull: true
            },
            produto_valor: {
               type: DataTypes.DECIMAL,
               allowNull: true
            },
         },
         {
            sequelize,
            timestamps: true,        
         }
      );

      return this;
   }
}

export default Produtos;
