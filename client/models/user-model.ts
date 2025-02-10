import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        avatar: { type: String },
        role_id: { type: Schema.Types.ObjectId, ref: "Role", required: true },
        is_premium: {
            type: Schema.Types.Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            enum: ["active", "inactive", "banned"],
            default: "active",
        },
        deleted_at: { type: Date },
    },
    { timestamps: true }
);

export default models.User || model("User", userSchema);
