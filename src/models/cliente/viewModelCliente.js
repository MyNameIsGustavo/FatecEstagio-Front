import { Cliente } from "./modelCliente";

export class ClienteViewModel {
  constructor() {
    this.cliente = new Cliente();
  }

  cadastrarNovoUsuario(dadosFormularioCadastro) {
    return this.cliente.cadastrarNovoUsuario(dadosFormularioCadastro);
  }

  realizaLogin(dadosFormularioLogin) {
    return this.cliente.realizaLogin(dadosFormularioLogin);
  }

  pegarInformacoesUsuario(tokenJWT){
    return this.cliente.pegarInformacoesUsuario(tokenJWT);
  }

}
