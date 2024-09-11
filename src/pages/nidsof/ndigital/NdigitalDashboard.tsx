import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ndigital from "../../../assets/img/carousel/product_ndigital.webp";

export const NdigitalDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#D01313" />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Ndigital Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ndigital} alt="Ndigital" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Ndigital</h3>
                    <p className="dashboard-text-inside">
                        O Ndigital é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Transformação Digital. Ele permite-lhe:
                    </p>
                    <p>- Aumentar a eficiência;</p>
                    <p>- Garantir maior satisfação dos clientes;</p>
                    <p>- Controlar a gestão de modo aplicado;</p>
                    <p>- Manter uma vantagem competitiva;</p>
                    <p>- Simplificar os processos;</p>
                    <p>- Reduzir os custos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#D01313" />
        </div>
    );
}