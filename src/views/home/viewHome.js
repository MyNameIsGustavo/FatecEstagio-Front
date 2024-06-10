import React, { Fragment } from "react";
import { FlatList, StyleSheet, View, ScrollView } from "react-native";
import { TopoInformacao } from "../../componentes/topoInformacao/topoInformacao";
import { TituloSecao } from "../../componentes/tituloSecao/tituloSecao";
import { CardsProdutos } from "../../componentes/cardsProdutos/cardsProdutos";
import { useDesign } from "../../hooks/useDesign";
import { useViewControllerHome } from "./viewControllerHome";

export const ViewHome = () => {
  const viewControllerHome = useViewControllerHome();
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();

  const estilosViewHome = gerarEstilosViewHome(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <ScrollView
      style={estilosViewHome.container}
      showsHorizontalScrollIndicator={false}
    >
      <TopoInformacao
        titulo={"Hey, Native!"}
        subtitulo={"Qual o seu pedido hoje?"}
      />

      {viewControllerHome.cafes.jsx || (
        <Fragment>
          <TituloSecao
            nomeSecao={"Cafés."}
            aoClicar={() => viewControllerHome.vaiParaCatalogoCafe()}
          />
          <FlatList
            data={viewControllerHome.cafes.produtos}
            renderItem={({ item }) => (
              <View style={estilosViewHome.cardHorizontalContainer}>
                <CardsProdutos
                  preco={item.precoProduto}
                  imagem={item.urlImagemProduto}
                  nome={item.nomeProduto}
                  aoSelecionar={() =>
                    viewControllerHome.vaiParaDetalhaProduto(
                      item.chavePrimaria_idProduto
                    )
                  }
                />
              </View>
            )}
            keyExtractor={(item) => item.chavePrimaria_idProduto.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={estilosViewHome.listaHorizontalContainer}
          />
        </Fragment>
      )}

      {viewControllerHome.aperitivos.jsx || (
        <Fragment>
          <TituloSecao
            nomeSecao={"Aperitivos."}
            aoClicar={() => viewControllerHome.vaiParaCatalogoAperitivo()}
          />
          <View style={estilosViewHome.listaVerticalContainer}>
            {viewControllerHome.aperitivos?.produtos?.map((item) => (
              <View
                style={estilosViewHome.cardVerticalContainer}
                key={item.chavePrimaria_idProduto}
              >
                <CardsProdutos
                  preco={item.precoProduto}
                  imagem={item.urlImagemProduto}
                  nome={item.nomeProduto}
                  aoSelecionar={() =>
                    viewControllerHome.vaiParaDetalhaProduto(
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

const gerarEstilosViewHome = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    container: {
      flex: 1,
    },
    listaHorizontalContainer: {
      paddingHorizontal: 10,
      marginHorizontal: "auto",
    },
    cardHorizontalContainer: {
      flexDirection: "row",
      marginRight: 20,
      justifyContent: "space-around",
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