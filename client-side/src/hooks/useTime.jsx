import { useState, useEffect } from "react";

function useTime() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);


    return () => clearInterval(timer);
  }, []);

  return {
    date: dateTime.toLocaleDateString(),   
    time: dateTime.toLocaleTimeString(),   
    dateTime                               
  };
}

export default useTime;