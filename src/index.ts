import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./db/connect";
const app = express()
dotenv.config()
app.use(express.json())



//Routes
import {Authrouter} from "./routes/auth"
import {eventosRouter} from './routes/eventos'
import { auth } from "./middleware/auth"

app.use('/api/auth', Authrouter)
app.use('/api/', eventosRouter)


app.get('/', (req, res) => {
    res.send('Ola, mundo')
})


//Error Handler
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
app.use(notFound)
app.use(errorHandler)



const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log('A')
      console.log(error);
    }
  };

  start()