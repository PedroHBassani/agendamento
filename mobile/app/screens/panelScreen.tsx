import { View } from "react-native";
import { useEffect, useState } from "react";
import Title from "../components/title";

import styles from "../styles/homeScreen";
import PanelMenu from "../components/menus/panel";
import Users from "./panel/users";
import api from "@/config/axios";
import Loading from "../components/loading";
import Courts from "./panel/courts";
import Times from "./panel/times";

interface PanelProps {
  changePage: React.Dispatch<React.SetStateAction<string>>;
}

export type court = {
  updatedAt: string;
  name: string;
  price: number;
  createdAt: string;
  __v: number;
  _id: string;
};

export type users = {
  email: string;
  name: string;
  role: string;
  _id: string;
};

export type times = {
  court: string;
  date: string;
  hour: string;
  id: string;
  user: string;
  value: number;
};

type adminResponseType = {
  courts: court[];
  users: users[];
  times: times[];
};

const getData = async () => {
  const response = await api.get("/admin/");
  return response.data.data as adminResponseType;
};

const PanelScreen = ({ changePage }: PanelProps) => {
  const [page, setPage] = useState<string>("home");
  const [data, setData] = useState<adminResponseType>({
    courts: [],
    users: [],
    times: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await getData();
      setLoading(false);
      setData(response);
    };

    fetchData();
  }, [reload]);

  return (
    <View style={styles.container}>
      {page === "home" && (
        <Title title="Painel" back={true} onBack={() => changePage("home")} />
      )}
      <Loading enabled={loading}>
        {getPage(page, setPage, data, () => setReload(!reload))}
      </Loading>
    </View>
  );
};

const getPage = (
  page: string,
  setPage: React.Dispatch<React.SetStateAction<string>>,
  data: adminResponseType,
  onReload: () => void
) => {
  switch (page) {
    case "users":
      return (
        <Users
          onBack={() => setPage("home")}
          users={data.users}
          onReload={onReload}
        />
      );
    case "courts":
      return (
        <Courts
          onBack={() => setPage("home")}
          courts={data.courts}
          onReload={onReload}
        />
      );
    case "times":
      return (
        <Times
          onBack={() => setPage("home")}
          times={data.times}
          onReload={onReload}
        />
      );
    default:
      return <PanelMenu setPage={setPage} />;
  }
};

export default PanelScreen;
