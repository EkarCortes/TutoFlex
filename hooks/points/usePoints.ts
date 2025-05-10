import { useState } from "react";
import useGetUserProfile from "./useGetUserProfile";

// Este hook se encarga de manejar la lógica de los puntos del usuario.

const usePoints = () => {
  const [selectedTab, setSelectedTab] = useState("Funcionamiento");
  const { profile } = useGetUserProfile();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
  };

  return {
    selectedTab,
    profile,
    handleTabChange,
  };
};

export default usePoints;
