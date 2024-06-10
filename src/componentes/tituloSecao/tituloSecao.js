import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useDesign } from "../../hooks/useDesign";

export const TituloSecao = ({ nomeSecao, exibeLink = true, aoClicar }) => {
  const { paletaCores, tamanhoFontes } = useDesign();
  const estilosTituloSecao = gerarEstilosTituloSecao(
    paletaCores,
    tamanhoFontes
  );

  return (
    <View style={estilosTituloSecao.blocoTituloSecao}>
      <Text style={estilosTituloSecao.blocoTituloSecao.nomeSecao}>
        {nomeSecao}
      </Text>
      {exibeLink ? (
        <TouchableOpacity onPress={aoClicar}>
          <Text style={estilosTituloSecao.blocoTituloSecao.linkSecao}>
            Veja todos.
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const gerarEstilosTituloSecao = (paletaCores, tamanhoFontes) => {
  return StyleSheet.create({
    blocoTituloSecao: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      alignItems: "center",

      nomeSecao: {
        fontSize: tamanhoFontes.tamanhoTitulo,
        color: paletaCores.marromTerciario,
        fontWeight: "bold",
      },
      linkSecao: {
        fontSize: tamanhoFontes.tamanhoPadrao,
        color: paletaCores.corLinkPadrao,
        textDecorationLine: "underline",
      },
    },
  });
};
