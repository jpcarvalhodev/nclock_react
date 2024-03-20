import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import '../css/Dashboard.css';

export const Dashboard = () => {
    return (
        <div className="dashboard">
            <NavBar />
            <Footer />
        </div>
    );
}
