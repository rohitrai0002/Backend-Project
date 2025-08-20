import mongoose, {Schema} from "mongoose"
import { User } from "./user.model"

const subscriptionSchema = new Schema({
    subcriber: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    channel: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps: true})

export const subscription = mongoose.model("Subscription", subscriptionSchema)