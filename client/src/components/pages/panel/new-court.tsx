import { newCourt } from "@/api/requests";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export function NewCourt({ setPage }: { setPage: any }) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  const save = async () => {
    const res = await newCourt({ name, price });
    toast.success("Quadra criada com sucesso.");
    setPage("home");
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="flex mx-auto my-4">
        <Button variant="secondary">Nova Quadra</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nova Quadra</DialogTitle>
          <DialogDescription>
            Insira as informações da nova quadra.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center w-full gap-2">
          <div className="w-full">
            {" "}
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="w-full">
            <Label htmlFor="name">Preço</Label>
            <Input
              id="price"
              type="number"
              placeholder="Preço"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter className="items-center mx-auto sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Fechar
            </Button>
          </DialogClose>
          <DialogFooter>
            <Button type="submit" onClick={save}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
