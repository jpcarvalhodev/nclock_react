import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nlight from "../../../assets/img/carousel/product_nlight.png";
import { useColor } from "../../../context/ColorContext";

export const NlightDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Nlight Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nlight} alt="Nlight" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NLIGHT</h3>
                    <p className="dashboard-text-inside">
                        O Nlight é um software dedicado ao Controlo de Iluminação da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Controlar remotamente equipamentos integrados e inteligentes;</p>
                    <p>- Usufruir de interfaces intuitivas e personalizadas;</p>
                    <p>- Automatizar ações e relatórios de rotina;</p>
                    <p>- Consultar históricos dos dispositivos;</p>
                    <p>- Identificar rapidamente anomalias através de notificações.</p>
                    <p>- Definir a luz certa e maximizar as suas poupanças.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}