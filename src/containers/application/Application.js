import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/loading/Loading';

const HomeAsync = React.lazy(() => import('../home/Home'));
const NotFoundAsync = React.lazy(() => import('../notFound/NotFound'));
const ExampleAsync = React.lazy(() => import('../example/Example'));
const AvailableIntegrationsAsync = React.lazy(() => import('../integrations/AvailableIntegrations'));
const Channels = React.lazy(() => import('../channels/ChannelsHome'));

const Application = () => (
  <MainLayout>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<HomeAsync />} />
        <Route path="/example" element={<ExampleAsync />} />
        <Route path="/available-integrations" element={<AvailableIntegrationsAsync />} />
        <Route path="channels" element={<Channels />} />
        <Route path="*" element={<NotFoundAsync />} />
      </Routes>
    </Suspense>
  </MainLayout>
);

export default Application;
