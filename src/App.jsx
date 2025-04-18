import { useState } from 'react'
import Weatherinfo from './Components/Weatherinfo';
import Error from './Components/Error';
import Shimmer from './Components/Shimmer';
import BgImage from './assets/BgImage.jpg';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [value, setValue] = useState(null);
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getWeather() {
    const API_KEY = import.meta.env.VITE_API_KEY
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    

    setLoading(true); // start shimmer

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        if (response.status === 404) {
          setCityNotFound(true);
        } else {
          console.log(`Error: ${response.status}`);
        }
        return;
      }

      const json = await response.json();
      setValue(json);
      setCityNotFound(false);
    } catch (error) {
      console.log("Fetch error:", error);
    } finally {
      setLoading(false); // stop shimmer
    }
  }


  function handleChange(event) {
    setCity(event.target.value);
  }

  function handleClick() {
    setValue(null);
    getWeather();
  }

  return (
    <div
      className="background"
      style={{
        backgroundImage: `url(${BgImage})`,
      }}
    >
      <div className='box'>
        <h1 className='h1title'>Weather App</h1>
        <input
          type='text'
          value={city}
          placeholder='Enter your city'
          onChange={handleChange} className='textlayout'
        />
        <button onClick={handleClick}>Get Weather</button>


         {loading && <Shimmer />}
        {!loading && value && <Weatherinfo data={value} />}
        {!loading && cityNotFound && <Error />}
      </div>
    </div>
  );
}

export default App;
