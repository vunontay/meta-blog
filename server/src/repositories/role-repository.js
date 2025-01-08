const roleModel = require("../models/role-model");
const { convertToObjectIdMongodb } = require("../utils/util");

class RoleRepository {
    static async getPermissionByRoleId(roleId) {
        const permissions = await roleModel.aggregate([
            { $match: { _id: convertToObjectIdMongodb(roleId) } },
            {
                $lookup: {
                    from: "permissions",
                    localField: "permissions",
                    foreignField: "_id",
                    as: "permissions",
                },
            },
            {
                $unwind: { path: "$permissions" },
            },
            {
                $addFields: {
                    permissions: {
                        resource: "$permissions.resource",
                        action: "$permissions.action",
                        description: "$permissions.description",
                        name: "$permissions.name",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    description: 1,
                    "permissions.resource": 1,
                    "permissions.action": 1,
                    "permissions.name": 1,
                    "permissions.description": 1,
                },
            },
        ]);

        return permissions;
    }
}

module.exports = RoleRepository;
