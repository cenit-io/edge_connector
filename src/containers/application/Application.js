import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Loading from "../../components/loading/Loading";

const HomeAsync = React.lazy(() => import('../home/Home'));
const NotFoundAsync = React.lazy(() => import('../notFound/NotFound'));

const Application = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<HomeAsync />} />
          <Route path="*" element={<NotFoundAsync />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default Application;
