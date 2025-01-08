const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        permissions: [{ type: Schema.Types.ObjectId, ref: "Permission" }],
    },
    { timestamps: true }
);

module.exports = model("Role", roleSchema);
