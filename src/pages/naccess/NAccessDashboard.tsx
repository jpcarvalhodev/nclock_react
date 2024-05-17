import { Footer } from "../../components/Footer";
import { NavBar } from "../../components/NavBar";

// Define a página principal
export const NAccessDashboard = () => {
    return (
        <div>
            <NavBar />
            <div className="datatable-title-text-dashboard">
                <span>Naccess dashboard</span>
            </div>
            <Footer />
        </div>
    );
}