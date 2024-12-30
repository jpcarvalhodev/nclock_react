import { Spinner } from 'react-bootstrap';

import '../css/CustomSpinner.css';
import nidgroup from '../assets/img/spinner/nidgroup.png';

import { useEffect } from 'react';

export const CustomSpinner = () => {

    // Faz o preload da imagem
    useEffect(() => {
        const img = new Image();
        img.src = nidgroup;
    }, []);

    return (
        <div className="spinner-container">
            <Spinner animation="border" role="status" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <img src={nidgroup} alt="Loading" className="spinner-image" />
        </div>
    );
};