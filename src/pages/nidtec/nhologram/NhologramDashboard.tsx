import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nhologram from "../../../assets/img/carousel/product_nhologram.webp";
import { useColor } from "../../../context/ColorContext";

export const NhologramDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nhologram Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nhologram} alt="Nhologram" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE PROJETORES HOLOGRAMA- NHOLOGRAM</h3>
                    <p className="dashboard-text-inside">
                        O Nhologram é um software dedicado à Projeção de Hologramas. Ele permite-lhe efetuar:
                    </p>
                    <p>- Manipulação visual de conteúdos multimédia;</p>
                    <p>- Projeção de imagens 3D mais detalhadas;</p>
                    <p>- Leitura e reprodução de quase todo o tipo de ficheiros multimédia;</p>
                    <p>- Ligação com o wi-fi e/ou bluetooth;</p>
                    <p>- Flexibilidade no suporte de vários sistemas operativos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}