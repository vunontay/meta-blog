const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");

const categorySchema = new Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String },
        slug: { type: String, required: true, unique: true },
        parent_id: { type: Schema.Types.ObjectId, ref: "Category" },
        path: { type: String },
    },
    { timestamps: true }
);

categorySchema.pre("save", function (next) {
    if (!this.slug) {
        this.slug = slugify(this.name, {
            lower: true,
            strict: true,
            replacement: "-",
        });
    }
    next();
});
module.exports = model("Category", categorySchema);
