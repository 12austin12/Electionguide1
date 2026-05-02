import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy loading pages for efficiency
const Home = lazy(() => import('./pages/Home'));
const Timeline = lazy(() => import('./pages/Timeline'));
const EligibilityChecker = lazy(() => import('./pages/EligibilityChecker'));
const Quiz = lazy(() => import('./pages/Quiz'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Guide = lazy(() => import('./pages/Guide'));

// Loading fallback component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="spinner">Loading...</div>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="guide" element={<Guide />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="eligibility" element={<EligibilityChecker />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="simulator" element={<Simulator />} />
          </Route>
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
