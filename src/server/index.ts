import "dotenv/config";
import app from "../app/app";


const PORT = 3000;

app.listen(PORT, () => {
 console.log("servidor iniciado!");
});