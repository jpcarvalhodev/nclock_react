import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_npark from "../../../assets/img/carousel/product_npark.webp";
import { useColor } from "../../../context/ColorContext";

export const NparkDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nview Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_npark} alt="Npark" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Npark</h3>
                    <p className="dashboard-text-inside">
                        O Npark é um software que possibilita um melhor controlo e gestão do seu parque de estacionamento. Ele permite-lhe:
                    </p>
                    <p>- Gerir, fácil e praticamente, o parque;</p>
                    <p>- Garantir o controlo de acessos;</p>
                    <p>- Diminuir ocorrências e estacionamentos indevidos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}