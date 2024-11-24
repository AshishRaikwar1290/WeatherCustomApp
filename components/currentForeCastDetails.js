import React from 'react'
import { foreCastData } from './constants';
import styles from "../styles/forecast.module.scss"

function CurrentForeCastDetails({weatherMainData}) {
  console.log(weatherMainData)
  const forecastEntries = Object.entries(foreCastData?.forecast);
 
  return (
    <div className={styles.forecast_container}>
      {forecastEntries.slice(0, 5).map(([date, details], index) => (
        <div
          key={index}
          className={styles.card}
        >
          <h3 className={styles.heading} >
            {date}
          </h3>
          <p className={styles.details}>
            <strong>Min Temp:</strong> {details?.mintemp}°C
          </p>
          <p className={styles.details}>
            <strong>Max Temp:</strong> {details?.maxtemp}°C
          </p>
          <p className={styles.details}>
            <strong>Condition:</strong> {details?.hourly[0].weather_descriptions?.[0]}
          </p>
        </div>
      ))}
    </div>
  )
}

export default CurrentForeCastDetails