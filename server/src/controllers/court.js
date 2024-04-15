import { serverError, success } from "../utils/response.js";
import Court from "../models/Court.js";

export const getCourts = async (req, res) => {
  try {
    const courts = await Court.find({});
    return success(res, "", courts);
  } catch (error) {
    return serverError(res, error);
  }
};

export const addCourt = async (req, res) => {
  const { name, price } = req.body;
  try {
    const court = new Court({ name, price });
    await court.save();
    return success(res, "Quadra criada com sucesso!", court);
  } catch (error) {
    return serverError(res, error);
  }
};
