import { api } from "../../services/api";

export class Produto {
  async cadastrarNovoProduto(tokenJWT, dadosFormularioProduto) {
    try {
      await api.post("nativeCoffe/produto", dadosFormularioProduto, {
        headers: { Authorization: `Bearer ${tokenJWT}` },
      });
      return true;
    } catch (error) {
      console.log("Erro ao cadastrar produto: ", JSON.stringify(error));
      return false;
    }
  }

  async deletarProduto(tokenJWT, idProduto) {
    try {
      await api.delete(`/nativeCoffe/produto/${idProduto}`, {
        headers: { Authorization: `Bearer ${tokenJWT}` },
      });

      return true;
    } catch (error) {
      console.log("Erro ao deletar produto: ", JSON.stringify(error));
      return false;
    }
  }

  async editarProduto(tokenJWT, idProduto, informacoesProduto) {
    try {
      await api.put(`/nativeCoffe/produto/${idProduto}`, informacoesProduto, {
        headers: { Authorization: `Bearer ${tokenJWT}` },
      });

      return true;
    } catch (error) {
      console.log("Erro ao editar produto: ", JSON.stringify(error));
      return false;
    }
  }

  async listarProdutoPeloID(tokenJWT, idProduto) {
    try {
      const produtoSelecionado = await api.get(`/nativeCoffe/produto/${idProduto}`, {
        headers: { Authorization: `Bearer ${tokenJWT}` },
      });

      return produtoSelecionado.data;
    } catch (error) {
      console.log("Erro ao listar produto pelo ID: ", JSON.stringify(error));
      return false;
    }
  }

  async listarProduto(tokenJWT, tipoProduto) {
    try {
      const produtos = await api.get(`/nativeCoffe/produto?tipo=${tipoProduto}`, {
        headers: { Authorization: `Bearer ${tokenJWT}` },
      });

      return produtos.data;
    } catch (error) {
      console.log("Erro ao listar produto: ", JSON.stringify(error));
      return false;
    }
  }
}
