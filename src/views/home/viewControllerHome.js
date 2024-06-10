import { useNavigation, useIsFocused } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { ProdutoViewModel } from "../../models/produto/viewModelProduto";
import { useAutenticacao } from "../../hooks/useAutenticacao";

export const useViewControllerHome = () => {
  const [ativoModal, setAtivoModal] = useState(false);
  const [cafes, setCafes] = useState([]);
  const [aperitivos, setAperitivos] = useState([]);
  const { tokenJWT } = useAutenticacao();
  const navegacao = useNavigation();
  const produtoViewModel = new ProdutoViewModel();
  const estaNaTela = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cafesData, aperitivosData] = await Promise.all([
          produtoViewModel.listarProduto(tokenJWT, "CAFE"),
          produtoViewModel.listarProduto(tokenJWT, "APERITIVO"),
        ]);
        setCafes(cafesData);
        setAperitivos(aperitivosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [estaNaTela]);

  const vaiParaDetalhaProduto = async (idProdutoSelecionado) => {
    const produtoSelecionado = await produtoViewModel.listarProdutoPeloID(
      tokenJWT,
      idProdutoSelecionado
    );
    
    navegacao.navigate("Produto", {
      dadosProdutoSelecionado: produtoSelecionado,
    });
  };

  const vaiParaCatalogoCafe = () => {
    navegacao.navigate("Cafés");
  };

  const vaiParaCatalogoAperitivo = () => {
    navegacao.navigate("Aperitivos");
  };

  return {
    vaiParaDetalhaProduto,
    vaiParaCatalogoCafe,
    vaiParaCatalogoAperitivo,
    ativoModal,
    setAtivoModal,
    cafes,
    aperitivos,
  };
};
