import axios from "axios";
import {  useState } from "react";
import { Spinner } from "../spinner/Spinner";

export const Weather = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "https://api.openweathermap.org/data/2.5/weather",
        {
          params: {
            q: inputText,
            appid: "189271b827844bff7388350c44848615",
            units: "metric",
          },
        }
      );
      if (response && response.status === 200 && response.data) {
        setError(false);
        setData(response.data);
        setLoading(false);
        setSearchPerformed(true);

      }
      else {
        setError(true);
        setLoading(false);

        setErrorMessage("Error: Failed to fetch weather data.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Error: Failed to fetch weather data.");
      }
      console.log(error)
      setError(true);
      setLoading(false);
    }
  };

 
  const handleSearch = (e) => {
    e.preventDefault();

    if (inputText && inputText.trim() !== "") {
      setSearchPerformed(false);

      fetchData();
    }
  };
  return (
    <div className="bg_img">
      <form className="forms" onSubmit={handleSearch}>
        <input
          placeholder="Search location"
          className={`input `}
          error={error}
          value={inputText}
          onChange={(e) => {
            setInputText(e.target.value);
          }}
        />

        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      {error && <p className="error-message">{errorMessage}</p>}
      {!loading && data && searchPerformed && (
        <>
          <h1 className="city">{data?.name || "City"}</h1>
          <div className="group">
            <img
              src={`http://openweathermap.org/img/wn/${
                data?.weather[0]?.icon || "placeholder"
              }.png`}
              alt=""
            />
            <h1>{data?.weather[0]?.main || "Weather"}</h1>
          </div>
          <h1 className="temp">
            {data?.main?.temp?.toFixed() || "Temperature"} °C
          </h1>
          <div className="box_container">
            <div className="box">
              <p>Humidity</p>
              <h1>{data?.main?.humidity?.toFixed() || "Humidity"}</h1>
            </div>
            <div className="box">
              <p>Wind</p>
              <h1>{data?.wind?.speed?.toFixed() || "Wind"} km/h</h1>
            </div>
          </div>
        </>
      )}
      {loading && <Spinner />}
    </div>
  );
};
