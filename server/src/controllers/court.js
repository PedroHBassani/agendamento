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

export const updateCourt = async (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  try {
    const court = await Court.findById(id);
    court.name = name;
    court.price = price;
    await court.save();
    return success(res, "Quadra atualizada com sucesso!", court);
  } catch (error) {
    return serverError(res, error);
  }
};

export const deleteCourt = async (req, res) => {
  const { id } = req.params;
  try {
    await Court.findByIdAndDelete(id);
    return success(res, "Quadra deletada com sucesso!");
  } catch (error) {
    return serverError(res, error);
  }
};
