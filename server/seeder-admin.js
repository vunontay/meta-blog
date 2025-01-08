const dotenv = require("dotenv");
const roleModel = require("./src/models/role-model");
const userModel = require("./src/models/user-model");

dotenv.config();

const createAdmin = async () => {
    try {
        await require("./src/libs/init-mongodb");

        const adminRole = await roleModel.findOne({ name: "Admin" });
        if (!adminRole) {
            console.log("Không tìm thấy vai trò Admin");
            process.exit();
        }

        const adminExists = await userModel.findOne({
            email: "admin@example.com",
        });
        if (adminExists) {
            console.log("Admin đã tồn tại");
            process.exit();
        }

        const admin = await userModel.create({
            username: "admin",
            email: "admin@example.com",
            password: "123456",
            role_id: adminRole._id,
        });

        console.log("Admin đã được tạo:", admin);
        process.exit();
    } catch (error) {
        console.error("Tạo Admin thất bại:", error);
        process.exit(1);
    }
};

createAdmin();
