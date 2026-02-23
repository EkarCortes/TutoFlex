import React, { createContext, useContext, useMemo, useState } from "react";

export type RegistrationRole = "Estudiante" | "Profesor";

type PendingRegistrationData = {
  email: string;
  password: string;
  role: RegistrationRole;
};

type PendingRegistrationContextType = {
  pendingRegistration: PendingRegistrationData | null;
  setPendingRegistration: (data: PendingRegistrationData) => void;
  clearPendingRegistration: () => void;
};

const PendingRegistrationContext = createContext<PendingRegistrationContextType | null>(null);

export const PendingRegistrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [pendingRegistration, setPendingRegistrationState] =
    useState<PendingRegistrationData | null>(null);

  const setPendingRegistration = (data: PendingRegistrationData) => {
    setPendingRegistrationState(data);
  };

  const clearPendingRegistration = () => {
    setPendingRegistrationState(null);
  };

  const value = useMemo(
    () => ({
      pendingRegistration,
      setPendingRegistration,
      clearPendingRegistration,
    }),
    [pendingRegistration]
  );

  return (
    <PendingRegistrationContext.Provider value={value}>
      {children}
    </PendingRegistrationContext.Provider>
  );
};

export const usePendingRegistration = () => {
  const context = useContext(PendingRegistrationContext);
  if (!context) {
    throw new Error("usePendingRegistration debe usarse dentro de PendingRegistrationProvider");
  }
  return context;
};

// Expo Router trata este archivo como ruta al estar dentro de /app.
// Exportamos un componente por defecto para evitar el warning de "missing default export".
export default function PendingRegistrationContextRoute() {
  return null;
}
