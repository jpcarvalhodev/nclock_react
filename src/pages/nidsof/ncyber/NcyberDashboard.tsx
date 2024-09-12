import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ncyber from "../../../assets/img/carousel/product_ncyber.webp";
import { useColor } from "../../../context/ColorContext";

export const NcyberDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Ncyber Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ncyber} alt="Ncyber" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Ncyber</h3>
                    <p className="dashboard-text-inside">
                        O Ncyber é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Segurança Cibernética. Ele permite-lhe:
                    </p>
                    <p>- Proteger contra ameças cibernéticas;</p>
                    <p>- Proteger de dados e redes;</p>
                    <p>- Bloquear acessos a utilizadores não autorizados;</p>
                    <p>- Melhorar o tempo de recuperação após alguma ameça ou violação;</p>
                    <p>- Proteger os utilizadores finais;</p>
                    <p>- Aumentar o grau de confiança no produto para os clientes.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}