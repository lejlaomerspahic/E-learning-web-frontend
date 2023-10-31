import axios from "axios";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";

const useQuery = ({ url, method, data }) => {
  const [apiData, setApiData] = useState();
  const { user, setUser } = useUser();

  const fetchData = (url, config) => {
    axios
      .get(url, config)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        if (error.response === 401) {
          setUser(null);
        }
      });
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    fetchData(url, config);
  }, [url, method]);

  return { data: apiData };
};

export default useQuery;
