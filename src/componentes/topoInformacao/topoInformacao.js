import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useDesign } from "../../hooks/useDesign";

export const TopoInformacao = ({titulo, subtitulo}) => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();

  const estilos = gerarEstilos(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <View style={estilos.bloco}>
      <Text style={estilos.bloco.tituloTopoInformacao}>{titulo}</Text>
      <Text style={estilos.bloco.subtituloTopoInformacao}>
        {subtitulo}
      </Text>
    </View>
  );
};

const gerarEstilos = (tema, tamanhoFontes, dimensoesDispositivo) => {
  return StyleSheet.create({
    bloco: {
      height: dimensoesDispositivo.height * 0.15,
      backgroundColor: tema.marromPrimario,
      paddingHorizontal: 10,
      justifyContent: 'center',

      tituloTopoInformacao: {
        color: tema.corFontePrimaria,
        fontSize: tamanhoFontes.tamanhoTitulo,
        fontWeight: "bold",
      },
      subtituloTopoInformacao: {
        color: tema.corFontePrimaria,
        fontSize: tamanhoFontes.tamanhoSubtitulo,
      },
    },
  });
};
