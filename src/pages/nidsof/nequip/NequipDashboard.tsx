import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nequip from "../../../assets/img/carousel/product_nequip.webp";
import { useColor } from "../../../context/ColorContext";

export const NequipDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Nequip Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nequip} alt="Nequip" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Nequip</h3>
                    <p className="dashboard-text-inside">
                        O Nequip é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Gestão de Equipamentos. Ele permite-lhe:
                    </p>
                    <p>- Gerir os equipamentos, materiais, veículos e restantes recursos;</p>
                    <p>- Garantir maior rapidez na visualização dos recursos com alocação planeada e com execução;</p>
                    <p>- Manter o rigor e controlo na faturação de serviços a clientes relacionados com a distribuição dos recursos;</p>
                    <p>- Gerir de forma eficiente os recursos disponíveis;</p>
                    <p>- Controlar os recursos em trânsito e emissão dos respetivos documentos legais.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}