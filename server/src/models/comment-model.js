const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        post_id: { type: Schema.Types.ObjectId, ref: "Post" },
        user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, required: true },
        left: { type: Number, default: 0 },
        right: { type: Number, default: 0 },
        parent_id: { type: Schema.Types.ObjectId, ref: "Comment" },
        is_deleted: { type: Boolean, default: false },
        deleted_at: { type: Date },
    },
    { timestamps: true }
);

module.exports = model("Comment", commentSchema);
