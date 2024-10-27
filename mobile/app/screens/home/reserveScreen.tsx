import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { court, times } from "@/app/screens/panelScreen";
import api from "@/config/axios";
import Title from "@/app/components/title";
import Loading from "@/app/components/loading";

import styles from "@/app/styles/reserveScreen";
import SelectInput from "@/app/components/select";
import OptionButton from "@/app/components/optionButton";
import { useToast } from "@/app/context/toastContext";
import { getUserData } from "@/app/services/auth";

interface ReserveProps {
  setPage: (page: string) => void;
}

const getCourts = async () => {
  const response = await api.get("/courts");
  return response.data.data;
};

const getFreeTimes = async (courtId: string) => {
  const response = await api.get(`/times/free/${courtId}`);
  return response.data.data;
};

const reserveTime = async (
  court: string,
  date: string,
  hour: string,
  user: string
) => {
  const response = await api.post("/times", {
    user,
    court,
    date,
    hour,
  });
  return response.data.data;
};

const Reserve = ({ setPage }: ReserveProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [courts, setCourts] = useState<court[]>([]);
  const [freeDates, setFreeDates] = useState<string[]>([]);
  const [freeTimes, setFreeTimes] = useState<any[]>([]);
  const [selectedCourt, setSelectedCourt] = useState<court>();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { showToast } = useToast();

  const reserveHandler = async () => {
    if (!selectedCourt || !selectedDate || !selectedTime) {
      showToast("Preencha todos os campos!", "error");
      return;
    }
    setLoadingSave(true);
    const user = await getUserData();
    const response = await reserveTime(
      selectedCourt._id,
      selectedDate,
      selectedTime,
      user?._id || ""
    );

    setLoadingSave(false);
    showToast("Reserva realizada com sucesso!", "success");
  };

  useEffect(() => {
    setLoading(true);
    getCourts().then((data) => {
      setCourts(data);
      setLoading(false);
      setSelectedCourt(data[0]);
    });
  }, []);

  useEffect(() => {
    if (selectedCourt) {
      setLoading(true);
      getFreeTimes(selectedCourt._id).then((data) => {
        let dates = data.map((date: any) => date.date);
        dates = dates.filter(
          (date: string, index: number) => dates.indexOf(date) === index
        );
        setFreeDates(dates);
        setFreeTimes(data);

        setSelectedDate(dates[0]);
        setSelectedTime(data[0].hour);
        setLoading(false);
      });
    }
  }, [selectedCourt, loadingSave === false]);

  return (
    <View style={styles.container}>
      <Title title="Reservar horário" back onBack={() => setPage("home")} />

      <View style={styles.fields}>
        <Loading enabled={loading}>
          {courts.length === 0 ? (
            <Text style={styles.notFound}>Nenhuma quadra disponível</Text>
          ) : (
            <>
              <SelectInput
                label="Quadra"
                options={courts.map((court) => ({
                  label: court.name,
                  value: court._id,
                }))}
                selectedValue={selectedCourt?._id || ""}
                onValueChange={(value) => {
                  setSelectedCourt(courts.find((court) => court._id === value));
                }}
              />
              <SelectInput
                label="Data"
                options={freeDates.map((date) => ({
                  label: date,
                  value: date,
                  key: date,
                }))}
                selectedValue={selectedDate}
                onValueChange={(value) => {
                  setSelectedDate(value);
                  setSelectedTime(
                    freeTimes
                      .filter((time) => time.date === value)
                      .map((time) => time.hour)[0]
                  );
                }}
              />

              <SelectInput
                label="Horário"
                options={
                  freeTimes
                    .filter((time) => time.date === selectedDate)
                    .map((time) => ({
                      label:
                        time.hour + ":00 às " + getNextHour(time.hour) + ":00",
                      value: time.hour,
                      key: time.hour,
                    })) || []
                }
                selectedValue={selectedTime}
                onValueChange={(value) => {
                  setSelectedTime(value);
                }}
              />

              <View style={styles.texts}>
                <Text style={styles.text}>Quadra: {selectedCourt?.name}</Text>
                <Text style={styles.text}>Data: {selectedDate}</Text>
                <Text style={styles.text}>
                  Horário: {selectedTime}:00 às {getNextHour(selectedTime)}:00
                </Text>
                <Text style={styles.text}>
                  Valor: R$ {selectedCourt?.price.toFixed(2).replace(".", ",")}
                </Text>
              </View>

              <OptionButton
                onPress={reserveHandler}
                icon={
                  loadingSave ? (
                    <ActivityIndicator size="small" color="#000" />
                  ) : null
                }
                text="Reservar"
                style={styles.button}
              />
            </>
          )}
        </Loading>
      </View>
    </View>
  );
};

const getNextHour = (hour: string) => {
  const nextHour = parseInt(hour) + 1;
  if (nextHour > 24) return nextHour - 24;
  return nextHour;
};

export default Reserve;
