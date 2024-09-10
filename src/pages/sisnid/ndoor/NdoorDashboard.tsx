import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ndoor from "../../../assets/img/carousel/product_ndoor.webp";

export const NdoorDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#0050a0" />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Ndoor Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ndoor} alt="Ndoor" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Ndoor</h3>
                    <p className="dashboard-text-inside">
                        O Ndoor é um software de controlo de assiduidade, desenvolvido para responder às grandes necessidades da esfera de recursos humanos de uma entidade corporativa. Ele permite-lhe:
                    </p>
                    <p>- Gerir, de forma otimizada, os acessos através de portas , grades e abrigos;</p>
                    <p>- Manusear facil e intuitivamente a interface;</p>
                    <p>- Formar uma mais valia na gestão de acessos do seu negócio ou espaço.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#0050a0" />
        </div>
    );
}