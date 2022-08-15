const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true
    },
    slug: {
        type: String,
        require: true
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'category',
        require: true
    },
    writer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user',
        require: true
    },
    view: {
        type: Number,
        default: 0
    },
    content: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        default: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const articleModel = mongoose.model('article',articleSchema);

module.exports = articleModel;