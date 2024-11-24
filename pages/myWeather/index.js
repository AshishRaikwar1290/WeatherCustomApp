import React, { useEffect, useState } from "react";
import { getWeather, useGetWeatherQuery } from "../../redux/weatherApiSlice";
import TemperatureConverter from "../../components/temperatureConverter";
import styles from "../../styles/myWeather.module.scss";
import { wrapper } from "../../redux/store";
import { weatherApiSlice } from "../../redux/weatherApiSlice";
import dynamic from "next/dynamic";
const CurrentForeCastDetails = dynamic(() =>
  import("../../components/currentForeCastDetails")
);
const CurrentTempDetails = dynamic(() =>
  import("../../components/currentTempDetails")
);

function MyWeather() {
  const [city, setCity] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherMainData, setWeatherMainData] = useState(null);
  const [errorObj, setErrorObj] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState("");
  const [searchReportType, setSearchedReportType] = useState("current");

  const {
    data: weatherData,
    error: weatherDataError,
    isFetching: weatherDataIsFetching,
  } = useGetWeatherQuery(
    { city: searchCity, reportType: searchReportType },
    {
      skip: !searchCity && !searchReportType,
    }
  );

  // Fetch user's current location
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const locationData = await response.json();
            if (locationData.city) {
              setSearchCity(locationData.city);
            } else {
              console.error("Could not determine city from location.");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    fetchUserLocation();
  }, []);

  const handleSearch = () => {
    if (city.trim() && selectedReportType.trim()) {
      setSearchCity(city);
      setSearchedReportType(selectedReportType);
    }
  };

  const handleChange = (e) => {
    setSelectedReportType(e?.target?.value);
  };

  useEffect(() => {
    if (weatherDataError) {
      setErrorObj(weatherDataError);
    }
  }, [weatherDataError]);

  useEffect(() => {
    if (weatherData) {
      setWeatherMainData(weatherData);
    }
  }, [weatherData]);

  const getWeatherComp = ({ weatherMainData }) => {
    if (searchReportType === "current") {
      return <CurrentTempDetails weatherMainData={weatherMainData} />;
    } else {
      return <CurrentForeCastDetails weatherMainData={weatherMainData} />;
    }
  };

  return (
    <div className={styles.my_weather_container}>
      <div className={styles.my_weather_inner_container}>
        <h1 className={styles.my_weather_heading}>
          Find weather according to city
        </h1>
        <div className={styles.search_plus_result_container}>
          <div className={styles.my_form}>
            <div className={styles.search_info}>
              <h3>City Name</h3>
              <input
                type="text"
                value={city}
                placeholder="Enter city name"
                onChange={(e) => setCity(e.target.value)} // Update input value
                style={{ padding: "8px", width: "200px" }}
              />
              <h3>Report Type</h3>
              <select
                id="report"
                value={selectedReportType}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Select report type
                </option>
                <option value="current">Current</option>
                <option value="forecast">ForeCast</option>
              </select>
              <div className={styles.search_container}>
                <button onClick={handleSearch}>Search</button>
              </div>
            </div>
            <div>
              <TemperatureConverter />
            </div>
          </div>
          <div className={styles.results_container}>
            {weatherDataIsFetching && !errorObj && <p>Loading...</p>}

            {!weatherDataIsFetching && errorObj && (
              <p>
                {errorObj?.data?.error?.message ||
                  "Error fetching weather data. Try another city."}
              </p>
            )}

            {!weatherDataIsFetching &&
              !errorObj &&
              weatherMainData &&
              getWeatherComp({ weatherMainData })}

            {!weatherDataIsFetching && !weatherMainData && !errorObj && (
              <p>Please fill the details to get results</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    try {
      store.dispatch(
        getWeather.initiate({ city: "New York", reportType: "current" })
      );

      await Promise.all(
        store.dispatch(weatherApiSlice.util.getRunningQueriesThunk())
      );

      return { props: {} };
    } catch (error) {
      console.error("Error during data fetching:", error);
      return { props: {} };
    }
  }
);

export default MyWeather;
