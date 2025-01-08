const { Schema, model } = require("mongoose");

const imageSchema = new Schema(
    {
        public_id: { type: String, required: true },
        secure_url: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = model("Image", imageSchema);
