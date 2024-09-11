import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_npartition from "../../../assets/img/carousel/product_npartition.png";

export const NpartitionDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#FEC629" />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Npartition Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_npartition} alt="Npartition" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NPARTITION</h3>
                    <p className="dashboard-text-inside">
                        O Npartition é um software dedicado às Divisórias e Ambientes da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Conectar a aparelhos elétricos;</p>
                    <p>- Controlar remotamente equipamentos integrados e inteligentes;</p>
                    <p>- Usufruir de interfaces intuitivas e personalizadas;</p>
                    <p>- Identificar rapidamente anomalias através de notificações.</p>
                    <p>- Garantir um suporte especializado por parte de técnicos.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#FEC629" />
        </div>
    );
}