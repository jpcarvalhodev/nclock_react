import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nping from "../../../assets/img/carousel/product_nping.png";
import { useColor } from "../../../context/ColorContext";

export const NpingDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Nping Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nping} alt="Nping" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NPING</h3>
                    <p className="dashboard-text-inside">
                        O Nping é um software dedicado às Redes Informáticas da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Aumentar seus lucros evitando perdas causadas por falhas de sistema não detectadas;</p>
                    <p>- Reduzir custos, adquirindo largura de banda e hardware apenas de acordo com a sua necessidade;</p>
                    <p>- Eliminar problemas de desempenho de servidor e gargalos de largura de banda;</p>
                    <p>- Melhorar a qualidade do seu serviço por ser proativo.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}