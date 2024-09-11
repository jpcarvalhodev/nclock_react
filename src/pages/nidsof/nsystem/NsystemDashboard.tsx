import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nsystem from "../../../assets/img/carousel/product_nsystem.webp";

export const NsystemDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#D01313" />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Nsystem Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nsystem} alt="Nsystem" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Nsystem</h3>
                    <p className="dashboard-text-inside">
                        O Nsystem é um software pensado para as diferentes necessidades tecnológicos das empresas, na esfera do desenvolvimento de software. Ele permite-lhe:
                    </p>
                    <p>- Gerir informações relvantes à empresa;</p>
                    <p>- Integrar sistemas de informação e a estrutura da empresa;</p>
                    <p>- Permitir o fluxo independente de processamento de dados;</p>
                    <p>- Integrar ferramentas de controlo interno;</p>
                    <p>- Garantir os objetivos da empresa serão atingidos de maneira objetiva, eficiente e direta.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#D01313" />
        </div>
    );
}