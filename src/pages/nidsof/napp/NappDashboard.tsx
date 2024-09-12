import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_napp from "../../../assets/img/carousel/product_napp.webp";
import { useColor } from "../../../context/ColorContext";

export const NappDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Napp Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_napp} alt="Napp" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Napp</h3>
                    <p className="dashboard-text-inside">
                        O Napp é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera das Aplicações Móveis. Ele permite-lhe:
                    </p>
                    <p>- Facilitar o acesso por outros dispositivos;</p>
                    <p>- Aumentar a credibilidade;</p>
                    <p>- Garantir maior produtividade;</p>
                    <p>- Aumentar a notoriedade;</p>
                    <p>- Aumentar o reconhecimento da marca.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}