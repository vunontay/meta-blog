const Joi = require("joi");

const postValidate = (payload) => {
    const postSchema = Joi.object({
        title: Joi.string().min(3).max(255).required().messages({
            "string.empty": "Tiêu đề không được để trống",
            "string.min": "Tiêu đề phải có ít nhất 3 ký tự",
            "string.max": "Tiêu đề không được vượt quá 255 ký tự",
            "any.required": "Tiêu đề là bắt buộc",
        }),
        content: Joi.string().min(10).required().messages({
            "string.empty": "Nội dung không được để trống",
            "string.min": "Nội dung phải có ít nhất 10 ký tự",
            "any.required": "Nội dung là bắt buộc",
        }),
        author_id: Joi.string().required().messages({
            "string.empty": "Tác giả không được để trống",
            "any.required": "Tác giả là bắt buộc",
        }),
        author_name: Joi.string().required().messages({
            "string.empty": "Tên tác giả không được để trống",
            "any.required": "Tên tác giả là bắt buộc",
        }),
        category_ids: Joi.array().items(Joi.string()).min(1).messages({
            "array.base": "Danh mục phải là một mảng",
            "array.min": "Bài viết phải có ít nhất một danh mục",
        }),
        tag_ids: Joi.array().items(Joi.string()).optional(),
        status: Joi.string().valid("draft", "published", "archived").optional(),
    });

    return postSchema.validate(payload, { abortEarly: false });
};

module.exports = { postValidate };
