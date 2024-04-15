import { User } from "@/App";
import { useEffect, useState } from "react";
import { Time } from "./time";
import Loading from "../ui/loading";
import { getUsersAndTimes } from "@/api/requests";
import Option from "../ui/option";
import { Clock, Swords, User as UserIcon } from "lucide-react";
import Times from "./panel/times";
import Users from "./panel/users";
import Back from "./back";
import Courts from "./panel/courts";

interface PanelPageProps {
  setPage: any;
  user: any;
}

const getTable = (
  setPage: any,
  selected: string,
  users: User[],
  times: Time[],
  courts: string[]
) => {
  switch (selected) {
    case "users":
      return <Users users={users} />;
    case "times":
      return <Times times={times} />;
    case "courts":
      return <Courts courts={courts} setPage={setPage} />;
    default:
      return <></>;
  }
};

const PanelPage = ({ setPage, user }: PanelPageProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [times, setTimes] = useState<Time[]>([]);
  const [courts, setCourts] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>("users");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      const res = await getUsersAndTimes();
      setUsers(res.users);
      setTimes(res.times);
      setCourts(res.courts);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <>
      <Back onClick={() => setPage("home")} />
      {user.role !== "admin" ? (
        <>
          <h1>Você não pode acessar esta página.</h1>
        </>
      ) : (
        <Loading isLoading={loading}>
          <h1 className="text-3xl font-bold text-center">
            Painel administrador
          </h1>
          <div className="flex gap-3 my-5">
            <Option
              name="Usuários"
              icon={<UserIcon />}
              click={() => setSelected("users")}
              selected={selected === "users"}
            />
            <Option
              name="Horários"
              icon={<Clock />}
              click={() => setSelected("times")}
              selected={selected === "times"}
            />
            <Option
              name="Quadras"
              icon={<Swords />}
              click={() => setSelected("courts")}
              selected={selected === "courts"}
            />
          </div>
          <div>{getTable(setPage, selected, users, times, courts)}</div>
        </Loading>
      )}
    </>
  );
};

export default PanelPage;
