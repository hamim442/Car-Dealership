import { useEffect, useState } from "react";

export function useFetch(initialState, url, options) {
  const [data, setData] = useState(initialState);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetcher() {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(
            `Got a bad response from the server: ${response.status}`
          );
        }
        const data = await response.json();
        setData(data);
      } catch (e) {
        console.error("Couldn't fetch data");
        console.error(e);
        setError(e);
      }
    }
    fetcher();
  }, [url, options]);

  return {
    data,
    error,
  };
}
