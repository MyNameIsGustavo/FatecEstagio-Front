import React from "react";
import { View } from "react-native";
import { Checkbox } from "react-native-paper";
import { useDesign } from "../../hooks/useDesign";

export const CaixaDeVerificacao = ({marcado, setMarcado}) => {
  const { tamanhoFontes } = useDesign();

  return (
    <View>
      <Checkbox.Item
        status={marcado ? 'checked' : 'unchecked'}
        onPress={() => setMarcado(!marcado)}
        label="Você é usuário administrador ?"
        color="#ffffff"
        position="leading"
        labelStyle={{ color: "#ffffff", fontSize: tamanhoFontes.tamanhoPadrao }}
        uncheckedColor="#ffffff"
      />
    </View>
  );
};
