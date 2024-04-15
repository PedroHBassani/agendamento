import { serverError, success } from "../utils/response.js";
import Time from "../models/Time.js";

export const formatDate = (date) => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const getTimesByUser = async (req, res) => {
  const { user } = req.params;
  try {
    const times = await Time.find({
      user: user,
    }).populate("court user");
    const timesFormatted = times.map((time) => ({
      id: time._id,
      date: formatDate(time.date),
      hour: time.time,
      user: time.user.name,
      value: time.court.price,
      court: time.court.name,
    }));
    return success(res, "", timesFormatted);
  } catch (error) {
    return serverError(res, error);
  }
};

export const getFreeTimes = async (req, res) => {
  const { court } = req.params;
  try {
    const query = {
      court,
      date: {
        $gte: new Date(),
        $lt: new Date(new Date().setDate(new Date().getDate() + 12)),
      },
    };
    const times = await Time.find(query);
    const formattedTimes = times.map((time) => ({
      date: formatDate(time.date),
      hour: parseInt(time.time),
    }));

    const freeTimes = [];
    for (let day = 0; day < 10; day++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + day);
      const currentDay = currentDate.getDay();
      const isWeekend = currentDay === 0 || currentDay === 6;
      const startHour = isWeekend ? 14 : 17;
      const endHour = isWeekend ? 21 : 23;
      const formattedDate = formatDate(currentDate);
      for (let hour = startHour; hour < endHour; hour++) {
        const h = parseInt(hour);
        if (
          formattedTimes.find(
            (time) => time.date == formattedDate && time.hour == h
          )
        ) {
          continue;
        }
        freeTimes.push({
          date: formattedDate,
          hour: hour,
        });
      }
    }

    return success(res, "", freeTimes);
  } catch (error) {
    return serverError(res, error);
  }
};

export const addTime = async (req, res) => {
  const { court, date, hour, user } = req.body;
  try {
    const invertedDate = date.split("/").reverse().join("/");
    const time = new Time({
      court,
      date: new Date(invertedDate),
      time: hour,
      user,
    });
    await time.save();
    return success(res, "Horário adicionado!");
  } catch (error) {
    return serverError(res, error);
  }
};

export const deleteTime = async (req, res) => {
  const { id } = req.params;
  try {
    await Time.findByIdAndDelete(id);
    return success(res, "Horário deletado!");
  } catch (error) {
    return serverError(res, error);
  }
};
