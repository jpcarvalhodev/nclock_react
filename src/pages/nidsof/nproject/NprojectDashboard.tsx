import { Carousel } from "react-responsive-carousel";
import { Footer } from "../../../components/Footer";
import { NavBar } from "../../../components/NavBar";
import product_nproject from "../../../assets/img/carousel/product_nproject.webp";

export const NprojectDashboard = () => {

    return (
        <div className="dashboard-container">
            <NavBar color="#D01313" />
            <div className="dashboard-title-text" style={{ color: '#D01313' }}>
                <span>Nproject Dashboard</span>
            </div>
            <div className="dashboard-content-wrapper">
                <div className="dashboard-carousel-container">
                    <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} showArrows={false} emulateTouch={true}>
                        <div>
                            <img className="img-carousel" src={product_nproject} alt="Nproject" />
                        </div>
                    </Carousel>
                </div>
                <div className="dashboard-carousel-container">
                    <h3 className="dashboard-title-text-inside">Software Nproject</h3>
                    <p className="dashboard-text-inside">
                        O Nproject é um software pensado para as diferentes necessidades tecnológicas das empresas, na esfera da Gestão de Equipamentos. Ele permite-lhe:
                    </p>
                    <p>- Maior sustentabilidade e economia face à produção real;</p>
                    <p>- Reduzir o processo de aprovação;</p>
                    <p>- Reduzir a margem de erro na execução do projeto.</p>
                    <p>- Maior possibilidade de testar ideias;</p>
                    <p>- Maior proximidade com a realidade;</p>
                    <p>- Gerir as estimativas de custo e listas a partir de relatórios.</p>
                    <p style={{ marginTop: 50 }}>Em caso de dúvidas, contacte-nos no e-mail info@nidgroup.pt</p>
                </div>
            </div>
            <Footer color="#D01313" />
        </div>
    );
}