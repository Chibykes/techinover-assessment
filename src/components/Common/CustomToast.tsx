import { CgClose } from "react-icons/cg";
import { ToastContentProps } from "react-toastify";

const CustomToast = ({ closeToast, data }: ToastContentProps) => {
  return (
    <div className="flex w-full items-center justify-between gap-4 bg-zinc-900 p-4 text-white">
      <p className="">{data as string}</p>

      <button onClick={() => closeToast("close")}>
        <CgClose size={16} className="text-white" />
      </button>
    </div>
  );
};

export default CustomToast;
