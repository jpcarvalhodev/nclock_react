import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ndecor from "../../../assets/img/carousel/product_ndecor.png";
import { useColor } from "../../../context/ColorContext";

export const NdecorDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Ndecor Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ndecor} alt="Ndecor" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NDECOR</h3>
                    <p className="dashboard-text-inside">
                        O Ndecor é um software dedicado à Decoração de Interiores. Ele permite-lhe:
                    </p>
                    <p>- Manipular visualmente conteúdos multimédia;</p>
                    <p>- Manipular com realidade virtual;</p>
                    <p>- Projetar imagens 3D mais detalhadas;</p>
                    <p>- Criar uma biblioteca virtual com o próprio estúdio.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}