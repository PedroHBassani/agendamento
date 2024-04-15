import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber } from "../my-times";
import { NewCourt } from "./new-court";

interface CourtsProps {
  courts: any;
  setPage: any;
}

const Courts = ({ setPage, courts }: CourtsProps) => {
  return (
    <div>
      <div>
        <NewCourt setPage={setPage} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {courts.map((court: any) => (
            <TableRow key={court._id}>
              <TableCell className="font-medium">{court.name}</TableCell>
              <TableCell>{formatNumber(court.price)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Courts;
