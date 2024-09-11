import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_ncity from "../../../assets/img/carousel/product_ncity.webp";

export const NcityDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#009739" />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Ncity Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_ncity} alt="Ncity" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE MOBILIDADE SUSTENTÁVEL- NCITY</h3>
                    <p className="dashboard-text-inside">
                        O Ncity é um software dedicado à Mobilidade Sustentável da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Reduzir a poluição ambiental;</p>
                    <p>- Reduzir o tempo de tráfego;</p>
                    <p>- Adotar energias renováveis;</p>
                    <p>- Melhorar a acessibilidade ao transporte;</p>
                    <p>- Criar benefícios económicos;</p>
                    <p>- Aumentar a qualidade de vida.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#009739" />
        </div>
    );
}