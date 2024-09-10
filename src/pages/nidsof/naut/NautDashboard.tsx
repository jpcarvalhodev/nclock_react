import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_naut from "../../../assets/img/carousel/product_naut.webp";

export const NautDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#D01313" />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Naut Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_naut} alt="Naut" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Naut</h3>
                    <p className="dashboard-text-inside">
                        O Naut é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Hiper Automação. Ele permite-lhe:
                    </p>
                    <p>- Permitir a integração de tecnologias disruptivas;</p>
                    <p>- Melhorar a satisfação dos funcionários;</p>
                    <p>- Permitir a transformação digitalmente as organizações;</p>
                    <p>- Reduzir os custos operacionais das organizações;</p>
                    <p>- Permitir, a partir da tecnologia Big Data e a IA, extrair informações empresariais dos dados e tomar decisões de uma forma mais eficaz.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#D01313" />
        </div>
    );
}