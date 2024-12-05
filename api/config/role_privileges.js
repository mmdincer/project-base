module.exports = {
    privGroups: [
        {
            id: "USERS",
            name: "User Permissions"
        },
        {
            id: "ROLES",
            name: "Role Permissions"
        },
        {
            id: "CATEGORIES",
            name: "Category Permissions"
        },
        {
            id: "AUDITLOGS",
            name: "AuditLogs Permissions"
        }
    ],

    privileges: [
        {
            key: "user_view",
            name: "User View",
            group: "USERS",
            description: "User view"
        },
        {
            key: "user_add",
            name: "User Add",
            group: "USERS",
            description: "User Add"
        },
        {
            key: "user_update",
            name: "User Update",
            group: "USERS",
            description: "User Update"
        },
        {
            key: "user_delete",
            name: "User Delete",
            group: "USERS",
            description: "User Delete"
        },
        {
            key: "role_view",
            name: "Role View",
            group: "ROLES",
            description: "Role view"
        },
        {
            key: "role_add",
            name: "Role Add",
            group: "ROLES",
            description: "Role Add"
        },
        {
            key: "role_update",
            name: "Role Update",
            group: "ROLES",
            description: "Role Update"
        },
        {
            key: "role_delete",
            name: "Role Delete",
            group: "ROLES",
            description: "Role Delete"
        },
        {
            key: "category_view",
            name: "category View",
            group: "CATEGORIES",
            description: "category view"
        },
        {
            key: "category_add",
            name: "category Add",
            group: "CATEGORIES",
            description: "category Add"
        },
        {
            key: "category_update",
            name: "category Update",
            group: "CATEGORIES",
            description: "category Update"
        },
        {
            key: "category_delete",
            name: "category Delete",
            group: "CATEGORIES",
            description: "category Delete"
        },
        {
            key: "auditlogs_view",
            name: "AuditLogs View",
            group: "AUDITLOGS",
            description: "AuditLogs View"
        },
        

    ]
};