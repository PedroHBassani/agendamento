import { Loader } from "lucide-react";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading = ({ isLoading, children }: LoadingProps) => {
  return (
    <>
      {isLoading ? (
        <div className="flex gap-2">
          {/* infinite spin */}
          <Loader className="animate-spin" /> Carregando
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Loading;
