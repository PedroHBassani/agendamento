import { useToast } from "@/app/context/toastContext";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { userType } from "../authScreen";
import { times } from "../panelScreen";
import Title from "@/app/components/title";
import api from "@/config/axios";
import Loading from "@/app/components/loading";
import TimesList from "@/app/components/timeList";

import styles from "@/app/styles/my-times";

interface MyTimesProps {
  setPage: (page: string) => void;
  user: userType;
}

const getMyTimes = async (user: string) => {
  const response = await api.get(`/times/user/${user}`);
  return response.data.data;
};

const cancelTime = async (id: string) => {
  const response = await api.delete(`/times/${id}`);
  return response.data;
};

const MyTimes = ({ setPage, user }: MyTimesProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [times, setTimes] = useState<times[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    setLoading(true);
    getMyTimes(user._id || "").then((data) => {
      setTimes(data);
      setLoading(false);
    });
  }, []);

  const handleCancel = async (id: string) => {
    setLoading(true);
    const response = await cancelTime(id);
    setLoading(false);
    if (response.status === "success") {
      setTimes(times.filter((time) => time.id !== id));
      showToast("Horário cancelado com sucesso", "success");
    } else {
      showToast("Erro ao cancelar horário", "error");
    }
  };

  return (
    <View style={styles.container}>
      <Title title="Meus Horários" onBack={() => setPage("home")} back />
      <Loading enabled={loading}>
        <TimesList
          times={times}
          canCancel
          onCancel={(id) => handleCancel(id)}
        />
      </Loading>
    </View>
  );
};

export default MyTimes;
