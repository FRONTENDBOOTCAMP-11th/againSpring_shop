import PropTypes from "prop-types"; // PropTypes를 임포트합니다.
import Header from "../components/Header";
import Footer from "../components/Footer";
import Slider from "./Slider";

Layout.propTypes = {
  children: PropTypes.node,
};

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Slider />
        {children}
      </main>
      <Footer />
    </div>
  );
};


export default Layout;