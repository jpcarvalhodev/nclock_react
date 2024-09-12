import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_npatrol from "../../../assets/img/carousel/product_npatrol.webp";
import { Carousel } from "react-responsive-carousel";
import { useColor } from "../../../context/ColorContext";

export const NpatrolDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Npatrol Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_npatrol} alt="Npatrol" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Npatrol</h3>
                    <p className="dashboard-text-inside">
                        O Npatrol é um software de controlo e  fiscalização dos trabalhos executados no interior e exterior das instalações corporativas. Ele permite-lhe:
                    </p>
                    <p>- Monitorizar eficientemente as rondas;</p>
                    <p>- Manusear facil e intuitivamente a interface;</p>
                    <p>- Formar uma mais valia na segurança e controlo de rondas do seu negócio ou espaço.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}