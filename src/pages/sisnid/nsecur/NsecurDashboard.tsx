import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nsecur from "../../../assets/img/carousel/product_nsecur.webp";

export const NsecurDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#0050a0" />
            <div className="dashboard-title-text" style={{ color: '#0050a0' }}>
                <span>Nsecur Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nsecur} alt="Nsecur" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software SISNID Nsecur</h3>
                    <p className="dashboard-text-inside">
                        O Nsecur é um software dedicado a centrais de segurança, desenvolvido para responder às grandes necessidades de segurança. Ele permite-lhe:
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