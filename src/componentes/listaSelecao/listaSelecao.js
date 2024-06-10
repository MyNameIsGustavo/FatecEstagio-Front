import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useDesign } from "../../hooks/useDesign";

export const ListaSelecao = ({
  dados,
  aoSelecionar,
  titulo,
  valorSelecionado,
  desativado,
}) => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosListaSelecao = gerarEstilosListaSelecao(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <Dropdown
      style={estilosListaSelecao.dropdown}
      placeholderStyle={estilosListaSelecao.placeholderStyle}
      selectedTextStyle={estilosListaSelecao.placeholderStyle}
      iconStyle={desativado ? { display: "none" } : null}
      iconColor={paletaCores.marromTerciario}
      itemTextStyle={estilosListaSelecao.fonteCor}
      autoScroll={false}
      data={dados}
      maxHeight={dimensoesDispositivo.height * 0.2}
      labelField="label"
      valueField="value"
      placeholder={titulo}
      value={valorSelecionado}
      onChange={(item) => aoSelecionar(item.value)}
      disable={desativado}
    />
  );
};

const gerarEstilosListaSelecao = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    dropdown: {
      height: dimensoesDispositivo.height * 0.08,
      paddingHorizontal: 10,
      borderRadius: 10,
      backgroundColor: "#ffffff",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
    },
    placeholderStyle: {
      fontSize: tamanhoFontes.tamanhoPadrao,
      color: paletaCores.marromTerciario,
      fontWeight: "bold",
    },
    fonteCor: {
      color: paletaCores.marromTerciario,
    },
  });
};
