import { useNavigation } from "@react-navigation/native";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useState } from "react";

export const useViewControllerLogin = () => {
  const navigation = useNavigation();
  const { login } = useAutenticacao();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensagemDeLogin, setMensagemDeLogin] = useState({
    erro: {
      titulo: "Credenciais inválidas.",
      mensagem: "Verifique suas credenciais de login.",
    },
  });

  const realizaLogin = async (credenciais) => {
    const loginBemSucessido = await login(credenciais);
    if (loginBemSucessido) {
      navigation.navigate("MenuInferiorApp");
    } else {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeLogin.erro.titulo,
          mensagemDeLogin.erro.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
    }
  };

  function vaiParaCadastro() {
    navigation.navigate("Cadastro");
  }

  return {
    realizaLogin,
    vaiParaCadastro,
    control,
    handleSubmit,
    errors
  };
};
