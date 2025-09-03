import { useState } from "react";
import { handleaddTask } from "../services/AppService";
import { useDispatch } from "react-redux";
import { addTask } from "../utils/taskSlice";
function useAddTask() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const addtask = (request) => {
    setLoading(true);
    try {
      handleaddTask(request)
        .then((response) => {
          dispatch(addTask(response.data.data));
          setSuccess(response.data.status);
        })
        .catch((error) => {
          setError(error);
        });
    } catch (error) {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };
  const reset = () => {
    setError("");
    setSuccess("");
  };
  return { addtask, error, success, loading, reset };
}
export default useAddTask;
