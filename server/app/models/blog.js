const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*const BlogSchema = new Schema({
    title: String,
    author: String,
    views: Number,
    body: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});*/

const BlogSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Need article title']
    },
    author: {
        type: String,
        required: [true, 'Need article author']
    },
    views: Number,
    body: String,
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Blog', BlogSchema);
