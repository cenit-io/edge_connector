import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/loading/Loading';

const HomeAsync = React.lazy(() => import ('../home/Home'));
const NotFoundAsync = React.lazy(() => import('../notFound/NotFound'));
const ExampleAsync = React.lazy(() => import('../example/Example'));
const AvailableIntegrationsAsync = React.lazy(() => import('../integrations/AvailableIntegrations'));
const ConnectedIntegrationsAsync = React.lazy(() => import('../integrations/ConnectedIntegrations'));
const ChannelsAsync = React.lazy(() => import('../channels/Channels'));
const TasksAsync = React.lazy(() => import('../tasks/TaskList'));

const Application = () => (
  <MainLayout>
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route index element={<HomeAsync />} />
        <Route path="/example" element={<ExampleAsync />} />
        <Route path="/integrations/available-integrations" element={<AvailableIntegrationsAsync />} />
        <Route path="/integrations/channels" element={<ChannelsAsync />} />
        <Route path="/integrations/connected-integrations" element={<ConnectedIntegrationsAsync />} />
        <Route path="/tasks" element={<TasksAsync />} />
        <Route path="*" element={<NotFoundAsync />} />
      </Routes>
    </Suspense>
  </MainLayout>
);

export default Application;
