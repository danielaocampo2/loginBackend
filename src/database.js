const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://analytics:analytics-password@cluster0.za8im.mongodb.net/JDPAUTOS?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(db => console.log('Database is Connected'))
    .catch(err => console.log(err));