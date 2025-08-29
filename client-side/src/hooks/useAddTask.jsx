import { useState } from "react";
import { handleaddTask } from "../services/AppService";

function useAddTask() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const addtask = (request) => {
    setLoading(true);
    try {
      handleaddTask(request)
        .then((response) => {
          setSuccess(response.data);
        })
        .catch((error) => {
          setMessage(error);
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
