import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import Loading from "../../components/loading/Loading";
import loadable from "@loadable/component";

const HomeAsync = loadable(() => import('../home/Home'), { fallback: <Loading /> });
const NotFoundAsync = loadable(() => import('../notFound/NotFound'), { fallback: <Loading /> });
const ExampleAsync = loadable(() => import('../example/Example'), { fallback: <Loading /> });

const Application = () => {
  return (
    <MainLayout>
      <Routes>
        <Route index element={<HomeAsync />} />
        <Route path="/example" element={<ExampleAsync />} />
        <Route path="*" element={<NotFoundAsync />} />
      </Routes>
    </MainLayout>
  );
}

export default Application;
