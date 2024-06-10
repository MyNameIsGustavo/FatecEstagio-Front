import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";

export const UseViewControllerFormularioEtapa1 = () => {
  const rotas = useRoute();

  const dadosDaPrimeiraEtapaDoFormularioEditar =
    rotas.params?.objInformacoesProduto || {};

  const ehEdicao = rotas.params?.ehEdicao || false;

  const navegue = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const vaiParaSegundaEtapa = (dadosFormularioProdutoPrimeiraEtapa) => {
    navegue.navigate("FormularioEtapa2", {
      edicaoDeDados: ehEdicao ? true : false,
      dadosDaPrimeiraEtapaDoFormularioEditar: ehEdicao
        ? dadosDaPrimeiraEtapaDoFormularioEditar
        : null,
      formularioPrimeiraEtapa: dadosFormularioProdutoPrimeiraEtapa,
    });
  };

  return {
    vaiParaSegundaEtapa,
    control,
    handleSubmit,
    dadosDaPrimeiraEtapaDoFormularioEditar,
    ehEdicao,
    errors
  };
};
