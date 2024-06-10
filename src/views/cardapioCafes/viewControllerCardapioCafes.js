import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useAutenticacao } from "../../hooks/useAutenticacao";
import { ProdutoViewModel } from "../../models/produto/viewModelProduto";

export const UseViewControllerCardapioCafes = () => {
  const [ativoModal, setAtivoModal] = useState();
  const [cafes, setCafes] = useState([]);
  const { tokenJWT } = useAutenticacao();
  const navegacao = useNavigation();
  const produtoViewModel = new ProdutoViewModel();
  const estaNaTela = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cafesData = await produtoViewModel.listarProduto(
          tokenJWT,
          "CAFE"
        );

        setCafes(cafesData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [estaNaTela]);

  const vaiParaDetalhaProdutoCafe = async (idProdutoSelecionado) => {
    const produtoSelecionado = await produtoViewModel.listarProdutoPeloID(
      tokenJWT,
      idProdutoSelecionado
    );
    
    navegacao.navigate("Produto", {
      dadosProdutoSelecionado: produtoSelecionado,
    });
  };

  return {
    vaiParaDetalhaProdutoCafe,
    ativoModal,
    setAtivoModal,
    cafes
  };
};
