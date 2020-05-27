const { MongoClient, ObjectID } = require('mongodb');
const connectionURL =
  'mongodb+srv://ritm:NLPZJNWF@2k19@cluster0-ufok9.mongodb.net/test?retryWrites=true&w=majority';
const databaseName = 'task-manager';

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log('unable to c onnect to database');
    }

    const db = client.db(databaseName);

    const updatePromise = db.collection('users').updateOne(
      {
        _id: new ObjectID('5eb25117a868711ba873e9e5'),
      },
      {
        $set: {
          name: 'Eladio',
        },
      }
    );
  }
);
