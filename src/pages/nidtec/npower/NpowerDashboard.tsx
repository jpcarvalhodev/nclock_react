import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_npower from "../../../assets/img/carousel/product_npower.webp";

export const NpowerDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#009739" />
            <div className="dashboard-title-text" style={{ color: '#009739' }}>
                <span>Npower Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_npower} alt="Npower" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">SOFTWARE ENERGIAS RENOVÁVEIS- NPOWER</h3>
                    <p className="dashboard-text-inside">
                        O Npower é um software dedicado à sustentabilidade e energias renováveis da sua empresa. Ele permite-lhe:
                    </p>
                    <p>- Impactar a natureza e o planeta terra;</p>
                    <p>- Aumentar a contribuição económica;</p>
                    <p>- Diminuir, a longo prazo, os custos para o consumidor;</p>
                    <p>- Reduzir a dependência dos combustíveis fósseis;</p>
                    <p>- Aumentar os postos de emprego especializados;</p>
                    <p>- Criar novas tecnologias;</p>
                    <p>- Aumentar e potenciar o valor da empresa.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#009739" />
        </div>
    );
}