import React from "react";
import { GoogleMap, MarkerF, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useMemo } from "react";
import '../../assets/css/map.css'

export default function GMap({ locations }) {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCOT8uVlUdJC-W_c4JyNLObQNVycB2E5nY' })
    console.log(locations.length)
    if (!isLoaded) return <div>Loading...</div>

    return (
      <>
          {locations[0].length === undefined ? 
              <Map locations={locations} />
          :
              <Map locations={locations[0]} />
          }
      </>
  );
}

function Map({ locations }) {
    const center = useMemo(() => {
      // Calcula el centro en base a las ubicaciones
      if (locations.length === 0) {
        return { lat: 0, lng: 0 }; // Valor por defecto si no hay ubicaciones
      }
  
      // Calcula el centro promedio de todas las ubicaciones
      console.log(locations[0])
      if(locations === 1){
        locations = locations[0]
      }
      console.log(locations)
      const sumLat = locations.reduce((acc, location) => acc + Number(location.lat), 0);
      const sumLng = locations.reduce((acc, location) => acc + Number(location.long), 0);
      console.log(sumLat)
      return {
        lat: Number(sumLat) / locations.length,
        lng: Number(sumLng) / locations.length
      };
    }, [locations]);

    console.log(center)

  
    return (
      <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
        {locations.map((location, index) => (
          <MarkerF
            position={{ lat: Number(location.lat) + index*0.0001, lng: Number(location.long) + index*0.0001 }}
            label={{
              text: location.title,
              className: "marker-label"
            }}
          />
        ))}
      </GoogleMap>
    );
}