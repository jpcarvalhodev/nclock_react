import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nfurniture from "../../../assets/img/carousel/product_nfurniture.png";
import { useColor } from "../../../context/ColorContext";

export const NfurnitureDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Nfurniture Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nfurniture} alt="Nfurniture" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NFURNITURE</h3>
                    <p className="dashboard-text-inside">
                        O Nfurniture é um software dedicado ao Mobiliário de Escritório da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Projetar equipamentos e peças de escritório;</p>
                    <p>- Visualizar mobiliário antes da sua execução;</p>
                    <p>- Controlar remotamente equipamentos elétricos;</p>
                    <p>- Conectar e interligar equipamentos;</p>
                    <p>- Modernizar o seu espaço de trabalho;</p>
                    <p>- Proporcionar um local tecnológico aos seus colaboradores.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}