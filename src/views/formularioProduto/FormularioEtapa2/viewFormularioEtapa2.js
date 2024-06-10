import { React } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDesign } from "../../../hooks/useDesign";
import { ListaSelecao } from "../../../componentes/listaSelecao/listaSelecao";
import { EntradaDeSelecaoDeQuantidade } from "../../../componentes/entradaDeSelecaoDeQuantidade/entradaDeSelecaoDeQuantidade";
import { UseViewControllerFormularioEtapa2 } from "../FormularioEtapa2/viewControllerFormularioEtapa2";
import { Controller } from "react-hook-form";

export const FormularioEtapa2 = () => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosViewFormularioEtapa2 = gerarEstilosViewFormularioEtapa2(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo.width,
    dimensoesDispositivo.height
  );

  const {
    cadastrarProduto,
    editaProduto,
    voltaParaPrimeiraEtapa,
    ehEdicao,
    dadosDaSegundaEtapaParaEditar,
    control,
    handleSubmit,
    dadosListaSelecao,
    dadosListaSelecaoTipoProduto,
    errors,
  } = UseViewControllerFormularioEtapa2();

  return (
    <SafeAreaView style={estilosViewFormularioEtapa2.tela}>
      <View style={estilosViewFormularioEtapa2.formulario}>
        <Controller
          control={control}
          render={({ field }) => (
            <View>
              <ListaSelecao
                dados={dadosListaSelecao}
                titulo={"Tamanho: "}
                aoSelecionar={field.onChange}
                valorSelecionado={field.value}
              />
              {errors.tamanhoProduto && (
                <Text
                  style={estilosViewFormularioEtapa2.formulario.mensagemErro}
                >
                  {errors.tamanhoProduto.message}
                </Text>
              )}
            </View>
          )}
          name="tamanhoProduto"
          defaultValue={
            ehEdicao ? dadosDaSegundaEtapaParaEditar.tamanhoProduto : ""
          }
          rules={{ required: "O tamanho é obrigatório." }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <EntradaDeSelecaoDeQuantidade
              tituloEntrada={"Quantidade: "}
              aoSelecionar={(valor) => onChange(valor)}
              valor={value}
              desativado={true}
            />
          )}
          name="quantidadeProduto"
          defaultValue={
            ehEdicao ? dadosDaSegundaEtapaParaEditar.quantidadeProduto : ""
          }
        />

        <Controller
          control={control}
          render={({ field }) => (
            <View>
              <ListaSelecao
                titulo={"Tipo: "}
                aoSelecionar={field.onChange}
                dados={dadosListaSelecaoTipoProduto}
                valorSelecionado={field.value}
              />
              {errors.tipoProduto && (
                <Text
                  style={estilosViewFormularioEtapa2.formulario.mensagemErro}
                >
                  {errors.tipoProduto.message}
                </Text>
              )}
            </View>
          )}
          name="tipoProduto"
          defaultValue={
            ehEdicao ? dadosDaSegundaEtapaParaEditar.tipoProduto : ""
          }
          rules={{ required: "O tipo é obrigatório." }}
        />

        <TouchableOpacity
          style={estilosViewFormularioEtapa2.estiloBotao}
          onPress={
            ehEdicao
              ? handleSubmit(editaProduto)
              : handleSubmit(cadastrarProduto)
          }
        >
          <Text style={estilosViewFormularioEtapa2.estiloBotao.textoBotao}>
            {ehEdicao ? "Editar!" : "Cadastrar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilosViewFormularioEtapa2.estiloBotao}
          onPress={() => {
            voltaParaPrimeiraEtapa();
          }}
        >
          <Text style={estilosViewFormularioEtapa2.estiloBotao.textoBotao}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const gerarEstilosViewFormularioEtapa2 = (
  tema,
  tamanhoFontes,
  larguraDaTela,
  alturaDaTela
) => {
  return StyleSheet.create({
    tela: {
      flex: 1,
      flexDirection: "column",
      marginHorizontal: 15,
    },

    formulario: {
      flexGrow: 0.9,
      justifyContent: "space-evenly",
      alignContent: "center",

      mensagemErro: {
        fontSize: tamanhoFontes.tamanhoPequeno,
        color: "#eb3d34",
        fontWeight: "bold",
        textAlign: "center",
      },
    },

    estiloBotao: {
      alignSelf: "center",
      width: larguraDaTela * 0.8,
      height: alturaDaTela * 0.07,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      borderColor: tema.marromSecundario,
      borderWidth: 1,
      backgroundColor: tema.marromPrimario,

      textoBotao: {
        fontSize: tamanhoFontes.tamanhoPadrao,
        color: tema.corFontePrimaria,
      },
    },
  });
};
