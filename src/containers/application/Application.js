import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/loading/Loading';

const HomeAsync = React.lazy(() => import('../home/Home'), { fallback: <Loading /> });
const NotFoundAsync = React.lazy(() => import('../notFound/NotFound'), { fallback: <Loading /> });
const ExampleAsync = React.lazy(() => import('../example/Example'), { fallback: <Loading /> });
const AvailableIntegrationsAsync = React.lazy(() => import('../integrations/AvailableIntegrations'), { fallback: <Loading /> });

const Application = () => (
  <MainLayout>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<HomeAsync />} />
        <Route path="/example" element={<ExampleAsync />} />
        <Route path="/available-integrations" element={<AvailableIntegrationsAsync />} />
        <Route path="*" element={<NotFoundAsync />} />
      </Routes>
    </Suspense>
  </MainLayout>
);

export default Application;
