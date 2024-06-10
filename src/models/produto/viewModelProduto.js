import { View, Image } from "react-native";
import { Produto } from "./modelProduto";
import { TituloSecao } from "../../componentes/tituloSecao/tituloSecao";
import { Dimensions } from "react-native";
import imagemCafes from "../../assets/imagemCafes.png";
import imagemAperitivos from "../../assets/imagemAperitivos.png";

export class ProdutoViewModel {
  constructor() {
    this.produto = new Produto();
  }

  async listarProduto(tokenJWT, tipoProduto) {
    const produtos = await this.produto.listarProduto(tokenJWT, tipoProduto);

    if (produtos.length === 0) {
      let jsx;
      if (tipoProduto === "CAFE") {
        jsx = (
          <View>
            <TituloSecao nomeSecao={"Cadastre cafés."} exibeLink={false} />
            <View style={{ alignItems: "center" }}>
              <Image
                source={imagemCafes}
                style={{
                  width: Dimensions.get("window").width * 0.5,
                  height: Dimensions.get("window").height * 0.3,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        );
      } else if (tipoProduto === "APERITIVO") {
        jsx = (
          <View>
            <TituloSecao nomeSecao={"Cadastre aperitivos."} exibeLink={false} />
            <View style={{ alignItems: "center" }}>
              <Image
                source={imagemAperitivos}
                style={{
                  width: Dimensions.get("window").width * 0.5,
                  height: Dimensions.get("window").height * 0.3,
                }}
                resizeMode="contain"
              />
            </View>
          </View>
        );
      }

      return {
        jsx: jsx,
        produtos: [],
      };
    } else {
      return {
        jsx: null,
        produtos: produtos,
      };
    }
  }

  async cadastrarNovoProduto(tokenJWT, dadosFormularioProduto) {
    return await this.produto.cadastrarNovoProduto(
      tokenJWT,
      dadosFormularioProduto
    );
  }

  async deletarProduto(tokenJWT, idProduto) {
    return await this.produto.deletarProduto(tokenJWT, idProduto);
  }

  async editarProduto(tokenJWT, idProduto, informacoesProduto) {
    return await this.produto.editarProduto(
      tokenJWT,
      idProduto,
      informacoesProduto
    );
  }

  async listarProdutoPeloID(tokenJWT, idProduto) {
    return await this.produto.listarProdutoPeloID(tokenJWT, idProduto);
  }
}
