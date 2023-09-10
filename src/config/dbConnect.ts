import mongoose, {mongo} from 'mongoose'

 export default async function conectaNaDataBase(){
   const chave: string =  process.env.DB_CONNECTION_STRING ?? ""
    mongoose.connect(chave);

    return mongoose.connection

 }
