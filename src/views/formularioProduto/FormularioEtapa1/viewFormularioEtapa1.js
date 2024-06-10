import { React, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDesign } from "../../../hooks/useDesign";
import { EntradaDeTexto } from "../../../componentes/entradaDeTexto/entradaDeTexto";
import { EntradaDeTextoGrande } from "../../../componentes/entradaDeTextoGrande/entradaDeTextoGrande";
import { UseViewControllerFormularioEtapa1 } from "../FormularioEtapa1/viewControllerFormularioEtapa1";
import { Controller } from "react-hook-form";

export const FormularioEtapa1 = () => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosViewFormularioEtapa1 = gerarEstilosViewFormularioEtapa1(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo.width,
    dimensoesDispositivo.height
  );

  const {
    control,
    handleSubmit,
    dadosDaPrimeiraEtapaDoFormularioEditar,
    ehEdicao,
    vaiParaSegundaEtapa,
    errors,
  } = UseViewControllerFormularioEtapa1();

  return (
    <SafeAreaView style={estilosViewFormularioEtapa1.tela}>
      <View style={estilosViewFormularioEtapa1.formulario}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo={"Nome do produto:"}
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.nomeProduto && (
                <Text
                  style={estilosViewFormularioEtapa1.formulario.mensagemErro}
                >
                  {errors.nomeProduto.message}
                </Text>
              )}
            </View>
          )}
          name="nomeProduto"
          rules={{ required: "O nome é obrigatório." }}
          defaultValue={
            ehEdicao ? dadosDaPrimeiraEtapaDoFormularioEditar.nomeProduto : ""
          }
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo={"Preço do produto:"}
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
                formatar={true}
              />
              {errors.precoProduto && (
                <Text
                  style={estilosViewFormularioEtapa1.formulario.mensagemErro}
                >
                  {errors.precoProduto.message}
                </Text>
              )}
            </View>
          )}
          name="precoProduto"
          rules={{ required: "O preço é obrigatório." }}
          defaultValue={
            ehEdicao
              ? dadosDaPrimeiraEtapaDoFormularioEditar.precoProduto
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                  .replace(",", ".")
              : ""
          }
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo={"Link da produto:"}
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.urlImagemProduto && (
                <Text
                  style={estilosViewFormularioEtapa1.formulario.mensagemErro}
                >
                  {errors.urlImagemProduto.message}
                </Text>
              )}
            </View>
          )}
          name="urlImagemProduto"
          rules={{ required: "O link é obrigatório." }}
          defaultValue={
            ehEdicao
              ? dadosDaPrimeiraEtapaDoFormularioEditar.urlImagemProduto
              : ""
          }
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTextoGrande
                titulo={"Descrição do produto:"}
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.descricaoProduto && (
                <Text
                  style={estilosViewFormularioEtapa1.formulario.mensagemErro}
                >
                  {errors.descricaoProduto.message}
                </Text>
              )}
            </View>
          )}
          name="descricaoProduto"
          rules={{ required: "A descrição é obrigatório." }}
          defaultValue={
            ehEdicao
              ? dadosDaPrimeiraEtapaDoFormularioEditar.descricaoProduto
              : ""
          }
        />
        <TouchableOpacity
          style={estilosViewFormularioEtapa1.estiloBotao}
          onPress={handleSubmit(vaiParaSegundaEtapa)}
        >
          <Text style={estilosViewFormularioEtapa1.estiloBotao.textoBotao}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const gerarEstilosViewFormularioEtapa1 = (
  tema,
  tamanhoFontes,
  larguraDaTela,
  alturaDaTela
) => {
  return StyleSheet.create({
    tela: {
      flex: 1,
      flexDirection: "column",
    },

    formulario: {
      flexGrow: 0.5,
      justifyContent: "space-evenly",

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
