import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nreality from "../../../assets/img/carousel/product_nreality.webp";
import { useColor } from "../../../context/ColorContext";

export const NrealityDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nreality Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nreality} alt="Nreality" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE REALIDADE VIRTUAL- NREALITY</h3>
                    <p className="dashboard-text-inside">
                        O Nreality é um software dedicado à Realidade Virtual (RV) da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Criar uma vantagem competitiva, face aos seus concorrentes, pois inclui o seu cliente no projeto;</p>
                    <p>- Acompanhar a evolução do setor de atuação;</p>
                    <p>- Manter um investimento inicial reduzido;</p>
                    <p>- Reduzir o (re)trabalho, ao permitir uma pré-visualização;</p>
                    <p>- Simular cenários reais controlados.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}