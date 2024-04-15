import { formatNumber } from "../my-times";
import { Time } from "../time";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TimesProps {
  times: Time[];
}

const Times = ({ times }: TimesProps) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Quadra</TableHead>
            <TableHead>Dia</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Usuário</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {times.map((time) => (
            <TableRow key={time.id}>
              <TableCell className="font-medium">{time.court}</TableCell>
              <TableCell className="font-medium">{time.date}</TableCell>
              <TableCell>{time.hour}:00</TableCell>
              <TableCell>{time.user}</TableCell>
              <TableCell>{formatNumber(time.value)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {times.reduce((acc, time) => acc + time.value, 0) > 0
                ? formatNumber(times.reduce((acc, time) => acc + time.value, 0))
                : formatNumber(0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default Times;
