/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import ThankYou from './ThankYou';
import AvisoLegalPage from './legal/AvisoLegalPage';
import PoliticaCookiesPage from './legal/PoliticaCookiesPage';
import PoliticaPrivacidadPage from './legal/PoliticaPrivacidadPage';
import { MetaPixelSpaPageView } from './MetaPixelSpaPageView';
import { ScrollToTop } from './ScrollToTop';

export default function App() {
  return (
    <>
      <ScrollToTop />
      <MetaPixelSpaPageView />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gracias" element={<ThankYou />} />
        <Route path="/aviso-legal" element={<AvisoLegalPage />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidadPage />} />
        <Route path="/politica-cookies" element={<PoliticaCookiesPage />} />
      </Routes>
    </>
  );
}
