import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import { Carousel } from "react-responsive-carousel";
import product_nvisitor from "../../../assets/img/carousel/product_nvisitor.webp";
import { useColor } from "../../../context/ColorContext";

export const NvisitorDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nvisitor Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nvisitor} alt="Nvisitor"/>
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Nvisitor</h3>
                    <p className="dashboard-text-inside">
                        O Nvisitor é um software que permite uma melhor gestão de todos os locais da empresa através de controlo de acessos. Além do mais, permite-lhe:
                    </p>
                    <p>- Gerir, de forma otimizada, as visitas de fornecedores ou outras pessoas externas;</p>
                    <p>- Criar sistemas automatizados;</p>
                    <p>- Integrar com outros softwares.</p>
                    <p>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}