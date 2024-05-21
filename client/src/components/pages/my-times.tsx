import { useEffect, useState } from "react";
import Back from "./back";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Time } from "./time";
import { Ban } from "lucide-react";
import { Modal } from "../ui/modal";
import { toast } from "sonner";
import { getTimesByUser, removeTime } from "@/api/requests";
import Loading from "../ui/loading";

interface MyTimesPageProps {
  setPage: any;
  user: any;
}

export const formatNumber = (number: any) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(number));
};

const MyTimesPage = ({ setPage, user }: MyTimesPageProps) => {
  const [times, setTimes] = useState<Time[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getTimesByUser(user._id);
      console.log(data);
      setTimes(data);
      setLoading(false);
    };
    fetch();
  }, []);

  const handleCancel = async (id: string) => {
    await removeTime(id)
    setTimes(times.filter((time) => time.id !== id));
    toast("Cancelamento de horário", {
      description: "Seu horário foi cancelado com sucesso.",
    });
  };

  return (
    <Loading isLoading={loading}>
      <div className="flex flex-col items-center justify-center w-full gap-4 text-white">
        <Back onClick={() => setPage("home")} />
        <h1 className="text-3xl font-bold text-center">Meus horários</h1>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Usuário</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead className="text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {times.map((time) => (
                <TableRow key={time.id}>
                  <TableCell className="font-medium">{time.date}</TableCell>
                  <TableCell>{time.hour}:00</TableCell>
                  <TableCell>{time.user}</TableCell>
                  <TableCell>{formatNumber(time.value)}</TableCell>
                  <TableCell>
                    <Modal
                      onClick={() => handleCancel(time.id)}
                      text={<Ban color="red" />}
                      title="Tem certeza que deseja cancelar seu horário?"
                      content={
                        "Essa ação não pode ser desfeita e você terá que reservar novamente."
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  {times.reduce((acc, time) => acc + time.value, 0) > 0
                    ? formatNumber(
                        times.reduce((acc, time) => acc + time.value, 0)
                      )
                    : formatNumber(0)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </Loading>
  );
};

export default MyTimesPage;
