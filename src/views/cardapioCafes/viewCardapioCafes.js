import React, { Fragment } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TopoInformacao } from "../../componentes/topoInformacao/topoInformacao";
import { useDesign } from "../../hooks/useDesign";
import { CardsProdutos } from "../../componentes/cardsProdutos/cardsProdutos";
import { TituloSecao } from "../../componentes/tituloSecao/tituloSecao";
import { UseViewControllerCardapioCafes } from "./viewControllerCardapioCafes";

export const ViewCardapioCafes = () => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const viewControllerCafes = UseViewControllerCardapioCafes();
  const estilosViewCardapioCafes = gerarEstilosViewCardapioCafes(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <ScrollView style={estilosViewCardapioCafes.tela}>
      <TopoInformacao
        titulo={"Nossos cafés."}
        subtitulo={"Cafés de todos os tipos."}
      />

      {viewControllerCafes.cafes.jsx || (
        <Fragment>
          <TituloSecao nomeSecao={"Cardapio."} exibeLink={false} />
          <View style={estilosViewCardapioCafes.listaVerticalContainer}>
            {viewControllerCafes.cafes?.produtos?.map((item) => (
              <View
                style={estilosViewCardapioCafes.cardVerticalContainer}
                key={item.chavePrimaria_idProduto}
              >
                <CardsProdutos
                  nome={item.nomeProduto}
                  preco={item.precoProduto}
                  imagem={item.urlImagemProduto}
                  aoSelecionar={() =>
                    viewControllerCafes.vaiParaDetalhaProdutoCafe(
                      item.chavePrimaria_idProduto
                    )
                  }
                />
              </View>
            ))}
          </View>
        </Fragment>
      )}
    </ScrollView>
  );
};

const gerarEstilosViewCardapioCafes = () => {
  return StyleSheet.create({
    tela: {
      flex: 1,
    },

    listaVerticalContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    },

    cardVerticalContainer: {
      margin: 10,
      justifyContent: "space-between",
    },
  });
};
