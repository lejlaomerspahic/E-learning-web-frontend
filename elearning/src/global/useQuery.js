import axios from "axios";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";

const useQuery = ({ url }) => {
  const [apiData, setApiData] = useState();
  const { user, setUser } = useUser();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    console.log(config);
    console.log(url);
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
  }, [url, user.token]);

  return { data: apiData };
};

export default useQuery;
