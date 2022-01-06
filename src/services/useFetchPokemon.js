// import axios from "axios";
// import { useState } from "react";
import { useAxios } from "use-axios-client";

export default function useFetchPokemon(initialUrl) {
  // const [url, setUrl] = useState(initialUrl);
  const { data, error, loading } = useAxios(initialUrl);

  return [{ data, error, loading }];
  // if (loading || !data) return "Loading...";
  // if (error) return "Error!";

  // const [data, setData] = useState(initialData);
  // const [url, setUrl] = useState(initialUrl);
  // const [isLoading, setIsLoading] = useState(false);
  // const [isError, setIsError] = useState(false);

  // useEffect(() => {
  //   const fetchPokemon = async () => {
  //     setIsError(false);
  //     setIsLoading(true);

  //     try {
  //       const result = await axios(url);
  //       setData(result.data);
  //     } catch (error) {
  //       setIsError(true);
  //     }
  //     setIsLoading(false);
  //   };
  //   fetchPokemon();
  // }, [url]);

  // return [{ data, isLoading, isError }, setUrl];
}
