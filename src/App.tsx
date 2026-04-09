/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import ThankYou from './ThankYou';
import { MetaPixelSpaPageView } from './MetaPixelSpaPageView';

export default function App() {
  return (
    <>
      <MetaPixelSpaPageView />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gracias" element={<ThankYou />} />
      </Routes>
    </>
  );
}
