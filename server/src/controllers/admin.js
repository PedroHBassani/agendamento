import { serverError, success } from "../utils/response.js";
import Court from "../models/Court.js";
import User from "../models/User.js";
import Time from "../models/Time.js";
import { formatDate } from "./time.js";

export const getUserAndTimes = async (req, res) => {
  try {
    const queryTime = {
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
      },
    };
    const [courts, users, times] = await Promise.all([
      Court.find({}),
      User.find({}, { name: 1, email: 1, role: 1 }),
      Time.find(queryTime).populate("court user").sort({ date: 1, time: 1 }),
    ]);

    const timesFormatted = times
      .filter((time) => time.court != null)
      .map((time) => ({
        id: time._id,
        date: formatDate(time.date),
        hour: time.time,
        user: time.user.name,
        value: time.court.price,
        court: time.court.name,
      }));

    return success(res, "", {
      courts,
      users,
      times: timesFormatted,
    });
  } catch (error) {
    return serverError(res, error);
  }
};
