import { error, serverError } from "../utils/response.js"
import { permissionsByRole } from "./auth.js"

/**
 * 
 * @param {*} type onde o id do usuário está no req (params, body, query, etc)
 * @param {*} orUserRole se o usuário não for o dono do recurso, qual o papel que ele precisa ter para acessar (admin, helper, etc)
 * @returns 
 */
export const onlyUser = (type, orUserRole = '', field = 'id') => {
    return (req, res, next) => {
        try {
            const { id, role } = req.user
            if (id !== req[type][field] && !(orUserRole !== '' && permissionsByRole[orUserRole].includes(role))) {
                return error(res, 'Você não tem permissão para realizar esta ação.', 403)
            }
            next()
        } catch (error) {
            return serverError(res, error)
        }
    }
}

export const isUser = (userId, verifyUserId) => {
    userId = userId.toString()
    verifyUserId = verifyUserId.toString()
    return userId === verifyUserId
}