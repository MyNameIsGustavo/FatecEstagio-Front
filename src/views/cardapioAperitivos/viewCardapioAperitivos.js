import React, { Fragment } from "react";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { TopoInformacao } from "../../componentes/topoInformacao/topoInformacao";
import { TituloSecao } from "../../componentes/tituloSecao/tituloSecao";
import { CardsProdutos } from "../../componentes/cardsProdutos/cardsProdutos";
import { UseViewControllerCardapioAperitivos } from "./viewControllerCardapioAperitivos";

export const ViewCardapioAperitivos = () => {
  const estilosViewCardapioAperitivos = gerarEstilosViewCardapioAperitivos();
  const viewControllerAperitivos = UseViewControllerCardapioAperitivos();

  return (
    <SafeAreaView>
      <TopoInformacao
        titulo={"Nossas guloseimas."}
        subtitulo={"Preparados com carinho!"}
      />

      {viewControllerAperitivos.aperitivos.jsx || (
        <Fragment>
          <TituloSecao nomeSecao={"Cardapio."} exibeLink={false} />
          <View style={estilosViewCardapioAperitivos.listaVerticalContainer}>
            {viewControllerAperitivos.aperitivos?.produtos?.map((item) => (
              <View
                style={estilosViewCardapioAperitivos.cardVerticalContainer}
                key={item.chavePrimaria_idProduto}
              >
                <CardsProdutos
                  nome={item.nomeProduto}
                  preco={item.precoProduto}
                  imagem={item.urlImagemProduto}
                  aoSelecionar={() =>
                    viewControllerAperitivos.vaiParaDetalhaProdutoAperitivo(
                      item.chavePrimaria_idProduto
                    )
                  }
                />
              </View>
            ))}
          </View>
        </Fragment>
      )}
    </SafeAreaView>
  );
};

const gerarEstilosViewCardapioAperitivos = () => {
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
