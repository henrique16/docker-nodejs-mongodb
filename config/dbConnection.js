const mongoose = require("mongoose"),

    connectionString = `mongodb://${process.env.DB_HOST}`,

    connection = () => mongoose.connect(connectionString, {
        useNewUrlParser: true,
        reconnectTries: 5,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

module.exports = connection;