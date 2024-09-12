import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ncharge from "../../../assets/img/carousel/product_ncharge.webp";
import { useColor } from "../../../context/ColorContext";

export const NchargeDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Ncharge Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ncharge} alt="Ncharge" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE VEÍCULOS ELÉTRICOS- NCHARGE</h3>
                    <p className="dashboard-text-inside">
                        O Ncharge é um software dedicado aos Postos de Carregamento elétrico da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Poupar, em termos de combustível e manutenção;</p>
                    <p>- Contribuir para a sustentabilidade (emissões de CO2 e poluíção);</p>
                    <p>- Reforçar a imagem de inovação;</p>
                    <p>- Receber incentivos fiscais e isenção de tributações;</p>
                    <p>- Receber a dedução do IVA.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}