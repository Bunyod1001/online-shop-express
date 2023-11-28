import express from 'express';
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';
import { create, engine } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



const app = express();

const hbs = create({
    defaultLayout:'main',
    extname:"hbs",
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')


app.get ( '/', (req, res) => {
 res.render('index')
})

app.get ( '/about', (req, res) => {
    res.render('about')
})

const PORT = process.env.PORT || 4100
app.listen(PORT, () => 
console.log(`server is running on port : ${PORT}`))