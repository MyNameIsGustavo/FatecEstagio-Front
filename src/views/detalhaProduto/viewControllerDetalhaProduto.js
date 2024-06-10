import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ProdutoViewModel } from "../../models/produto/viewModelProduto";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { Alert } from "react-native";

export const useViewControllerDetalhaProduto = () => {
  const navegacao = useNavigation();
  const produtoViewModel = new ProdutoViewModel();
  const { tokenJWT } = useAutenticacao();
  const [mensagemDeDelecao, setMensagemDeDelecao] = useState({
    sucesso: {
      titulo: "Produto deletado com sucesso!",
      mensagem: "O produto não esta mais disponível no Native Coffe.",
    },
    erro: {
      titulo: "Produto não foi deletado!",
      mensagem: "Algo deu errado ao deletar o produto.",
    },
  });

  const deletaProduto = async (idProduto) => {
    const produtoDeletado = await produtoViewModel.deletarProduto(
      tokenJWT,
      idProduto
    );
    if (produtoDeletado) {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeDelecao.sucesso.titulo,
          mensagemDeDelecao.sucesso.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
      navegacao.navigate("Início");
    } else {
      await new Promise((resolve) => {
        Alert.alert(
          mensagemDeDelecao.erro.titulo,
          mensagemDeDelecao.erro.mensagem,
          [{ text: "OK", onPress: () => resolve() }]
        );
      });
    }
  };

  const vaiParaFormularioParaEditar = async (informacoesProduto) => {
    navegacao.navigate("FormularioEtapa1", {
      objInformacoesProduto: informacoesProduto,
      ehEdicao: true,
    });
  };

  const vaiParaHome = () => {
    navegacao.navigate("Início");
  };

  return {
    vaiParaHome,
    deletaProduto,
    vaiParaFormularioParaEditar,
  };
};
