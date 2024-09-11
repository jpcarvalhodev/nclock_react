import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nserver from "../../../assets/img/carousel/product_nserver.webp";

export const NserverDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#D01313" />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Nserver Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nserver} alt="Nserver" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Nserver</h3>
                    <p className="dashboard-text-inside">
                        O Nserver é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Integração Webservers. Ele permite-lhe:
                    </p>
                    <p>- Aumento da eficiência da sua equipa comercial;</p>
                    <p>- Melhora na experiência dos utilizadores;</p>
                    <p>- Aumento das taxas de conversão;</p>
                    <p>- Automatização de tarefas administrativas;</p>
                    <p>- Monotorização de dados.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#D01313" />
        </div>
    );
}