const permissions = [
    // User Permissions
    {
        name: "User:create",
        description: "Tạo người dùng",
        resource: "User",
        action: "create",
    },
    {
        name: "User:read",
        description: "Đọc thông tin người dùng",
        resource: "User",
        action: "read",
    },
    {
        name: "User:update",
        description: "Cập nhật người dùng",
        resource: "User",
        action: "update",
    },
    {
        name: "User:delete",
        description: "Xóa người dùng",
        resource: "User",
        action: "delete",
    },
    {
        name: "User:manage",
        description: "Quản lý người dùng",
        resource: "User",
        action: "manage",
    },

    // Post Permissions
    {
        name: "Post:create",
        description: "Tạo bài viết",
        resource: "Post",
        action: "create",
    },
    {
        name: "Post:read",
        description: "Đọc bài viết",
        resource: "Post",
        action: "read",
    },
    {
        name: "Post:update",
        description: "Cập nhật bài viết",
        resource: "Post",
        action: "update",
    },
    {
        name: "Post:delete",
        description: "Xóa bài viết",
        resource: "Post",
        action: "delete",
    },
    {
        name: "Post:publish",
        description: "Xuất bản bài viết",
        resource: "Post",
        action: "publish",
    },
    {
        name: "Post:archive",
        description: "Lưu trữ bài viết",
        resource: "Post",
        action: "archive",
    },

    // Comment Permissions
    {
        name: "Comment:create",
        description: "Tạo bình luận",
        resource: "Comment",
        action: "create",
    },
    {
        name: "Comment:read",
        description: "Đọc bình luận",
        resource: "Comment",
        action: "read",
    },
    {
        name: "Comment:update",
        description: "Cập nhật bình luận",
        resource: "Comment",
        action: "update",
    },
    {
        name: "Comment:delete",
        description: "Xóa bình luận",
        resource: "Comment",
        action: "delete",
    },

    // Category Permissions
    {
        name: "Category:create",
        description: "Tạo danh mục",
        resource: "Category",
        action: "create",
    },
    {
        name: "Category:read",
        description: "Đọc danh mục",
        resource: "Category",
        action: "read",
    },
    {
        name: "Category:update",
        description: "Cập nhật danh mục",
        resource: "Category",
        action: "update",
    },
    {
        name: "Category:delete",
        description: "Xóa danh mục",
        resource: "Category",
        action: "delete",
    },

    // Tag Permissions
    {
        name: "Tag:create",
        description: "Tạo thẻ",
        resource: "Tag",
        action: "create",
    },
    {
        name: "Tag:read",
        description: "Đọc thẻ",
        resource: "Tag",
        action: "read",
    },
    {
        name: "Tag:update",
        description: "Cập nhật thẻ",
        resource: "Tag",
        action: "update",
    },
    {
        name: "Tag:delete",
        description: "Xóa thẻ",
        resource: "Tag",
        action: "delete",
    },

    // Role Permissions
    {
        name: "Role:create",
        description: "Tạo vai trò",
        resource: "Role",
        action: "create",
    },
    {
        name: "Role:read",
        description: "Đọc vai trò",
        resource: "Role",
        action: "read",
    },
    {
        name: "Role:update",
        description: "Cập nhật vai trò",
        resource: "Role",
        action: "update",
    },
    {
        name: "Role:delete",
        description: "Xóa vai trò",
        resource: "Role",
        action: "delete",
    },
    {
        name: "Role:manage",
        description: "Quản lý vai trò",
        resource: "Role",
        action: "manage",
    },

    // Permission Permissions
    {
        name: "Permission:create",
        description: "Tạo quyền hạn",
        resource: "Permission",
        action: "create",
    },
    {
        name: "Permission:read",
        description: "Đọc quyền hạn",
        resource: "Permission",
        action: "read",
    },
    {
        name: "Permission:update",
        description: "Cập nhật quyền hạn",
        resource: "Permission",
        action: "update",
    },
    {
        name: "Permission:delete",
        description: "Xóa quyền hạn",
        resource: "Permission",
        action: "delete",
    },

    // APIKey Permissions
    {
        name: "APIKey:create",
        description: "Tạo khóa API",
        resource: "APIKey",
        action: "create",
    },
    {
        name: "APIKey:read",
        description: "Đọc khóa API",
        resource: "APIKey",
        action: "read",
    },
    {
        name: "APIKey:update",
        description: "Cập nhật khóa API",
        resource: "APIKey",
        action: "update",
    },
    {
        name: "APIKey:delete",
        description: "Xóa khóa API",
        resource: "APIKey",
        action: "delete",
    },
];

module.exports = permissions;
