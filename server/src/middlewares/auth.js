import jwt from "jsonwebtoken";
import { error, serverError } from "../utils/response.js";
import { routesType } from "../utils/constants.js";

export const permissions = {
  user: "user",
  provider: "provider",
  helper: "helper",
  admin: "admin",
};

export const permissionsByRole = {
  user: ["user", "provider", "helper", "admin"],
  provider: ["provider", "helper", "admin"],
  helper: ["helper", "admin"],
  admin: ["admin"],
};

export const verifyToken = (req, res, next) => {
  try {
    const verify = verifyTokenAndPopulateUser(req, res);
    if (!verify) {
      return error(res, "Você não tem permissão para acessar essa rota!", 403);
    }
    req.user = verify;
    next();
  } catch (e) {
    return error(res, "Você não tem permissão para acessar essa rota!", 403);
  }
};

export const populateUserInRequestType = (type = routesType.panel) => {
  return (req, res, next) => {
    if (req.query.type === type) {
      if (!verifyTokenAndPopulateUser(req, res)) {
        return error(
          res,
          "Você não tem permissão para acessar essa rota!",
          403
        );
      } else {
        req.user = verifyTokenAndPopulateUser(req, res);
      }
    }
    next();
  };
};

export const verifyPermission = (permission) => {
  return (req, res, next) => {
    try {
      const userRole = req.user.role;
      if (!permissionsByRole[permission].includes(userRole)) {
        return error(
          res,
          "Você não tem permissão para acessar essa rota!",
          403
        );
      }
      next();
    } catch (error) {
      return serverError(res, error.message);
    }
  };
};

export const verifyUserPermission = (
  userRole,
  permission,
  onlyRole = false
) => {
  if (onlyRole && userRole !== permission) {
    return false;
  } else if (!permissionsByRole[permission].includes(userRole)) {
    return false;
  }
  return true;
};

export const verifyTokenAndPopulateUser = (req, res) => {
  let token = req.headers.authorization;
  if (!token) {
    return false;
  }
  if (token.startsWith("Bearer ")) {
    token = token.replace("Bearer ", "");
  }
  return jwt.verify(token, process.env.JWT_SECRET);
};
