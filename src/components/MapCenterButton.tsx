import { useMap } from 'react-leaflet';

import center from '../assets/img/map/center.png';
import '../css/PagesStyles.css';

export const MapCenterButton = ({ position }: { position: [number, number] }) => {
    const map = useMap();

    const centerMap = () => {
        map.flyTo(position, map.getZoom());
    };

    return (
        <button onClick={centerMap} className='center-map-button'>
            <img src={center} alt="botão centralizar" />
        </button>
    );
};
