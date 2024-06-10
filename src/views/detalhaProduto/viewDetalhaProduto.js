import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useDesign } from "../../hooks/useDesign";
import { ListaSelecao } from "../../componentes/listaSelecao/listaSelecao";
import { EntradaDeSelecaoDeQuantidade } from "../../componentes/entradaDeSelecaoDeQuantidade/entradaDeSelecaoDeQuantidade";
import { useViewControllerDetalhaProduto } from "./viewControllerDetalhaProduto";

export const ViewDetalhaProduto = ({ route }) => {
  const { dadosProdutoSelecionado } = route.params;
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosViewDetalhaProduto = gerarEstilosViewDetalhaProduto(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );
  const viewControllerDetalhaProduto = useViewControllerDetalhaProduto();

  return (
    <ScrollView style={estilosViewDetalhaProduto.tela}>
      <Image
        source={{ uri: dadosProdutoSelecionado.urlImagemProduto }}
        style={estilosViewDetalhaProduto.imagem}
      />
      <View style={estilosViewDetalhaProduto.blocoInformacoes}>
        <View style={estilosViewDetalhaProduto.blocoNomeEPreco}>
          <Text style={estilosViewDetalhaProduto.textoEstilizado}>
            {dadosProdutoSelecionado.nomeProduto}
          </Text>
          <Text style={estilosViewDetalhaProduto.textoEstilizado}>
            {dadosProdutoSelecionado.precoProduto
              ? `${dadosProdutoSelecionado.precoProduto.toLocaleString(
                  "pt-BR",
                  {
                    style: "currency",
                    currency: "BRL",
                  }
                )}`.replace(".", ",")
              : null}
          </Text>
        </View>

        <View style={estilosViewDetalhaProduto.blocoInferior}>
          <Text style={estilosViewDetalhaProduto.textoEstilizado}>
            Descrição
          </Text>
          <Text style={estilosViewDetalhaProduto.descricaoTexto}>
            {dadosProdutoSelecionado.descricaoProduto}
          </Text>
        </View>

        <View style={estilosViewDetalhaProduto.blocoSeparador}>
          <ListaSelecao
            dados={[]}
            titulo={`Tamanho: ${dadosProdutoSelecionado.tamanhoProduto}`}
            desativado={true}
          />
        </View>

        <View style={estilosViewDetalhaProduto.blocoSeparador}>
          <EntradaDeSelecaoDeQuantidade
            tituloEntrada={`Quantidade: ${dadosProdutoSelecionado.quantidadeProduto}`}
            desativado={false}
          />
        </View>

        <View style={estilosViewDetalhaProduto.blocoSeparador}>
          <ListaSelecao
            dados={[]}
            titulo={`Tipo: ${dadosProdutoSelecionado.tipoProduto}`}
            desativado={true}
          />
        </View>

        <TouchableOpacity
          style={estilosViewDetalhaProduto.botao}
          onPress={() =>
            viewControllerDetalhaProduto.vaiParaFormularioParaEditar(
              dadosProdutoSelecionado
            )
          }
        >
          <Text style={estilosViewDetalhaProduto.botao.textoBotao}>
            Editar!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={estilosViewDetalhaProduto.botao}
          onPress={() =>
            viewControllerDetalhaProduto.deletaProduto(
              dadosProdutoSelecionado.chavePrimaria_idProduto
            )
          }
        >
          <Text style={estilosViewDetalhaProduto.botao.textoBotao}>
            Deletar!
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const gerarEstilosViewDetalhaProduto = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    tela: {
      flex: 1,
    },
    imagem: {
      width: "auto",
      height: dimensoesDispositivo.height * 0.25,
      resizeMode: "stretch",
    },

    blocoInformacoes: {
      flexGrow: 1,
      justifyContent: "space-between",
      paddingHorizontal: 10,
      paddingVertical: 10,
    },

    blocoSeparador: {
      margin: 7,
    },

    blocoNomeEPreco: {
      alignItems: "center",
    },

    textoEstilizado: {
      color: paletaCores.marromTerciario,
      fontWeight: "bold",
      fontSize: tamanhoFontes.tamanhoTitulo,
    },

    descricaoTexto: {
      textAlign: "justify",
      color: paletaCores.marromSecundario,
    },

    botao: {
      alignSelf: "center",
      width: dimensoesDispositivo.width * 0.8,
      height: dimensoesDispositivo.height * 0.07,
      borderRadius: 15,
      backgroundColor: paletaCores.marromSecundario,
      justifyContent: "center",
      alignItems: "center",
      margin: 10,
      textoBotao: {
        fontSize: tamanhoFontes.tamanhoGrande,
        color: paletaCores.corFontePrimaria,
      },
    },
  });
};
