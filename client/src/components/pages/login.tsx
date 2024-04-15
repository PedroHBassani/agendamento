import { User } from "@/App";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { userLogin, userRegister } from "@/api/requests";
import { toast } from "sonner";

interface loginPage {
  setUser: (user: User | null) => void;
}

const LoginPage = ({ setUser }: loginPage) => {
  const [login, setLogin] = useState<Boolean>(true);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    const res = await userLogin({
      email: data.email,
      password: data.password,
    });
    if (res.error) {
      toast.error(res.message);
      return;
    }
    setUser({
      _id: res.user._id,
      name: res.user.name,
      email: res.user.email,
      role: res.user.role,
    });
    toast.success("Login realizado com sucesso!");
  };

  const handleRegister = async () => {
    const res = await userRegister({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (res.error) {
      toast.error(res.message);
      return;
    }
    toast.success("Cadastro realizado com sucesso!");
    setLogin(true);
  };

  return (
    <>
      {login ? (
        <div className="flex flex-col items-center justify-center w-full gap-4 text-white">
          <h1 className="text-2xl font-bold text-center">
            Digite suas credenciais para entrar
          </h1>
          <div className="flex flex-col w-[50%] gap-2">
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                placeholder="Senha"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>
          <Button variant={"default"} onClick={handleLogin}>
            Entrar
          </Button>
          <Button variant={"link"} onClick={() => setLogin(false)}>
            Cadastre-se
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full gap-4 text-white">
          <h1 className="text-2xl font-bold text-center">Novo por aqui?</h1>

          <div className="flex flex-col w-[50%] gap-2">
            <div>
              <label htmlFor="name">Nome</label>
              <Input
                type="text"
                placeholder="Nome"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Input
                type="email"
                placeholder="Email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password">Senha</label>
              <Input
                type="password"
                placeholder="Senha"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </div>
          </div>

          <Button variant={"default"} onClick={handleRegister}>
            Registrar-se
          </Button>
          <Button variant={"link"} onClick={() => setLogin(true)}>
            Entrar
          </Button>
        </div>
      )}
    </>
  );
};

export default LoginPage;
