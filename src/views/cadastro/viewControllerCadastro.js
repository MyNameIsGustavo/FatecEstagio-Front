import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ClienteViewModel } from "../../models/cliente/viewModelCliente";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";

export const useViewControllerCadastro = () => {
  const clienteViewModel = new ClienteViewModel();
  const navegacao = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [mensagemDeCadastro, setMensagemDeCadastro] = useState({
    sucesso: {
      titulo: "Sucesso ao cadastrar.",
      mensagem: "Parabéns, você foi cadastrado com sucesso no Native Coffe.",
    },
    erro: {
      titulo: "Erro ao cadastrar.",
      mensagem: "Algo deu errado ao se cadastrar no Native Coffe.",
    },
  });

  const cadastrarNovoUsuario = async (dados) => {
    const sucessoAoCadastrar = await clienteViewModel.cadastrarNovoUsuario(
      dados
    );
    if (sucessoAoCadastrar) {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeCadastro.sucesso.titulo,
          mensagemDeCadastro.sucesso.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
      navegacao.goBack();
    } else {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeCadastro.erro.titulo,
          mensagemDeCadastro.erro.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
    }
  };

  return {
    cadastrarNovoUsuario,
    mensagemDeCadastro,
    control,
    handleSubmit,
    errors
  };
};
