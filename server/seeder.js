const dotenv = require("dotenv");
const permissionModel = require("./src/models/permission-model");
const roleModel = require("./src/models/role-model");
const permissions = require("./src/constants/permission-constant");
const roles = require("./src/constants/role-constant");
dotenv.config();
const seed = async () => {
    try {
        await require("./src/libs/init-mongodb");
        await permissionModel.deleteMany();
        await roleModel.deleteMany();

        const createdPermissions = await permissionModel.insertMany(
            permissions
        );
        console.log("Permissions đã được thêm.");

        // Gán permissions cho roles
        const adminPermissions = createdPermissions.map((p) => p._id); // Tất cả quyền
        const editorPermissions = createdPermissions
            .filter((p) =>
                [
                    "Post:create",
                    "Post:read",
                    "Post:update",
                    "Post:delete",
                    "Post:publish",
                    "Post:archive",
                    "Comment:create",
                    "Comment:read",
                    "Comment:update",
                    "Comment:delete",
                    "Category:create",
                    "Category:read",
                    "Category:update",
                    "Category:delete",
                    "Tag:create",
                    "Tag:read",
                    "Tag:update",
                    "Tag:delete",
                ].includes(p.name)
            )
            .map((p) => p._id);

        const authorPermissions = createdPermissions
            .filter((p) =>
                [
                    "Post:create",
                    "Post:read",
                    "Post:update",
                    "Post:delete",
                    "Comment:create",
                    "Comment:read",
                    "Comment:update",
                    "Comment:delete",
                ].includes(p.name)
            )
            .map((p) => p._id);

        const moderatorPermissions = createdPermissions
            .filter((p) =>
                [
                    "Comment:create",
                    "Comment:read",
                    "Comment:update",
                    "Comment:delete",
                    "User:read",
                    "User:update",
                ].includes(p.name)
            )
            .map((p) => p._id);

        const userPermissions = createdPermissions
            .filter((p) =>
                ["Post:read", "Comment:create", "Comment:read"].includes(p.name)
            )
            .map((p) => p._id);

        // Cập nhật permissions cho từng role
        roles[0].permissions = adminPermissions; // Admin
        roles[1].permissions = editorPermissions; // Editor
        roles[2].permissions = authorPermissions; // Author
        roles[3].permissions = moderatorPermissions; // Moderator
        roles[4].permissions = userPermissions; // User

        await roleModel.insertMany(roles);
        console.log("Roles đã được thêm.");
        process.exit();
    } catch (error) {
        console.error("Seed thất bại:", error);
        process.exit(1);
    }
};

seed();
