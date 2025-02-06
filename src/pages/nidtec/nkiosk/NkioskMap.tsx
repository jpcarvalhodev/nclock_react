import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import marker from '../../../assets/img/map/marker.png';
import { Footer } from "../../../components/Footer";
import { MapCenterButton } from '../../../components/MapCenterButton';
import { NavBar } from "../../../components/NavBar";


import { useEffect } from 'react';
import '../../../css/PagesStyles.css';

// Icone personalizado para o marcador
const customIcon = new L.Icon({
    iconUrl: marker,
    iconSize: [40, 40],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
});

// Função para inicializar o mapa
const MapInitialization = ({ position }: { position: [number, number] }) => {
    const map = useMap();
  
    useEffect(() => {
      map.invalidateSize();
    }, [map]);
  
    return null;
  };

export const NkioskMap = () => {
    
    const position: [number, number] = [41.145882, -8.614464];

    return (
        <div className="main-container">
            
            <div className='map-container'>
                <div className="datatable-title-text">
                    <span >Mapa do Quiosque</span>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{ minHeight: '60vh', flex: 1 }}>
                <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ minWidth: '80vw' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            R. de São Filipe de Nery 60, 4050-290 Porto <br /> Local do Quiosque
                        </Popup>
                    </Marker>
                    <MapInitialization position={position} />
                    <MapCenterButton position={position} />
                </MapContainer>
            </div>
            
        </div >
    );
};