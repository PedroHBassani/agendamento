import { useState } from "react";
import "./App.css";
import LoginPage from "./components/pages/login";
import { Clock, Lock, Notebook } from "lucide-react";
import Option from "./components/ui/option";
import NotFound from "./components/pages/not-found";
import TimePage from "./components/pages/time";
import MyTimesPage from "./components/pages/my-times";
import { Toaster } from "./components/ui/sonner";
import PanelPage from "./components/pages/panel";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const getPage = (user: any, page: string, setPage: any) => {
  switch (page) {
    case "new-time":
      return <TimePage setPage={setPage} user={user} />;
    case "my-times":
      return <MyTimesPage setPage={setPage} user={user} />;
    case "panel":
      return <PanelPage setPage={setPage} user={user} />;
    default:
      return <NotFound setPage={setPage} />;
  }
};

function App() {
  // const [user, setUser] = useState<User | null>({
  //   email: "pedro@gmail.com",
  //   name: "Pedro Henrique",
  //   role: "admin",
  //   _id: "65c1632af12aa3b9acbb3fe4",
  // });
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<string>("home");

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-[#242424] text-white">
      {page === "home" ? (
        <>
          {user ? (
            <div className="flex flex-col items-center justify-center w-full gap-4 text-white">
              <h1 className="text-3xl font-bold text-center">
                Olá, {user.name}
              </h1>
              <h2>Escolha uma opção</h2>
              <div className="flex flex-col gap-4">
                <Option
                  name="Reservar horário"
                  click={() => setPage("new-time")}
                  icon={<Clock />}
                />
                <Option
                  name="Minhas reservas"
                  click={() => setPage("my-times")}
                  icon={<Notebook />}
                />
                <Option
                  name="Painel admin"
                  click={() => setPage("panel")}
                  icon={<Lock />}
                />
              </div>
            </div>
          ) : (
            <LoginPage setUser={setUser} />
          )}
        </>
      ) : (
        getPage(user, page, setPage)
      )}
      <Toaster />
    </div>
  );
}

export default App;
