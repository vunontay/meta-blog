const { Schema, model } = require("mongoose");

const keySchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

module.exports = model("Key", keySchema);
