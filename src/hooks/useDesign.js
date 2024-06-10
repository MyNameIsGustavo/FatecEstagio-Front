import React, { createContext, useState, useEffect, useContext } from "react";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

const MaterialDesignContext = createContext();

export const MaterialDesignProvider = ({ children }) => {
  const [dimensoesDispositivo, setDimensoesDispositivo] = useState({});

  useEffect(() => {
    const { width, height } = Dimensions.get("window");
    setDimensoesDispositivo({ width, height });
  }, []);

  const paletaCores = {
    marromPrimario: "#E5AB6F",
    marromSecundario: "#CB9459",
    marromTerciario: "#B27E43",

    corFontePrimaria: "#FFFFFF",
    corLinkPadrao: "#BAB8B8",
  };

  const tamanhoFontes = {
    tamanhoPequeno: RFValue(16, dimensoesDispositivo.height),
    tamanhoPadrao: RFValue(18, dimensoesDispositivo.height),
    tamanhoGrande: RFValue(22, dimensoesDispositivo.height),


    tamanhoTitulo: RFValue(35, dimensoesDispositivo.height),
    tamanhoSubtitulo: RFValue(25, dimensoesDispositivo.height),

    tituloHome: RFValue(50, dimensoesDispositivo.height),
  };

  const contextoValores = { paletaCores, tamanhoFontes, dimensoesDispositivo };

  return (
    <MaterialDesignContext.Provider value={contextoValores}>
      {children}
    </MaterialDesignContext.Provider>
  );
};

export const useDesign = () => {
  return useContext(MaterialDesignContext);
};
