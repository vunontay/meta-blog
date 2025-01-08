const Joi = require("joi");

const registerValidate = (payload) => {
    const registerSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .lowercase()
            .required()
            .messages({
                "string.empty": "Email không được để trống.",
                "string.email": "Email không hợp lệ.",
                "any.required": "Email là bắt buộc.",
            }),
        username: Joi.string().alphanum().min(3).max(30).required().messages({
            "string.empty": "Tên người dùng không được để trống.",
            "string.min": "Tên người dùng phải có ít nhất 3 ký tự.",
            "string.max": "Tên người dùng không được vượt quá 30 ký tự.",
            "string.alphanum": "Tên người dùng chỉ được chứa chữ cái và số.",
            "any.required": "Tên người dùng là bắt buộc.",
        }),
        password: Joi.string()
            .min(8)
            .max(32)
            .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"))
            .required()
            .messages({
                "string.empty": "Mật khẩu không được để trống.",
                "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
                "string.max": "Mật khẩu không được vượt quá 32 ký tự.",
                "string.pattern.base":
                    "Mật khẩu phải bao gồm ít nhất một chữ cái thường, một chữ cái in hoa và một số.",
                "any.required": "Mật khẩu là bắt buộc.",
            }),
        avatar: Joi.string().uri().optional().messages({
            "string.uri": "Avatar phải là một URL hợp lệ.",
        }),
    });

    return registerSchema.validate(payload, { abortEarly: false });
};

const loginValidate = (payload) => {
    const loginSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: true } })
            .lowercase()
            .required()
            .messages({
                "string.empty": "Email không được để trống.",
                "string.email": "Email không hợp lệ.",
                "any.required": "Email là bắt buộc.",
            }),
        password: Joi.string().min(8).max(32).required().messages({
            "string.empty": "Mật khẩu không được để trống.",
            "string.min": "Mật khẩu phải có ít nhất 8 ký tự.",
            "string.max": "Mật khẩu không được vượt quá 32 ký tự.",
            "any.required": "Mật khẩu là bắt buộc.",
        }),
    });

    return loginSchema.validate(payload, { abortEarly: false });
};

module.exports = {
    registerValidate,
    loginValidate,
};
