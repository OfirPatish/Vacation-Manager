import { toast } from "react-toastify";

class Notify {
  public success(message: string) {
    toast.success(message);
  }

  public error(message: string) {
    toast.error(message);
  }

  public info(message: string) {
    toast.info(message);
  }
}

const notify = new Notify();
export default notify;
