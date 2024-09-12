import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nsoftware from "../../../assets/img/carousel/product_nsoftware.webp";
import { useColor } from "../../../context/ColorContext";

export const NsoftwareDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Nsoftware Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nsoftware} alt="Nsoftware" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Nsoftware</h3>
                    <p className="dashboard-text-inside">
                        O Nsoftware é um software pensado para as diferentes necessidades de segurança das empresas, na esfera do desenvolvimento de software. Ele permite-lhe:
                    </p>
                    <p>- Possibilitar novos serviços;</p>
                    <p>- Criar uma experiência único ao cliente;</p>
                    <p>- Aumentar a produtividade e otimização de processos;</p>
                    <p>- Automatizar processos e sistemas de dados.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}