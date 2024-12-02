const mongoose = require("mongoose");

const schema = mongoose.Schema({
    role_id: {type: mongoose.SchemaTypes.ObjectId, required: true},
    user_id: {type: mongoose.SchemaTypes.ObjectId, default: true},
},{
    versionKey: false,
    timestamps: 
    {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class UserRoles extends mongoose.Model 
{

}

schema.loadClass(UserRoles);
module.exports = mongoose.Model("user_ roles", schema);