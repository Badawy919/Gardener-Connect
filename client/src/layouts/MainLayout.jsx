import Header from '../components/common/Header';
import { Outlet } from 'react-router';
import Footer from '../components/common/Footer';
import DynamicTitle from '../components/shared/DynamicTitle';

const MainLayouts = () => {
    return (
        <div>
            <DynamicTitle />
            <header>
                <Header></Header>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayouts;