import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nsmart from "../../../assets/img/carousel/product_nsmart.webp";
import { useColor } from "../../../context/ColorContext";

export const NsmartDashboard = () => {
    const { navbarColor, footerColor } = useColor();

    return (
        <div className="dashboard-container">
            <NavBar style={{ backgroundColor: navbarColor }} />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Nsmart Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nsmart} alt="Nsmart" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE INTELIGÊNCIA ARTIFICIAL- NSMART</h3>
                    <p className="dashboard-text-inside">
                        O Nsmart é um software dedicado à Inteligência Artificial (AI) da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Manter uma taxa de erro mínima ou inexistente;</p>
                    <p>- Acelerar a execução das tarefas;</p>
                    <p>- Praticar um sistema lógico e acertado;</p>
                    <p>- Realizar tarefas de maior risco;</p>
                    <p>- Prever ocorrências;</p>
                    <p>- Mitigar os riscos atempadamente.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer style={{ backgroundColor: footerColor }} />
        </div>
    );
}