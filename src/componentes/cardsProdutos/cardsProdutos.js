import React, { Fragment } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useDesign } from "../../hooks/useDesign";

export const CardsProdutos = ({
  imagem,
  nome,
  preco,
  aoSelecionar,
}) => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosCardsProdutos = gerarEstilosCardsProdutos(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <Fragment>
      <TouchableOpacity
        style={estilosCardsProdutos.blocoCard}
        onPress={aoSelecionar}
      >
        <View>
          <Image source={{ uri: imagem }} style={estilosCardsProdutos.imagem} />
        </View>

        <View style={estilosCardsProdutos.bloco}>
          <Text style={estilosCardsProdutos.bloco.nomeProduto}>{nome}</Text>

          <View style={estilosCardsProdutos.bloco.blocoInferior}>
            <Text style={estilosCardsProdutos.bloco.blocoInferior.precoProduto}>
              {preco
                ? `${preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}`.replace(".", ",")
                : null}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
};

const gerarEstilosCardsProdutos = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    blocoCard: {
      width: dimensoesDispositivo.width * 0.4,
      height: dimensoesDispositivo.height * 0.2,
      borderRadius: 12,
      backgroundColor: "#FFFFFF",
      shadowColor: "#000000",
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      justifyContent: "space-between",
      marginBottom: 10,
    },

    imagem: {
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
      width: "auto",
      resizeMode: "stretch",
      height: dimensoesDispositivo.height * 0.1,
    },

    bloco: {
      padding: 5,
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: 'center',

      nomeProduto: {
        color: paletaCores.marromTerciario,
        textAlign: "center",
        fontWeight: "bold",
      },

      blocoInferior: {
        flexDirection: "row",

        precoProduto: {
          fontSize: tamanhoFontes.tamanhoGrande,
          color: paletaCores.marromTerciario,
          fontWeight: "bold",
        },
      },
    },
  });
};
