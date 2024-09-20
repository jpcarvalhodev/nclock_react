import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { NavBar } from "../../../components/NavBar";
import { Footer } from "../../../components/Footer";
import { useColor } from "../../../context/ColorContext";
import marker from '../../../assets/img/map/marker.png';
import { MapCenterButton } from '../../../components/MapCenterButton';
import { useEffect } from 'react';

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
    const { navbarColor, footerColor } = useColor();
    const position: [number, number] = [41.145882, -8.614464];

    return (
        <div className="map-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className='filter-refresh-add-edit-upper-class'>
                <div className="datatable-title-text">
                    <span style={{ color: '#009739' }}>Mapa do Quiosque</span>
                </div>
            </div>
            <div className='d-flex justify-content-center' style={{ height: "90vh" }}>
                <MapContainer center={position} zoom={15} scrollWheelZoom={true} style={{ height: "80vh", width: "90vw", marginTop: "50px" }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Marker position={position} icon={customIcon}>
                        <Popup>
                            R. de São Filipe de Nery 60, 4050-290 Porto <br /> Localização do Quiosque
                        </Popup>
                    </Marker>
                    <MapInitialization position={position} />
                    <MapCenterButton position={position} />
                </MapContainer>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div >
    );
};