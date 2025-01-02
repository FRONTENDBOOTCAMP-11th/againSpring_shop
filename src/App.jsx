import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/Cart" element={<Cart />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
