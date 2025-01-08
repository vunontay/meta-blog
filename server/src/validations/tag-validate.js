const Joi = require("joi");

const tagValidate = (payload) => {
    const tagSchema = Joi.object({
        name: Joi.string().min(3).max(50).required().messages({
            "string.empty": "Tên tag không được để trống.",
            "string.min": "Tên tag phải có ít nhất 3 ký tự.",
            "string.max": "Tên tag không được vượt quá 50 ký tự.",
            "any.required": "Tên tag là bắt buộc.",
        }),
        description: Joi.string().max(255).optional().allow("").messages({
            "string.max": "Mô tả không được vượt quá 255 ký tự.",
        }),
    });

    return tagSchema.validate(payload, { abortEarly: false });
};

module.exports = {
    tagValidate,
};
