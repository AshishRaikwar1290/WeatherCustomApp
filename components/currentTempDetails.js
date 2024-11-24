import React from "react";

function CurrentTempDetails({weatherMainData}) {
  return (
    <div>
      <h2>Weather in {weatherMainData?.location?.name}</h2>
      <p>Temperature: {weatherMainData?.current?.temperature}°C</p>
      <p>Condition: {weatherMainData?.current?.weather_descriptions?.[0]}</p>
      <p>Humidity: {weatherMainData?.current?.humidity}</p>
      <p>Visibility: {weatherMainData?.current?.visibility}</p>
      <p>Wind Speed: {weatherMainData?.current?.wind_speed}</p>
      <p>Feels Like: {weatherMainData?.current?.feelslike}</p>
      <p>UV index: {weatherMainData?.current?.uv_index}</p>
    </div>
  );
}

export default CurrentTempDetails;
