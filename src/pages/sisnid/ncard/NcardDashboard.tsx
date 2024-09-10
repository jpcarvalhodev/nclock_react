import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ncard from "../../../assets/img/carousel/product_ncard.webp";

export const NcardDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#0050a0" />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Ncard Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ncard} alt="Ncard" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Ncard</h3>
                    <p className="dashboard-text-inside">
                        O Ncard é um software de pontos que auxilia na gestão eficaz da sua carteira de clientes. Ele permite-lhe:
                    </p>
                    <p>- Gerir a carteira de clientes;</p>
                    <p>- Registar e organizar dados;</p>
                    <p>- Integrar sistema de pontos e descontos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#0050a0" />
        </div>
    );
}