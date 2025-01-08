const { Schema, model } = require("mongoose");
const { default: slugify } = require("slugify");

const postSchema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        author_name: { type: String, required: true },
        author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
        category_ids: [{ type: Schema.Types.ObjectId, ref: "Category" }],
        tag_ids: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
        image_ids: [{ type: Schema.Types.ObjectId, ref: "Image" }],
        status: {
            type: String,
            enum: ["draft", "published", "archived"],
            default: "draft",
        },
        version: { type: Number, default: 1 },
        deleted_at: { type: Date },
    },
    { timestamps: true }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ status: 1 });
postSchema.index({ title: "text", content: "text" });

postSchema.pre("save", function (next) {
    if (this.isModified("title")) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
});

module.exports = model("Post", postSchema);
