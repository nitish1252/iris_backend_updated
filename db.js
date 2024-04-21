const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://nitishkhunteta:KPhqo7sZUWQSGlr9@cluster0.snwstuw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Export the Mongoose connection
module.exports = mongoose.connection;