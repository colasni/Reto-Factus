import express from "express"
import {config} from 'dotenv'
import mongoose from "mongoose"
import {Router} from "express"
config();

const app = express();
app.use(express.json());


//conexión a la base de datos
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error("Error de conexión a la base de datos");
        process.exit(1);
    }
};
connectDB();

//Schema
const invoiceSchema = new mongoose.Schema({
        nombre: String,
        numero: String,
        email: String,
        total: String,
        qr: String,
    },{versionKey: false});

//instancia del modelo
const invoiceModel = new mongoose.model('invoice', invoiceSchema)

//controlador
const addInvoice = async(req, res)=>{
    try{
        const{nombre, numero, email, total, qr} = req.body;
        const newInvoice = new invoiceModel({nombre, numero, email, total, qr})
        await newInvoice.save();
        return res.status(200).json({message: 'factura guardada con exito'}); 
    }catch(error){
        return res.status(500).json({message:[error.message]})
    }
};

const getInvoice = async(req, res) =>{
    try{
        const invoices = await invoiceModel.find();
        res.status(200).json(invoices)
    }catch(error){
        res.status(500).json({message:[error.message]})
    }
}


//rutas
const rutas = Router();

rutas.post('/api/invoice/addinvoice', addInvoice);
rutas.get('/api/invoice/getinvoice', getInvoice);

app.use(rutas) //agrega la rutas a el servidor express


const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`servidor corriendo en el puerto ${PORT}`)
});






