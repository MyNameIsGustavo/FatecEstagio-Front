import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ViewCadastro } from "../views/cadastro/viewCadastro";
import { ViewLogin } from "../views/login/viewLogin";
import { ViewDetalhaProduto } from "../views/detalhaProduto/viewDetalhaProduto";
import { MenuInferiorRotas } from "./menuInferiorRotas";

import { FormularioEtapa1 } from "../views/formularioProduto/FormularioEtapa1/viewFormularioEtapa1";
import { FormularioEtapa2 } from "../views/formularioProduto/FormularioEtapa2/viewFormularioEtapa2";

export const RotasStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={ViewLogin} />
      <Stack.Screen
        name="Cadastro"
        component={ViewCadastro}
        options={{
          headerShown: true,
          title: "Cadastre-se",
          headerStyle: { backgroundColor: "#E5AB6F" },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
        }}
      />
      <Stack.Screen
        name="Produto"
        component={ViewDetalhaProduto}
        options={{
          headerShown: true,
          title: "Produto",
          headerStyle: { backgroundColor: "#E5AB6F" },
          headerTitleAlign: "center",
          headerTintColor: "#ffffff",
        }}
      />

      <Stack.Screen name="FormularioEtapa1" component={FormularioEtapa1} />
      <Stack.Screen name="FormularioEtapa2" component={FormularioEtapa2} />

      <Stack.Screen name="MenuInferiorApp" component={MenuInferiorRotas} />
    </Stack.Navigator>
  );
};