const path = require('path');
const express = require('express');

const hbs = require('hbs');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');
const appointmentRouter = require('./routers/appointment');

const app = express();

const port = process.env.PORT || 5000;

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
app.use(appointmentRouter);

app.listen(port, () => {
  console.log('Server is up on port ' + port);
});
