const Joi = require("joi");

const categoryValidate = (payload) => {
    const categorySchema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            "string.empty": "Tên danh mục không được để trống.",
            "string.min": "Tên danh mục phải có ít nhất 3 ký tự.",
            "string.max": "Tên danh mục không được vượt quá 100 ký tự.",
            "any.required": "Tên danh mục là bắt buộc.",
        }),
        description: Joi.string().max(500).optional().messages({
            "string.max": "Mô tả không được vượt quá 500 ký tự.",
        }),
        parent_id: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/, "ObjectId")
            .allow(null)
            .optional()
            .messages({
                "string.pattern.base":
                    "ID của danh mục cha phải là ObjectId hợp lệ.",
            }),
        path: Joi.string().max(255).optional().messages({
            "string.max": "Đường dẫn không được vượt quá 255 ký tự.",
        }),
    });

    return categorySchema.validate(payload, { abortEarly: false });
};

module.exports = categoryValidate;
