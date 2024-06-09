import { useEffect, useState } from 'react';
import { BiMoon, BiSun } from 'react-icons/bi';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TempandDetails from './components/TempandDetails';
import getFormattedWeatherData from './services/weatherService';

const App = () => {
  const [query, setQuery] = useState({ q: "Mumbai" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const getWeather = async () => {
    await getFormattedWeatherData({ ...query, units }).then((data) => {
      setWeather(data);
    });
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-900 to-gray-500';
    const threshold = units === 'metric' ? 20 : 60;
    if (weather.temp <= threshold) return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-900 to-gray-500';
    return darkMode ? 'bg-gray-800' : 'bg-gradient-to-br from-blue-900 to-gray-500 ';
  };

  return (
    <div className={`mx-auto max-w-screen-lg mt-4 py-5 px-32 ${formatBackground()} text-white transition duration-500`}>
      <div className="flex justify-end mb-4">
        <button className="mr-2" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <BiSun /> : <BiMoon />}
        </button>
      </div>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TempandDetails weather={weather} units={units} />
        </>
      )}
    </div>
  );
}

export default App;
