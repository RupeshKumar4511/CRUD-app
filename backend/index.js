import bodyParser from 'body-parser';
import express from 'express';
import connection from './config/db.js';
import cors from 'cors'
import userController from './controllers/user.controller.js';
const app = express();
const port = 3000;

app.use(cors({origin:"http://localhost:5173"}))

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use('/user',userController);

app.listen(3000,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})