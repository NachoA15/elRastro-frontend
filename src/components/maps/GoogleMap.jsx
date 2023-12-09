import React from "react";
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';
import { useMemo } from "react";
import '../../assets/css/map.css'

export default function GMap({ lat, long }) {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: 'AIzaSyCOT8uVlUdJC-W_c4JyNLObQNVycB2E5nY' })

    if (!isLoaded) return <div>Loading...</div>

    return <Map lat={lat} long={long}/>
}

function Map({lat, long}) {
    const center = useMemo(() => ({lat: lat, lng: long}), [])
    return (
        <GoogleMap zoom={10} center={center} mapContainerClassName="map-container">
            <MarkerF position={center}/>
        </GoogleMap>
    )
}