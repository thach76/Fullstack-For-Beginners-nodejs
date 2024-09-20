require('dotenv').config();
const express = require('express'); //commonjs
const configViewEngine = require('./config/viewEngine');
// config routers
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const destinationRoutes = require("./routes/destinationsRoutes");
const uploadRoutes = require("./routes/uploadRouter");
//config database
const connection = require('./config/database');
const cors = require('cors'); // for cross-origin resource sharing (CORS)

const app = express();
const port = process.env.PORT || 8888;

//config cors
app.use(cors());

//config req.body
app.use(express.json()) // for json
app.use(express.urlencoded({ extended: true })) // for form data

//config template engine
configViewEngine(app);

//khai báo route
app.use('/v1/api/upload', uploadRoutes);
app.use('/v1/api/destinations', destinationRoutes);
app.use('/v1/api/', userRoutes);
app.use("/", homeRoutes);


(async () => {
    try {
        //using mongoose
        await connection();

        app.listen(port, () => {
            console.log(`Backend Nodejs App listening on port ${port}`)
        })
    } catch (error) {
        console.log(">>> Error connect to DB: ", error)
    }
})()
