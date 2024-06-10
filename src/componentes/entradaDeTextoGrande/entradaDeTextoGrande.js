import React from "react";
import { StyleSheet, TextInput } from "react-native";

export const EntradaDeTextoGrande = ({
  titulo,
  ehSenha = false,
  estado,
  setEstado,
}) => {
  return (
    <TextInput
      style={estiloEntradaDeTextoGrande.entradaDeTexto}
      placeholder={titulo}
      value={estado}
      onChangeText={(texto) => setEstado(texto)}
      secureTextEntry={ehSenha}
      autoCapitalize="none"
      numberOfLines={5}
      multiline={true}
      textAlignVertical="top"
    />
  );
};

const estiloEntradaDeTextoGrande = StyleSheet.create({
  entradaDeTexto: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 80,
    width: "auto",
    padding: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});