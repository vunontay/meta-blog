const { Schema, model } = require("mongoose");
const slugify = require("slugify");

const tagSchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String },
    },
    { timestamps: true }
);

tagSchema.pre("save", function (next) {
    if (this.isModified("name")) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

module.exports = model("Tag", tagSchema);
