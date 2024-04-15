import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

interface BackProps {
  onClick: any;
  text?: string;
}
const Back = ({ onClick, text = "Voltar" }: BackProps) => {
  return (
    <Button variant={"link"} onClick={onClick}>
      <ArrowLeft />
      {text}
    </Button>
  );
};

export default Back;
