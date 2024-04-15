import { success, error } from "../utils/response.js";
import { saveLog } from "../middlewares/logger.js";
import { populateUserInRequestType } from "../middlewares/auth.js";
import userRouter from "./userRouter.js";
import courtRouter from "./courtRouter.js";
import timeRouter from "./timeRouter.js";
import adminRouter from "./adminRouter.js";

const routes = (app) => {
  app.use(saveLog);
  app.use(populateUserInRequestType());

  app.route("/").get((req, res) => {
    return success(res, "Loja: Você está em nossa API, seja bem vindo!");
  });

  app.use("/user", userRouter);
  app.use("/courts", courtRouter);
  app.use("/times", timeRouter);
  app.use("/admin", adminRouter);

  app.use((req, res) => {
    return error(res, "Rota não encontrada", 404);
  });
};

export default routes;
