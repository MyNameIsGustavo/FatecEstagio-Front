import { api } from "../../services/api";

export class Cliente {
  async cadastrarNovoUsuario(dadosFormularioCadastro) {
    try {
      await api.post("/nativeCoffe/usuario", dadosFormularioCadastro);

      return true;
    } catch (error) {
      console.log("Algo deu errado ao se cadastrar: ", JSON.stringify(error));
      return false;
    }
  }

  async realizaLogin(dadosFormularioLogin) {
    try {
      const token = await api.post("/nativeCoffe/login", dadosFormularioLogin);
      if (!token) return null;

      return token.data;
    } catch (error) {
      console.log("Erro ao realizar login", JSON.stringify(error));
      return false;
    }
  }

  async pegarInformacoesUsuario(tokenJWT) {
    try {
      const informacoes = await api.get("/nativeCoffe/usuario", {
        headers: {
          Authorization: `Bearer ${tokenJWT}`,
        },
      });

      return informacoes.data;
    } catch (error) {
      console.log(
        "Erro ao capturar informações do usuario",
        JSON.stringify(error)
      );
      return false;
    }
  }
}
