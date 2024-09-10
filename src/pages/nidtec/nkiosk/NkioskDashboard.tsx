import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nkiosk from "../../../assets/img/carousel/product_nkiosk.webp";

export const NkioskDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#009739" />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nkiosk Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nkiosk} alt="Nkiosk" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Quiosques Multimédia- Nkiosk</h3>
                    <p className="dashboard-text-inside">
                        O Nkiosk é um software dedicado aos Quiosques Digitais da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Reduzir os gastos com a impressão;</p>
                    <p>- Editar o conteúdo de forma mais automatizada;</p>
                    <p>- Tornar o ambiente mais moderno e agradável;</p>
                    <p>- Interagir de forma eficiente com a jornada do cliente;</p>
                    <p>- Automatizar os processos e sistemas self-service.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#009739" />
        </div>
    );
}