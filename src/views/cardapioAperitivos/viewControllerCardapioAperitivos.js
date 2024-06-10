import { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { ProdutoViewModel } from "../../models/produto/viewModelProduto";

export const UseViewControllerCardapioAperitivos = () => {
  const [ativoModal, setAtivoModal] = useState();
  const [aperitivos, setAperitivos] = useState([]);
  const { tokenJWT } = useAutenticacao();
  const navegacao = useNavigation();
  const produtoViewModel = new ProdutoViewModel();
  const estaNaTela = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const aperitivosData = await produtoViewModel.listarProduto(
          tokenJWT,
          "APERITIVO"
        );

        setAperitivos(aperitivosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [estaNaTela]);

  const vaiParaDetalhaProdutoAperitivo = async (idProdutoSelecionado) => {
    const produtoSelecionado = await produtoViewModel.listarProdutoPeloID(
      tokenJWT,
      idProdutoSelecionado
    );

    navegacao.navigate("Produto", {
      dadosProdutoSelecionado: produtoSelecionado,
    });
  };

  return {
    vaiParaDetalhaProdutoAperitivo,
    ativoModal,
    setAtivoModal,
    aperitivos,
  };
};
