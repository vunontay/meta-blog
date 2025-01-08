const createError = require("http-errors");
const asyncHandler = require("../middlewares/async-handler");
const RoleRepository = require("../repositories/role-repository");

const authorize = (requiredPermissions) => {
    return asyncHandler(async (req, res, next) => {
        if (!req.user || !req.user.roleId) {
            return next(
                createError(
                    403,
                    "Bạn không có quyền truy cập vào tài nguyên này."
                )
            );
        }

        // Lấy role và permissions từ cơ sở dữ liệu hoặc bộ nhớ dựa trên role_id trong token
        const roleWithPermissions = await RoleRepository.getPermissionByRoleId(
            req.user.roleId
        );

        if (!roleWithPermissions || roleWithPermissions.length === 0) {
            return next(
                createError(403, "Vai trò không tồn tại hoặc không có quyền.")
            );
        }

        // Tạo mảng chứa tất cả các quyền của user
        const userPermissions = roleWithPermissions.flatMap((role) =>
            role.permissions
                ? [`${role.permissions.resource}:${role.permissions.action}`]
                : []
        );

        const hasPermission = requiredPermissions.every((permission) =>
            userPermissions.includes(permission)
        );

        if (!hasPermission) {
            return next(
                createError(403, "Bạn không có quyền thực hiện hành động này.")
            );
        }

        next();
    });
};

module.exports = authorize;
