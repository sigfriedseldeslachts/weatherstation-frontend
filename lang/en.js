export default {
  "quickstats": "Currently",
  "lastHour": "Last hour",
  "lastHourDescription": "The graph below shows the past hour. The values are the average over 1 minute.",
  "moreInfo": "More info",
  "lastUpdate": "Last updated at",
  "sensorOverload": {
    "title": "One or more sensors are overloaded.",
    "description": "All sensors have a maximum value, which can be exceeded in some circumstances. The illuminance value can easily be exceeded if it is in direct sunlight.",
    "badge": "Overloaded",
  },
  "noDataAlertTitle": "No data is available, the weather station may not be available or an error has occurred.",
  "sensors": {
    "temperature": {
      "name": "Temperature",
    },
    "windspeed": {
      "name": "Windspeed",
    },
    "illuminance": {
      "name": "Illuminance",
      "description": "Illuminance is the incident luminous flux per unit area. The value is expressed in lux.",
      "table": {
        "direct_sunlight": "Direct sunlight",
        "ambient_daylight": "Ambient daylight",
        "overcast_daylight": "Cloudy daylight",
        "sunset_sunrise": "Sunrise / sunset",
        "moonlight": "Moonlight (full moon)",
        "night": "Night",
      }
    },
    "humidity": {
      "name": "Relative humidity",
    },
    "pm25": {
      "name": "Particulate Matter (PM2.5)",
    },
    "pm10": {
      "name": "Particulate Matter (PM10)",
    },
    "pm": {
      "name": "Particulate Matter (PM)",
      "description": "The particulate matter values are expressed in μg/m³, which are very small particles (<=10 micrometer) that hang in the air. These particles are harmful and can cause serious health risks.",
      "25_vs_10": {
        "title": "PM2.5 vs PM10",
        "description": "This weather station measures both PM2.5 and PM10. But what is the difference now? With PM10 we measure all particles that are smaller than 10 micrometer, with PM2.5 we measure all particles that are smaller than 2.5 micrometer.",
      },
      "meanings": {
        "good": "Good",
        "fair": "Fair",
        "moderate": "Moderate",
        "poor": "Poor",
        "very_poor": "Very poor",
      }
    },
    "pressure": {
      "name": "Pressure",
    }
  },

  "time": "Time",
  "rotatePhone": {
    "title": "Your device is too small to display a graph.",
    "description": "If you are using a smartphone or tablet, try turning it to portrait mode.",
  },
  "tabs": {
    "select": "Select a tab",
    "label": "Tabs",
  },
  "charts": {
    "hour": "Last hour",
    "day": "Today",
    "week": "Current week",
    "month": "Current month",
    "year": "Current year",
    "title": "Historical graphs",
    "description": "Below you can see the historical data for a certain period. The values show an average over a certain period (1 hour for day, 1 day for week, 1 day for month, 1 month for year)."
  },
  "createdBy": "Created by",
}
