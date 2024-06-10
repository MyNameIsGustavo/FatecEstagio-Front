import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

export const EntradaDeTexto = ({
  titulo,
  ehSenha = false,
  estado,
  setEstado,
  formatar,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
    if (formatar && estado !== "") {
      const valorFormatado = formatarValorParaDinheiro(estado);
      setEstado(valorFormatado);
    }
  };

  const handleChangeText = (text) => {
    setEstado(text);
  };

  const formatarValorParaDinheiro = (valor) => {
    const numero = parseFloat(valor);
    if (isNaN(numero)) return valor;

    const valorFormatado = numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return valorFormatado.replace(",", ".");
  };

  return (
    <TextInput
      style={estiloEntradaDeTexto.entradaDeTexto}
      placeholder={titulo}
      value={estado}
      onChangeText={handleChangeText}
      onBlur={handleBlur}
      onFocus={() => setIsFocused(true)}
      secureTextEntry={ehSenha}
      autoCapitalize="none"
    />
  );
};

const estiloEntradaDeTexto = StyleSheet.create({
  entradaDeTexto: {
    borderRadius: 10,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 60,
    width: "auto",
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
});
