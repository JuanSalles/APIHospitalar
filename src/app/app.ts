import express from "express";
import conectaNaDataBase from "../config/dbConnect";
import routes from "../routes/index";

async function dbConection (){
  const conexao: any = await conectaNaDataBase();

  conexao.on("erro", (erro: Error) =>{
  console.error("Erro de conexão", erro)
  })

  conexao.once("open", () =>{
    console.log("Conexão com o banco OK")
  })
  
}

dbConection();

const app = express();
routes(app);


export default app;
