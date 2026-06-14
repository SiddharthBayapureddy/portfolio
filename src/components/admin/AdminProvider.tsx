"use client";

import { createContext, useContext, ReactNode } from "react";

const AdminContext = createContext<string | undefined>(undefined);

export function AdminProvider({ secret, children }: { secret?: string, children: ReactNode }) {
  return (
    <AdminContext.Provider value={secret}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdminSecret() {
  return useContext(AdminContext);
}
