const roles = [
    {
        name: "Admin",
        description: "Quản trị viên với tất cả các quyền",
        permissions: [],
    },
    {
        name: "Editor",
        description:
            "Biên tập viên với quyền quản lý bài viết, bình luận, danh mục và thẻ",
        permissions: [],
    },
    {
        name: "Author",
        description: "Tác giả với quyền tạo và quản lý bài viết của mình",
        permissions: [],
    },
    {
        name: "Moderator",
        description: "Điều hành viên với quyền quản lý bình luận và người dùng",
        permissions: [],
    },
    {
        name: "User",
        description: "Người dùng thông thường với quyền đọc và tạo bình luận",
        permissions: [],
    },
];

module.exports = roles;
