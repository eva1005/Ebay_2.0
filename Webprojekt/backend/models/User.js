const mongoose = require('mongoose');


//Schema erstellen - damit wird festgelegt, wie die Daten für einen User aussehen


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true 
    },
    password: {
        type: String, Number
      
    }
});

module.exports = mongoose.model('User', UserSchema);