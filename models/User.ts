
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    avatar: { type: String, required: true },
    address: {
        flat: { type: String },
        street: { type: String },
        landmark: { type: String },
        mobile: { type: String },
        city: { type: String },
        state: { type: String },
        pin: { type: String },
        country: { type: String }
    }
}, { timestamps: true })

const UserTable = mongoose.model('user', userSchema)
export default UserTable;