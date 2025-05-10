import { useState } from "react";
import useGetUserProfile from "./useGetUserProfile";

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
