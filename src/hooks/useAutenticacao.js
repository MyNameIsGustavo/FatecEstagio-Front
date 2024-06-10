import React, { createContext, useContext, useState } from "react";
import { ClienteViewModel } from "../models/cliente/viewModelCliente";

const AutenticacaContext = createContext();

export const useAutenticacao = () => {
  return useContext(AutenticacaContext);
};

export const AutenticacaoProvider = ({ children }) => {
  const [tokenJWT, setTokenJWT] = useState(null);
  const [informacoesUsuario, setInformacoesUsuario] = useState(null);
  const cliente = new ClienteViewModel();

  const login = async (credenciais) => {
    try {
      const hashToken = await cliente.realizaLogin(credenciais);
      if (hashToken) {
        setTokenJWT(hashToken);
        setInformacoesUsuario(await cliente.pegarInformacoesUsuario(hashToken));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
      return false;
    }
  };

  return (
    <AutenticacaContext.Provider
      value={{ tokenJWT, login, informacoesUsuario }}
    >
      {children}
    </AutenticacaContext.Provider>
  );
};
