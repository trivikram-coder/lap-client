import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Predict from "./pages/Predict";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Applications from "./pages/Applications";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/applications" element={<Applications/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
