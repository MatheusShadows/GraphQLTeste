import { Sequelize } from "sequelize";
import 'dotenv'
import OracleDB from "oracledb";

const dbTeste = new Sequelize(process.env.DB_NAME,process.env.DB_LOGIN,process.env.DB_SENHA,{  
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

dbTeste
    .authenticate()
    .then(() => {
        console.log("Conectado ao banco "+process.env.DB_NAME)
    }).catch((error) => {
    console.log("Erro ao conectar com "+process.env.DB_NAME, error)
})

export default dbTeste