import axios, { AxiosError } from "axios";
export default async function fetchWeather(query: string) {
  try {
    const { data } = await axios.get(import.meta.env.VITE_URL, {
      params: {
        q: query,
        units: "metrics",
        appid: import.meta.env.VITE_APIKEY,
      },
    });

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const axiosError = error as AxiosError;
    if (axiosError.response && axiosError.response.status === 404) {
      throw new Error("City not found");
    }
    throw error;
  }
}
