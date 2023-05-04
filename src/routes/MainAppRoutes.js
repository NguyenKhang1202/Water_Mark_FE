import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import LayoutApp from '../components/layout/Layout';
import Loading from '../components/common/Loading';

const Home = lazy(() => import('../components/home/Home'));

function MainAppRoutes(props) {
  return (
    <LayoutApp>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </Suspense>
    </LayoutApp>
  );
}

export default MainAppRoutes;
