import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nview from "../../../assets/img/carousel/product_nview.webp";

export const NviewDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#0050a0" />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nview Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nview} alt="Nview" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Nview</h3>
                    <p className="dashboard-text-inside">
                        O Nview é um software pensado para as diferentes necessidades de segurança das empresas, na esfera da vigilância. Ele permite-lhe:
                    </p>
                    <p>- Dissuadir furtos e outras ocorrências;</p>
                    <p>- Integrar com outras marcas;</p>
                    <p>- Garantir segurança total e a toda a hora.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#0050a0" />
        </div>
    );
}