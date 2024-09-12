import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nconnect from "../../../assets/img/carousel/product_nconnect.png";
import { useColor } from "../../../context/ColorContext";

export const NconnectDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Nconnect Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nconnect} alt="Nconnect" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NCONNECT</h3>
                    <p className="dashboard-text-inside">
                        O Nconnect é um software dedicado aos Sistemas de Eletricidade da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Controlar remotamente equipamentos integrados e inteligentes;</p>
                    <p>- Usufruir de interfaces intuitivas e personalizadas;</p>
                    <p>- Visualizar a localização de todos os equipamentos de automação;</p>
                    <p>- Consultar históricos dos dispositivos;</p>
                    <p>- Identificar rapidamente anomalias através de notificações;</p>
                    <p>- Tornar o seu espaço inteligente, no aspeto elétrico.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}