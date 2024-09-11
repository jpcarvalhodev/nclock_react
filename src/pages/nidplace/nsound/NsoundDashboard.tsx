import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nsound from "../../../assets/img/carousel/product_nsound.png";

export const NsoundDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#FEC629" />
            <div className="dashboard-title-text" style={{ color: '#FEC629' }}>
                <span>Nsound Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nsound} alt="Nsound" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE NSOUND</h3>
                    <p className="dashboard-text-inside">
                        O Nsound é um software dedicado a Som e Áudio  da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Visualizar a localização de todos os altifalantes ou colunas num mapa;</p>
                    <p>- Consultar histórico dos dispositivos;</p>
                    <p>- Identificar rapidamente anomalias através de notificações;</p>
                    <p>- Integrar com soluções EVAC – Sistemas de Alarme e Evacuação por Voz.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#FEC629" />
        </div>
    );
}