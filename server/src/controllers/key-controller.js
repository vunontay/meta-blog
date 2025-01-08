const { CREATED, SuccessResponse } = require("../middlewares/success-response");
const KeyService = require("../services/key-service");

class KeyController {
    createKey = async (req, res, next) => {
        new CREATED({
            message: "Key đã được tạo.",
            metadata: await KeyService.generateKey(),
        }).send(res);
    };
}

module.exports = new KeyController();
