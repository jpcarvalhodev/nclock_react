import { Footer } from "../components/Footer"
import { NavBar } from "../components/NavBar"
import { TreeViewData } from "../components/TreeView"

export const Persons = () => {

    return (
        <div>
            <NavBar />
            <div style={{ flex: 1 }}>
                <TreeViewData />
            </div>
            <Footer />
        </div>
    )
}