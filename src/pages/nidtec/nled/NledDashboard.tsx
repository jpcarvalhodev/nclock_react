import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nled from "../../../assets/img/carousel/product_nled.webp";
import { useColor } from "../../../context/ColorContext";

export const NledDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nled Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nled} alt="Nled" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE PAINÉIS DIGITAIS- NLED</h3>
                    <p className="dashboard-text-inside">
                        O Nled é um software dedicado Painéis LED da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Versatilizar a informação e venda;</p>
                    <p>- Aumentar o grau de atração e memorabilidade da peça publicitária;</p>
                    <p>- Reduzir os tempos de perceção dos consumidores;</p>
                    <p>- Aprimorar a imagem e a marca;</p>
                    <p>- Garantir poupança face ao métodos de Marketing tradicional.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}