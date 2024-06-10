import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDesign } from "../../hooks/useDesign";
import { useNavigation } from "@react-navigation/native";

export const CabecalhoRotas = ({ titulo, icone }) => {
  const { paletaCores, tamanhoFontes } = useDesign();
  const navegacao = useNavigation();
  const estiloCabecalhoRotas = gerarEstiloCabecalhoRotas(
    paletaCores,
    tamanhoFontes
  );

  return (
    <View style={estiloCabecalhoRotas.cabecalhoBloco}>
      <Text style={estiloCabecalhoRotas.titulo}>{titulo}</Text>
      <TouchableOpacity>
        <Ionicons name={icone} size={26} color={paletaCores.corFontePrimaria} onPress={() => navegacao.navigate('Comanda')}/>
      </TouchableOpacity>
    </View>
  );
};

const gerarEstiloCabecalhoRotas = (paletaCores, tamanhoFontes) => {
  return StyleSheet.create({
    cabecalhoBloco: {
      flexDirection: "row",
      backgroundColor: paletaCores.marromPrimario,
      justifyContent: "space-between",
      paddingHorizontal: 10,
      alignItems: "center",
    },
    titulo: {
      fontSize: tamanhoFontes.tamanhoPadrao,
      color: paletaCores.corFontePrimaria,
      fontWeight: "bold",
    },
  });
};
