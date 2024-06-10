import React, { useState, useRef } from "react";
import { useDesign } from "../../hooks/useDesign";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const EntradaDeSelecaoDeQuantidade = ({
  tituloEntrada,
  aoSelecionar,
  valor,
  desativado,
}) => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();

  const estilosEntradaDeSelecaoDeQuantidade =
    gerarEstilosEntradaDeSelecaoDeQuantidade(
      paletaCores,
      tamanhoFontes,
      dimensoesDispositivo
    );

  const [quantidadeSelecionada, setQuantidadeSelecionada] = useState(
    valor || 1
  );
  const quantidadeRef = useRef(null);

  const encrementaEntrada = () => {
    setQuantidadeSelecionada((prevQuantidade) => prevQuantidade + 1);
    aoSelecionar(quantidadeSelecionada + 1);
  };

  const decrementaEntrada = () => {
    if (quantidadeSelecionada > 1) {
      setQuantidadeSelecionada((prevQuantidade) => prevQuantidade - 1);
      aoSelecionar(quantidadeSelecionada - 1);
    }
  };

  return (
    <View style={estilosEntradaDeSelecaoDeQuantidade.blocoEntrada}>
      <Text style={estilosEntradaDeSelecaoDeQuantidade.tituloEntrada}>
        {tituloEntrada}
      </Text>

      <View style={estilosEntradaDeSelecaoDeQuantidade.blocoSelecao}>
        {desativado ? (
          <TouchableOpacity onPress={() => encrementaEntrada()}>
            <Text
              style={
                estilosEntradaDeSelecaoDeQuantidade.textoEstilizadoEntradaSelecao
              }
            >
              +
            </Text>
          </TouchableOpacity>
        ) : null}

        {desativado ? (
          <Text
            ref={quantidadeRef}
            style={
              estilosEntradaDeSelecaoDeQuantidade.textoEstilizadoEntradaSelecao
            }
          >
            {quantidadeSelecionada}
          </Text>
        ) : null}

        {desativado ? (
          <TouchableOpacity onPress={() => decrementaEntrada()}>
            <Text
              style={
                estilosEntradaDeSelecaoDeQuantidade.textoEstilizadoEntradaSelecao
              }
            >
              -
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const gerarEstilosEntradaDeSelecaoDeQuantidade = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    blocoEntrada: {
      height: dimensoesDispositivo.height * 0.08,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      shadowColor: "#000000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3,
      elevation: 5,
      alignItems: "center",
      flexDirection: "row",
    },

    tituloEntrada: {
      fontSize: tamanhoFontes.tamanhoPadrao,
      color: paletaCores.marromTerciario,
      fontWeight: "bold",
    },

    blocoSelecao: {
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      flex: 0.3,
      height: "auto",
    },

    textoEstilizadoEntradaSelecao: {
      fontSize: tamanhoFontes.tamanhoTitulo,
      color: paletaCores.marromTerciario,
      fontWeight: "bold",
    },
  });
};
