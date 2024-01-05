import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fetchMisdemeanours } from "./service/fetch-misdemeanours.tsx";

const misdemeanoursQueryClient = new QueryClient();

export const misdemeanoursQuery = () => ({
  queryKey: ["misdemeanours"],
  queryFn: async () => {
    return await fetchMisdemeanours();
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={misdemeanoursQueryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
