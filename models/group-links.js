const mongoose = require('mongoose');

var groupLink = mongoose.Schema({
    roomId: {type: mongoose.Schema.Types.ObjectId, ref: 'channels'},
    roomName: {type: String}, 
    link: {type: String},
    createdAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('GroupLink', groupLink);