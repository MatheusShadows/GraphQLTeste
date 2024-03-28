import { Sequelize } from "sequelize";
import Produtos from "../models/produtos.js";
import Usuarios from "../models/usuarios.js";
import 'dotenv'
import OracleDB from "oracledb";

const models = [
    Usuarios,
    Produtos
]

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_LOGIN,process.env.DB_SENHA,{  
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'oracle',
    define: {
        timestamps: false,
        underscored: false,
        underscoredAll: false,
        freezeTableName: true,
    },
    dialectOptions: {
        //connectString: 'localhost:1521/XE',
        maxRows: 100, 
        fetchAsString: [OracleDB.NUMBER],
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

sequelize
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco "+process.env.DB_NAME)
    }).catch((error) => {
    console.log("Erro ao conectar com "+process.env.DB_NAME, error)
})

models.map((model)=>{
    model.init(sequelize)
})


sequelize.sync()

export default sequelize