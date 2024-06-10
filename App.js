import React from "react";
import { AppNavigation } from "./src/rotas/rotas";
import { MaterialDesignProvider } from "./src/hooks/useDesign";
import { AutenticacaoProvider } from "./src/hooks/useAutenticacao";

export default function App() {
  return (
    <MaterialDesignProvider>
      <AutenticacaoProvider>
        <AppNavigation />
      </AutenticacaoProvider>
    </MaterialDesignProvider>
  );
}