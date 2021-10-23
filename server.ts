
import express from 'express';
import cors from 'cors';
import dotEnv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter';
import productRouter from './routers/productRouter';
import orderRouter from './routers/orderRouter';
import paymentRouter from './routers/paymentRouter';


const App: express.Application = express();

// configure cors
App.use(cors());

// configure dotEnv
dotEnv.config({ path: './.env' })


// port
const port = process.env.PORT || 5000

// configure express to recieve form json data
App.use(express.json());

// configure mongodb connections

if (process.env.MONGO_DB_LOCAL !== undefined) {
    mongoose.connect(process.env.MONGO_DB_LOCAL,
        {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true,
            useUnifiedTopology: true

        }).then((response) => {
            console.log('MongoDB connection successful.......');
        }).catch((error) => {
            console.log(error);
            process.exit(1); /*stop the node js process if unable to connect mongodb connection  */
        })
}

// basic url for App
App.get('/', (req: express.Request, res: express.Response) => {
    res.send(`<h2>Online shopping App Backend</h2>`)
})

// router configuration
App.use('/api/users', userRouter);
App.use('/api/products', productRouter);
App.use('/api/orders', orderRouter);
App.use('/api/payments', paymentRouter)


App.listen(port, () => {
    console.log(`App is running on port : ${port}`);
})


