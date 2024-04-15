import { Button } from "./button";

interface optionProps {
  name: string;
  click: () => void;
  icon: any;
  selected?: boolean;
}

const Option = ({ name, click, icon, selected }: optionProps) => {
  return (
    <Button
      variant={"link"}
      onClick={() => click()}
      className={
        "flex items-center justify-center gap-2 p-4 border border-gray-300 rounded-md" +
        (selected ? " bg-gray-200 text-black" : "")
      }
    >
      {icon}
      <span>{name}</span>
    </Button>
  );
};

export default Option;
