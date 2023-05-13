import axios from 'axios';
import { useEffect, useState } from 'react';
import { Spinner } from '../spinner/Spinner';

export const Weather = () =>  {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
          params: {
            q: inputText,
            appid: '189271b827844bff7388350c44848615',
            units: 'metric'
          }
        });
        if (response.status === 200) {
          setError(false);
          setData(response.data);
        } else {
          throw new Error('Something went wrong');
        }
      } catch (error) {
        setError(true);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputText]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setInputText(e.target.value);
    }
  };

  return (
    <div className="bg_img">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <input
            variant="filled"
            placeholder="Search location"
            className="input"
            error={error}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleSearch}
          />
          {data && (
            <>
              <h1 className="city">{data.name}</h1>
              <div className="group">
                <img
                  src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                  alt=""
                />
                <h1>{data.weather[0].main}</h1>
              </div>

              <h1 className="temp">{data.main.temp.toFixed()} °C</h1>

              <div className="box_container">
                <div className="box">
                  <p>Humidity</p>
                  <h1>{data.main.humidity.toFixed()}%</h1>
                </div>

                <div className="box">
                  <p>Wind</p>
                  <h1>{data.wind.speed.toFixed()} km/h</h1>
                </div>

                <div className="box">
                  <p>Feels Like</p>
                  <h1>{data.main.feels_like.toFixed()} °C</h1>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};


