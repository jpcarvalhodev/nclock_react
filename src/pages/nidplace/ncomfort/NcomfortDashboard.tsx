import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ncomfort from "../../../assets/img/carousel/product_ncomfort.png";

export const NcomfortDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#FEC629" />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Ncomfort Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ncomfort} alt="Ncomfort" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NCOMFORT</h3>
                    <p className="dashboard-text-inside">
                        O Ncomfort é um software dedicado à Climatização AVAC da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Controlar remotamente equipamentos integrados e inteligentes;</p>
                    <p>- Usufruir de interfaces intuitivas e personalizadas;</p>
                    <p>- Visualizar a localização de todos os equipamentos de automação;</p>
                    <p>- Consultar históricos dos dispositivos;</p>
                    <p>- Identificar rapidamente anomalias através de notificações;</p>
                    <p>- Garantir um suporte especializado por parte de técnicos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#FEC629" />
        </div>
    );
}