// pages/planning.tsx
import React from "react";
import { NextPage } from "next";
import MainLayout from "./layout/MainLayout";
import HeaderComponent from "./components/Header";
import VesselModal from "./components/VesselModal";
import TransportTable from "./components/TransportTable";

const PlanningPage: NextPage = () => {
  return (
    <>
      <HeaderComponent />
      <VesselModal />
      <TransportTable />
    </>
  );
};

export default PlanningPage;
