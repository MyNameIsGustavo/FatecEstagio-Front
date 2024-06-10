import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ViewHome } from "../views/home/viewHome";
import { ViewCardapioCafes } from "../views/cardapioCafes/viewCardapioCafes";
import { ViewCardapioAperitivos } from "../views/cardapioAperitivos/viewCardapioAperitivos";
import { FormularioEtapa1 } from "../views/formularioProduto/FormularioEtapa1/viewFormularioEtapa1";
import { Ionicons } from "@expo/vector-icons";
import { useDesign } from "../hooks/useDesign";
import { CabecalhoRotas } from "../componentes/cabecalho/cabecalhoRotas";
import { useAutenticacao } from "../hooks/useAutenticacao";

export const MenuInferiorRotas = () => {
  const Tab = createBottomTabNavigator();
  const { paletaCores } = useDesign();
  const { informacoesUsuario } = useAutenticacao();

  return (
    <Tab.Navigator
      screenOptions={{
        header: () => (
          <CabecalhoRotas titulo={`Olá, ${informacoesUsuario.nomeUsuario}.`} />
        ),
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: paletaCores.marromPrimario },
        tabBarLabelStyle: { color: paletaCores.corFontePrimaria },
      }}
    >
      <Tab.Screen
        name="Início"
        component={ViewHome}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={paletaCores.corFontePrimaria}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cafés"
        component={ViewCardapioCafes}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="cafe-outline"
              color={paletaCores.corFontePrimaria}
              size={30}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Aperitivos"
        component={ViewCardapioAperitivos}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="fast-food-outline"
              color={paletaCores.corFontePrimaria}
              size={30}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Cadastro"
        component={FormularioEtapa1}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="add-circle-outline"
              color={paletaCores.corFontePrimaria}
              size={30}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
