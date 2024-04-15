import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Back from "./back";
import { ArrowRight } from "lucide-react";
import { Modal } from "../ui/modal";
import { toast } from "sonner";
import { addTime, getCourts, getFreeTimes } from "@/api/requests";
import Loading from "../ui/loading";

interface TimePageProps {
  setPage: any;
  user: any;
}

export interface Time {
  id: string;
  date: string;
  hour: string;
  user: string;
  value: number;
  court: string;
}

export interface TimeFree {
  date: string;
  hour: string;
  court: string;
}

export interface Court {
  _id: string;
  name: string;
}

interface selected {
  date: string;
  hour: string;
  court: string;
}

const dayOfWeek = (date: string) => {
  const days: any = {
    0: "domingo",
    1: "segunda-feira",
    2: "terça-feira",
    3: "quarta-feira",
    4: "quinta-feira",
    5: "sexta-feira",
    6: "sábado",
  };

  date = date.split("/").reverse().join("-");
  const d = new Date(date);
  return days[d.getDay()];
};

const TimePage = ({ setPage, user }: TimePageProps) => {
  const [selected, setSelected] = useState<selected>({
    date: "",
    hour: "",
    court: "",
  });
  const [courts, setCourts] = useState<Court[]>([]);
  const [times, setTimes] = useState<TimeFree[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTime, setLoadingTime] = useState(true);

  const [days, setDays] = useState<string[]>([]);
  const [hours, setHours] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const [courts] = await Promise.all([getCourts()]);
      setCourts(courts);
      setLoading(false);
    };
    fetch();
  }, []);

  const reserveTime = async () => {
    await addTime(selected, user._id);
    toast("Reserva de horário", {
      description: "Horário reservado com sucesso!",
    });
    setPage("home");
  };

  const defineCourt = (court: string) => {
    const fetch = async () => {
      setLoadingTime(true);
      const times = await getFreeTimes(court);
      setTimes(times);
      setLoadingTime(false);

      const uniqueDays: any = [...new Set(times.map((t: Time) => t.date))];
      setDays(uniqueDays);
    };
    fetch();
    setSelected({ ...selected, court });
  };

  const defineDay = (day: string) => {
    const uniqueHours: any = [
      ...new Set(times.filter((t) => t.date === day).map((t) => t.hour)),
    ];
    setHours(uniqueHours);
    setSelected({ ...selected, date: day });
  };

  return (
    <Loading isLoading={loading}>
      <Back onClick={() => setPage("home")} text="Voltar" />
      {selected.court == "" ? (
        <div>
          <h1 className="text-3xl font-bold text-center">Selecione a quadra</h1>
          <div className="flex flex-col gap-4 my-2">
            {courts.map((court) => (
              <Button
                key={court._id}
                onClick={() => defineCourt(court._id)}
                variant={"secondary"}
              >
                {court.name}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col text-center max-w-[70%]">
          <h1 className="text-3xl font-bold text-center">Selecione o dia</h1>
          <Button
            variant={"link"}
            onClick={() => setSelected({ ...selected, court: "" })}
          >
            Selecionar a quadra
          </Button>
          <Loading isLoading={loadingTime}>
            <div className="flex gap-4 my-2 max-w-[60%] overflow-x-auto m-auto pb-4">
              {days.map((day) => (
                <Button
                  key={day}
                  onClick={() => defineDay(day)}
                  variant={"secondary"}
                  className={
                    selected.date === day ? "bg-[#585858] text-white" : ""
                  }
                >
                  {day}
                </Button>
              ))}
            </div>
            {selected.date !== "" && (
              <div className="my-5">
                <h2 className="text-2xl font-bold text-center">Horários</h2>
                <h3 className="my-2 text-sm text-gray-400">
                  o dia {selected.date} será {dayOfWeek(selected.date)}
                </h3>

                <div className="grid grid-cols-3 gap-4 mx-auto my-2">
                  {hours.map((hour) => (
                    <Button
                      key={hour}
                      onClick={() => setSelected({ ...selected, hour })}
                      variant={"secondary"}
                      className={
                        selected.hour === hour ? "bg-[#585858] text-white" : ""
                      }
                    >
                      {hour}:00
                    </Button>
                  ))}
                  {hours.length === 0 && <p>Não há horários disponíveis</p>}
                </div>

                {selected.hour !== "" && (
                  <div className="my-10">
                    <Modal
                      title="Reservar horário"
                      content={
                        <div>
                          Você deseja reservar o seguinte horário:
                          <div className="mt-3">
                            Quadra: {selected.court} <br />
                            Data: {selected.date} <br />
                            Dia da semana: {dayOfWeek(selected.date)}
                            <br />
                            Hora: {selected.hour}:00 <br />
                          </div>
                        </div>
                      }
                      text={
                        <>
                          Reservar
                          <ArrowRight />
                        </>
                      }
                      onClick={reserveTime}
                    />
                  </div>
                )}
              </div>
            )}
          </Loading>
        </div>
      )}
    </Loading>
  );
};

export default TimePage;
