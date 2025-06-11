import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// --- STİL BİLEŞENİ (CSS Dosyası Yerine) ---
// CSS stillerini doğrudan JavaScript içinde yönetmek için bir bileşen oluşturuyoruz.
// Bu, harici bir CSS dosyası ihtiyacını ortadan kaldırır.
const StyleInjector = () => {
  useEffect(() => {
    const css = `
      /* Genel Sayfa Stilleri ve Arka Plan */
      body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
      }

      .app-container {
          min-height: 100vh;
          background-image: linear-gradient(to bottom right, #1f2937, #111827, #3b82f6);
          color: #ffffff;
          padding: 2rem;
          box-sizing: border-box;
      }

      .content-wrapper {
          max-width: 1024px;
          margin: 0 auto;
      }

      /* Arama Çubuğu */
      .search-bar {
          display: flex;
          width: 100%;
          max-width: 600px;
          margin: 0 auto 2rem auto;
      }

      .search-input {
          width: 100%;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          color: #fff;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 0.5rem 0 0 0.5rem;
          outline: none;
          backdrop-filter: blur(10px);
          transition: all 0.3s;
      }

      .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
      }

      .search-button {
          padding: 0.75rem 1rem;
          background-color: #3b82f6;
          border: none;
          border-radius: 0 0.5rem 0.5rem 0;
          cursor: pointer;
          transition: background-color 0.3s;
      }

      .search-button:hover {
          background-color: #2563eb;
      }

      .icon-white {
          width: 1.5rem;
          height: 1.5rem;
          color: #fff;
      }

      /* Ana Kart Stilleri */
      .card {
          background-color: rgba(255, 255, 255, 0.08);
          padding: 1.5rem;
          border-radius: 1rem;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      }

      .card h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.25rem;
          font-weight: 600;
      }

      /* Anlık Hava Durumu */
      .current-weather {
          text-align: center;
      }
      .current-weather h2 {
          font-size: 2.25rem;
          font-weight: 700;
          margin: 0;
      }
      .weather-icon-large-container {
          margin: 1rem 0;
      }
      .weather-icon-large {
          width: 8rem;
          height: 8rem;
          color: #facc15; /* yellow-400 */
          display: inline-block;
      }
      .temperature {
          font-size: 4.5rem;
          font-weight: 200;
          letter-spacing: -0.05em;
          margin: 0;
      }
      .description {
          font-size: 1.25rem;
          color: #d1d5db; /* gray-300 */
          margin-top: 0.5rem;
      }

      /* Detaylar */
      .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 1rem;
      }
      .detail-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 1rem;
          border-radius: 0.5rem;
      }
      .icon-detail {
          width: 2rem;
          height: 2rem;
          color: #93c5fd; /* blue-300 */
      }
      .detail-label {
          font-size: 0.875rem;
          color: #9ca3af; /* gray-400 */
      }
      .detail-value {
          font-size: 1.125rem;
          font-weight: 700;
      }

      /* Saatlik Grafik */
      .chart-container {
          position: relative;
          height: 280px;
      }

      /* 5 Günlük Tahmin */
      .forecast-list {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
      }
      .forecast-item {
          display: grid;
          grid-template-columns: 2fr 1fr 2fr 1fr;
          align-items: center;
          gap: 1rem;
          background-color: rgba(255, 255, 255, 0.05);
          padding: 0.75rem;
          border-radius: 0.5rem;
      }
      .forecast-day {
          font-weight: 500;
      }
      .weather-icon-small {
          width: 2rem;
          height: 2rem;
          color: #facc15;
          justify-self: center;
      }
      .forecast-desc {
          font-size: 0.875rem;
          color: #d1d5db;
          text-align: center;
      }
      .forecast-temp {
          font-size: 1.125rem;
          font-weight: 700;
          text-align: right;
      }

      /* Ana Yerleşim (Layout) */
      .main-content {
          display: flex;
          flex-direction: column;
          gap: 2rem;
      }

      .weather-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 2rem;
      }

      .main-column, .side-column {
          display: flex;
          flex-direction: column;
          gap: 2rem;
      }

      /* Tablet ve Masaüstü için */
      @media (min-width: 768px) {
          .weather-layout {
              grid-template-columns: repeat(2, 1fr);
          }
      }

      /* Yüklenme ve Hata Mesajları */
      .loading-spinner {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 200px;
      }
      .spinner {
          width: 50px;
          height: 50px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
      }
      @keyframes spin {
          to { transform: rotate(360deg); }
      }

      .error-message {
          background-color: rgba(239, 68, 68, 0.3);
          color: #fca5a5;
          padding: 1rem;
          border-radius: 0.5rem;
          text-align: center;
          backdrop-filter: blur(10px);
      }
      .error-message h3 {
          margin: 0 0 0.5rem 0;
      }

      /* Footer */
      .app-footer {
          text-align: center;
          margin-top: 3rem;
          color: #6b7280;
          font-size: 0.875rem;
      }
    `;
    const styleElement = document.createElement('style');
    styleElement.innerHTML = css;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return null;
};


// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// --- İKON BİLEŞENLERİ (SVG) ---
const WeatherIcon = ({ code, className }) => {
    const Icon = {
        '01d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>,
        '01n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>,
        '02d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><line x1="2" y1="12" x2="2" y2="12"></line></svg>,
        '02n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.21 15.89A9 9 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
        '03d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>,
        '03n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.21 15.89A9 9 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
        '04d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>,
        '04n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.21 15.89A9 9 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>,
        '09d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m17 10-5 5-5-5"></path><path d="M7 10V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7"></path></svg>,
        '09n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><path d="m17 10-5 5-5-5"></path><path d="M7 10V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v7"></path></svg>,
        '10d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path><path d="M16 14v2m-8-2v2m4-2v2m-4-6.5L12 10l-4 3.5"></path></svg>,
        '10n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21.21 15.89A9 9 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path><path d="M16 14v2m-8-2v2m4-2v2m-4-6.5L12 10l-4 3.5"></path></svg>,
        '11d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16.923v-1.846a2 2 0 0 0-1-1.732l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 15.077v1.846a2 2 0 0 0 1 1.732l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.732z"></path><polyline points="12 22 12 12 21 7"></polyline><polyline points="3.27 6.96 12 12 12 22"></polyline><line x1="12" y1="12" x2="12" y2="22"></line></svg>,
        '11n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 16.923v-1.846a2 2 0 0 0-1-1.732l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 15.077v1.846a2 2 0 0 0 1 1.732l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.732z"></path><polyline points="12 22 12 12 21 7"></polyline><polyline points="3.27 6.96 12 12 12 22"></polyline><line x1="12" y1="12" x2="12" y2="22"></line></svg>,
        '13d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m20 16-4-4 4-4"></path><path d="m4 8 4 4-4 4"></path><path d="M12 4v16"></path></svg>,
        '13n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m20 16-4-4 4-4"></path><path d="m4 8 4 4-4 4"></path><path d="M12 4v16"></path></svg>,
        '50d': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12h20"></path><path d="M2 6h20"></path><path d="M2 18h20"></path></svg>,
        '50n': <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12h20"></path><path d="M2 6h20"></path><path d="M2 18h20"></path></svg>,
    };
    return Icon[code] || Icon['01d'];
};

const ThermometerIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4 4 0 1 0 5 0z"></path></svg>;
const WindIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"></path></svg>;
const DropletIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>;
const SearchIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;

// --- API Yapılandırması ---
// ❗️❗️❗️ Bu anahtarı kendi OpenWeatherMap API anahtarınızla değiştirin!
const API_KEY = "650d43f812e091139b16752768907e17";
const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

// --- Yardımcı Fonksiyonlar ---
const capitalizeFirstLetter = (string) => {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};

// --- ALT BİLEŞENLER ---
const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (city) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSearch} className="search-bar">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Şehir arayın..."
                className="search-input"
            />
            <button type="submit" className="search-button">
                <SearchIcon className="icon-white" />
            </button>
        </form>
    );
};

