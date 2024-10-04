import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    content: { type: String, required: true },
    username: { type: String, required: true }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;

