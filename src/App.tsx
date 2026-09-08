import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import ThankYou from './ThankYou';
import AvisoLegalPage from './legal/AvisoLegalPage';
import PoliticaPrivacidadPage from './legal/PoliticaPrivacidadPage';
import { ScrollToTop } from './ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
      </Routes>
    </>
  );
}
