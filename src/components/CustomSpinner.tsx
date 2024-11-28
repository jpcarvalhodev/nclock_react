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
            <Spinner animation="border" role="status" className="custom-spinner">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <img src={nidgroup} alt="Loading" className="spinner-image" />
        </div>
    );
};