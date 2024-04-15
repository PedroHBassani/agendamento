import { Button } from "../ui/button";

interface NotFoundProps {
  setPage: any;
}

const NotFound = ({ setPage }: NotFoundProps) => {
  console.log("test");
  return (
    <>
      <h1>Em breve</h1>
      <Button variant={"link"} onClick={() => setPage("home")}>
        Voltar
      </Button>
    </>
  );
};

export default NotFound;