const CurrentWeather = ({ data }) => {
    if (!data) return null;

    return (
        <div className="card current-weather">
            <h2>{data.name}, {data.sys.country}</h2>
            <div className="weather-icon-large-container">
                <WeatherIcon code={data.weather[0].icon} className="weather-icon-large" />
            </div>
            <p className="temperature">{Math.round(data.main.temp)}&deg;C</p>
            <p className="description">{capitalizeFirstLetter(data.weather[0].description)}</p>
        </div>
    );
};

const WeatherDetails = ({ data }) => {
    if (!data) return null;

    const details = [
        { icon: <ThermometerIcon className="icon-detail" />, label: "Hissedilen", value: `${Math.round(data.main.feels_like)}°C` },
        { icon: <DropletIcon className="icon-detail" />, label: "Nem", value: `${data.main.humidity}%` },
        { icon: <WindIcon className="icon-detail" />, label: "Rüzgar", value: `${data.wind.speed.toFixed(1)} m/s` },
    ];

    return (
        <div className="card">
            <h3>Detaylar</h3>
            <div className="details-grid">
                {details.map((item, index) => (
                    <div key={index} className="detail-item">
                        {item.icon}
                        <div>
                            <p className="detail-label">{item.label}</p>
                            <p className="detail-value">{item.value}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HourlyChart = ({ data }) => {
    if (!data || !data.list) return null;
    
    const hourlyData = data.list.slice(0, 8);
    
    const chartData = {
        labels: hourlyData.map(item => new Date(item.dt * 1000).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })),
        datasets: [
            {
                label: 'Sıcaklık (°C)',
                data: hourlyData.map(item => item.main.temp),
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                tension: 0.4,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
            },
        ],
    };
    const options = { responsive: true, maintainAspectRatio: false };

    return (
         <div className="card chart-container">
            <h3>Saatlik Tahmin</h3>
            <Line options={options} data={chartData} />
        </div>
    );
};

const Forecast = ({ data }) => {
    if (!data || !data.list) return null;

    const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00"));

    return (
        <div className="card">
            <h3>5 Günlük Tahmin</h3>
            <div className="forecast-list">
                {dailyForecasts.map((day, index) => (
                    <div key={index} className="forecast-item">
                        <p className="forecast-day">{new Date(day.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'long' })}</p>
                        <WeatherIcon code={day.weather[0].icon} className="weather-icon-small" />
                        <p className="forecast-desc">{capitalizeFirstLetter(day.weather[0].description)}</p>
                        <p className="forecast-temp">{Math.round(day.main.temp)}&deg;C</p>
                    </div>
                ))}
            </div>
        </div>
    );
};


// --- ANA UYGULAMA BİLEŞENİ ---
export default function App() {
    const [city, setCity] = useState('Istanbul');
    const [currentWeather, setCurrentWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getWeatherData = useCallback(async (selectedCity) => {
        setLoading(true);
        setError(null);
        
        try {
            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                fetch(`${API_BASE_URL}/weather?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=tr`),
                fetch(`${API_BASE_URL}/forecast?q=${selectedCity}&appid=${API_KEY}&units=metric&lang=tr`)
            ]);

            if (!currentWeatherResponse.ok) throw new Error('Şehir bulunamadı. Lütfen tekrar deneyin.');
            if (!forecastResponse.ok) throw new Error('Tahmin verileri alınamadı.');

            const currentWeatherData = await currentWeatherResponse.json();
            const forecastData = await forecastResponse.json();

            setCurrentWeather(currentWeatherData);
            setForecast(forecastData);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        getWeatherData(city);
    }, [getWeatherData, city]);
    
    const handleSearch = (searchedCity) => {
        setCity(searchedCity);
    };

    return (
        <div className="app-container">
            <StyleInjector />
            <div className="content-wrapper">
                <header>
                    <SearchBar onSearch={handleSearch} />
                </header>

                <main className="main-content">
                    {loading && (
                        <div className="loading-spinner">
                            <div className="spinner"></div>
                        </div>
                    )}
                    {error && (
                        <div className="error-message">
                            <h3>Hata!</h3>
                            <p>{error}</p>
                        </div>
                    )}
                    {!loading && !error && currentWeather && (
                         <div className="weather-layout">
                            <div className="main-column">
                               <CurrentWeather data={currentWeather} />
                               <WeatherDetails data={currentWeather} />
                            </div>
                             <div className="side-column">
                                <HourlyChart data={forecast} />
                                <Forecast data={forecast} />
                            </div>
                        </div>
                    )}
                </main>
                 <footer className="app-footer">
                    <p>OpenWeatherMap API ile güçlendirilmiştir.</p>
                </footer>
            </div>
        </div>
    );
}
