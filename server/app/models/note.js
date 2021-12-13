const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

let noteSchema = new mongoose.Schema({
    title: String,
    // body: String,
    body: Object,
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    archive: { type: Number, default: 0},
    sharedwith: [{ type: ObjectId, ref: 'User'}],
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    }
})

noteSchema.index({'title': 'text'})

module.exports = mongoose.model('Note', noteSchema)
