import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
  return (
    <div className="flex items-center gap-3 justify-center py-40">
      <Spinner>Loading...</Spinner>
    </div>
  );
};

export default Loader;
