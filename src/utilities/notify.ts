import { toast } from "react-toastify";
import CustomToast from "../components/Common/CustomToast";

const notify = (msg: string) => {
  toast(CustomToast, {
    data: msg,
    closeButton: false,
    className: "p-0 w-[400px]",
  });
};

export default notify;
