import express from 'express';
import { create, engine } from 'express-handlebars';
import AuthRoutes from "./routes/auth.js"
import ProductsRoutes from "./routes/products.js"
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'
import flash from "connect-flash"
import session from "express-session"
import cookiParser from "cookie-parser"
import varMiddleware from './middleware/var.middleware.js';
import userMiddleware from './middleware/user.middleware.js';
import hbsHelper from "./utils/index.js"

dotenv.config()


const app = express();

const hbs = create({
    defaultLayout:'main',
    extname:"hbs",
    helpers: hbsHelper,
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(express.json())
app.use(cookiParser())
app.use(session({secret:"Bunyod", resave:false ,saveUninitialized:false}))
app.use(flash())
app.use(varMiddleware)
app.use(userMiddleware)

app.use(AuthRoutes )
app.use(ProductsRoutes)
const startApp = () => {
   
  
  mongoose.set('strictQuery', false);
  
    mongoose
      .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("mongodb connection ");
  
        const PORT = process.env.PORT || 4100;
        app.listen(PORT, () => console.log(`server is running on port : ${PORT}`));
      })
      .catch((error) => {
        console.error("MongoDBga ulanishda xatolik:", error);
      });
  };
  
  startApp();