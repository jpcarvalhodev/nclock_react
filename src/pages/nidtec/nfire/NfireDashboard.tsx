import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nfire from "../../../assets/img/carousel/product_nfire.webp";

export const NfireDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#009739" />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nfire Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nfire} alt="Nfire" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE EXTINÇÃO DE INCÊNDIOS- NFIRE</h3>
                    <p className="dashboard-text-inside">
                        O Nfire é um software dedicado à Extinção de Incêndio da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Extinguir o incêncio, em caso de combustão;</p>
                    <p>- Diminui o perigo;</p>
                    <p>- Aumentar a segurança no local de trabalho;</p>
                    <p>- Seguir as normas e leis do país.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#009739" />
        </div>
    );
}