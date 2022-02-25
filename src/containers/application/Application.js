import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Loading from "../../components/loading/Loading";
import { lazy } from "@loadable/component";

const HomeAsync = lazy(() => import('../home/Home'));
const NotFoundAsync = lazy(() => import('../notFound/NotFound'));
const ExampleAsync = lazy(() => import('../example/Example'));

const Application = () => {
  return (
    <MainLayout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<HomeAsync />} />
          <Route path="/example" element={<ExampleAsync />} />
          <Route path="*" element={<NotFoundAsync />} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default Application;
