import Header from "../components/Header";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow px-6">
        <h1 className="text-2xl font-bold">main contents</h1>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
