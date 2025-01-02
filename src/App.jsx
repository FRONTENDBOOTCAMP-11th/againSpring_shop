import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Login from "./pages/user/Login";

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
