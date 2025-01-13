const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const role_privileges = require("../config/role_privileges");
const Users = require("../db/models/Users");
const Roles = require("../db/models/Roles");
const RolePrivileges = require("../db/models/RolePrivileges");
const UserRoles = require("../db/models/UserRoles");
const i18n = new (require("../lib/i18n"))(config.DEFAULT_LANG);
// eslint-disable-next-line 
const { route } = require("./categories");
const config = require("../config");


const auth = require("../lib/auth")();

router.all("*", auth.authenticate(), (req, res, next) => {
    next();
});

router.get("/", auth.checkRoles("role_view") , async (req, res) => {
    try {
        let roles = await Roles.find({});

        res.json(Response.successResponse(roles));
        
    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post("/add", auth.checkRoles("role_add") , async (req, res) => {
    let body = req.body;
    try {

        if (!body.role_name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user?.language), i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user?.language, ["role_name"]));
        if (!body.permissions || !Array.isArray(body.permissions) || body.permissions.length == 0) {
            throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user?.language), i18n.translate("COMMON.FIELD_MUST_BE_TYPE", req.user?.language, ["permission", "array"]));
        }

        let role = new Roles({
            role_name: body.role_name,
            is_active: true,
            created_by: req.user?.id
        });

        await role.save();

        for (let i = 0; i < body.permissions.length; i++) {
            let priv = new RolePrivileges({
                role_id: role._id,
                permission: body.permissions[i],
                created_by: req.user?.id
            });

            await priv.save();
        }


        res.json(Response.successResponse({ success: true }));

    } catch (err) {
        let errorResponse = Response.errorResponse(err);
        res.status(errorResponse.code).json(errorResponse);
    }
});

router.post("/update",  auth.checkRoles("role_update") , async (req, res) => {
    try {
      let body = req.body;
      let updates = {};
  
      if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user?.language), i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user?.language, ["_id"]));
  
      if (body.password && body.password.length < Enum.PASS_LENGTH) {
        updates.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);
      }
  
      if (typeof body.is_active === "boolean") updates.is_active = body.is_active;
      if (body.first_name) updates.first_name = body.first_name;
      if (body.last_name) updates.last_name = body.last_name;
      if (body.phone_number) updates.phone_number = body.phone_number;
  
      if (Array.isArray(body.roles) && body.roles.length > 0) {
  
        let userRoles = await UserRoles.find({ user_id: body._id });
  
        let removedRoles = userRoles.filter(x => !body.roles.includes(x.role_id));
        let newRoles = body.roles.filter(x => !userRoles.map(r => r.role_id).includes(x));
  
        if (removedRoles.length > 0) {
          await UserRoles.deleteMany({ _id: { $in: removedRoles.map(x => x._id.toString()) } });
        }
  
        if (newRoles.length > 0) {
          for (let i = 0; i < newRoles.length; i++) {
            let userRole = new UserRoles({
              role_id: newRoles[i],
              user_id: body._id
            });
  
            await userRole.save();
          }
        }
  
      }
  
      await Users.updateOne({ _id: body._id }, updates);
  
      res.json(Response.successResponse({ success: true }));
  
    } catch (err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
});
  
router.post("/delete", auth.checkRoles("role_delete") , async (req, res) => {
    try {
      let body = req.body;
  
      if (!body._id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, i18n.translate("COMMON.VALIDATION_ERROR_TITLE", req.user?.language), i18n.translate("COMMON.FIELD_MUST_BE_FILLED", req.user?.language, ["_id"]));
  
      await Users.deleteOne({ _id: body._id });
  
      await UserRoles.deleteMany({ user_id: body._id });
  
      res.json(Response.successResponse({ success: true }));
  
    } catch (err) {
      let errorResponse = Response.errorResponse(err);
      res.status(errorResponse.code).json(errorResponse);
    }
});

router.get("/role_privileges", async (req, res) => {
    res.json(role_privileges);
});




module.exports = router;