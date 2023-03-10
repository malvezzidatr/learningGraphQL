import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: String,
    active: {
        type: Boolean,
        require: true
    }
});

export default mongoose.model('User', userSchema)