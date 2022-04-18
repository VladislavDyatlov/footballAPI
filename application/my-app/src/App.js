import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './component/Navbar';
import Center from './component/Center';
import Footer from './component/Footer';
import Team from './component/Team';
import Match from './component/Match';
import {
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <>
    <Navbar />
    <Routes>      
      <Route index path="/" element={<Center />} />
      <Route index path="/team" element={<Team />} />
      <Route index path="/match/:id" element={<Match />} />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
