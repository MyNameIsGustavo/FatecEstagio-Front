import { useNavigation, useRoute } from "@react-navigation/native";
import { ProdutoViewModel } from "../../../models/produto/viewModelProduto";
import { useAutenticacao } from "../../../hooks/useAutenticacao";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Alert } from "react-native";

export const UseViewControllerFormularioEtapa2 = () => {
  const rotas = useRoute();
  const navegue = useNavigation();
  const produtoViewModel = new ProdutoViewModel();
  const dadosDaPrimeiraEtapaDoFormulario = rotas.params.formularioPrimeiraEtapa;
  const ehEdicao = rotas.params?.edicaoDeDados;
  const dadosDaSegundaEtapaParaEditar =
    rotas.params?.dadosDaPrimeiraEtapaDoFormularioEditar;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { tokenJWT } = useAutenticacao();

  const dadosListaSelecao = [
    { label: "Pequeno", value: "PEQUENO" },
    { label: "Médio", value: "MEDIO" },
    { label: "Grande", value: "GRANDE" },
  ];

  const dadosListaSelecaoTipoProduto = [
    { label: "Café", value: "CAFE" },
    { label: "Aperitivo", value: "APERITIVO" },
  ];

  const [mensagemDeStatusProduto, setMensagemDeStatusProduto] = useState({
    sucesso: {
      cadastro: {
        titulo: "Produto cadastrado com sucesso!",
        mensagem:
          "Parabéns, agora o novo produto esta disponível no Native Coffe",
      },
      edicao: {
        titulo: "Produto editado com sucesso!",
        mensagem: "O produto foi editado e esta disponível no Native Coffe.",
      },
    },
    erro: {
      cadastro: {
        titulo: "Erro ao cadastrar o produto!",
        mensagem: "Algo deu errado ao cadastrar o produto no Native Coffe.",
      },
      edicao: {
        titulo: "Erro ao editar o produto!",
        mensagem: "Algo deu errado ao editar o produto no Native Coffe.",
      },
    },
  });

  const editaProduto = async () => {
    const dadosFormatados = {
      nomeProduto: dadosDaPrimeiraEtapaDoFormulario.nomeProduto,
      precoProduto: limpaValor(dadosDaPrimeiraEtapaDoFormulario.precoProduto),
      descricaoProduto: dadosDaPrimeiraEtapaDoFormulario.descricaoProduto,
      tamanhoProduto: control._fields["tamanhoProduto"]._f.value || "PEQUENO",
      tipoProduto: control._fields["tipoProduto"]._f.value || "CAFE",
      quantidadeProduto:
        parseInt(control._fields["quantidadeProduto"]._f.value) || 1,
      urlImagemProduto: dadosDaPrimeiraEtapaDoFormulario.urlImagemProduto,
    };

    const editarProduto = await produtoViewModel.editarProduto(
      tokenJWT,
      dadosDaSegundaEtapaParaEditar.chavePrimaria_idProduto,
      dadosFormatados
    );

    if (editarProduto) {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeStatusProduto.sucesso.edicao.titulo,
          mensagemDeStatusProduto.sucesso.edicao.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
      navegue.navigate("Início");
    } else {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeStatusProduto.erro.edicao.titulo,
          mensagemDeStatusProduto.erro.edicao.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
    }
  };

  function limpaValor(valor) {
    return parseFloat(valor.replace("R$", ""));
  }

  const cadastrarProduto = async () => {
    const dadosFormatados = {
      nomeProduto: dadosDaPrimeiraEtapaDoFormulario.nomeProduto,
      precoProduto: limpaValor(dadosDaPrimeiraEtapaDoFormulario.precoProduto),
      descricaoProduto: dadosDaPrimeiraEtapaDoFormulario.descricaoProduto,
      tamanhoProduto: control._fields["tamanhoProduto"]._f.value || "PEQUENO",
      tipoProduto: control._fields["tipoProduto"]._f.value || "CAFE",
      quantidadeProduto:
        parseInt(control._fields["quantidadeProduto"]._f.value) || 1,
      urlImagemProduto: dadosDaPrimeiraEtapaDoFormulario.urlImagemProduto,
    };

    const produtoCadastrado = await produtoViewModel.cadastrarNovoProduto(
      tokenJWT,
      dadosFormatados
    );
    if (produtoCadastrado) {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeStatusProduto.sucesso.cadastro.titulo,
          mensagemDeStatusProduto.sucesso.cadastro.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
      navegue.navigate("Início");
    } else {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeStatusProduto.erro.cadastro.titulo,
          mensagemDeStatusProduto.erro.cadastro.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
    }
  };

  const vaiParaInicio = () => {
    navegue.navigate("Início");
  };

  const voltaParaPrimeiraEtapa = () => {
    navegue.goBack();
  };

  return {
    cadastrarProduto,
    editaProduto,
    vaiParaInicio,
    voltaParaPrimeiraEtapa,
    ehEdicao,
    dadosDaSegundaEtapaParaEditar,
    control,
    handleSubmit,
    dadosListaSelecaoTipoProduto,
    dadosListaSelecao,
    errors,
  };
};
