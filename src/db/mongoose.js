const mongoose = require('mongoose');
const urlDB =
  'mongodb+srv://ritm:NLPZJNWF@2k19@cluster0-ufok9.mongodb.net/appointments?retryWrites=true&w=majority';
//'mongodb://127.0.0.1:27017/task-manager-api'
mongoose.connect(urlDB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
