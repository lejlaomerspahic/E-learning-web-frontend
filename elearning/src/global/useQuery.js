import axios from "axios";
import { useHistory, useNavigate } from "react-router-dom";
import { useUser } from "../hook/useUser";
import { useEffect, useState } from "react";

const useQuery = ({ url }) => {
  const [apiData, setApiData] = useState();
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .get(url, config)
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          setUser(null);
        }
      });
  }, [url, user.token, navigate]);

  return { data: apiData };
};

export default useQuery;
