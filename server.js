import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import bodyParser from 'body-parser';

dotenv.config();
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = 5000;
import userRoutes from './routes/userRoutes.js';
// import ContactRoutes from './routes/ContactRoutes.js';
import cors from 'cors';

connectDB();

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL, 
    credentials: true 
}
));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));





app.use(cookieParser());



app.use('/api/users', userRoutes);
// app.use('/api/Contect', ContactRoutes);

app.get('/', (req,res) => res.send('Server is ready'));

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));