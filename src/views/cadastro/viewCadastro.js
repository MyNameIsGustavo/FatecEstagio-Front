import React, { Fragment } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { EntradaDeTexto } from "../../componentes/entradaDeTexto/entradaDeTexto";
import { useDesign } from "../../hooks/useDesign";
import { useViewControllerCadastro } from "./viewControllerCadastro";
import { Controller } from "react-hook-form";

export const ViewCadastro = () => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const { cadastrarNovoUsuario, control, handleSubmit, errors } =
    useViewControllerCadastro();

  const estilosViewCadastro = gerarEstilosViewCadastro(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo.width || 1,
    dimensoesDispositivo.height || 1
  );

  return (
    <SafeAreaView style={estilosViewCadastro.tela}>
      <StatusBar
        backgroundColor={paletaCores.marromPrimario}
        barStyle={"dark-content"}
      />

      <View style={estilosViewCadastro.formulario}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Fragment>
              <EntradaDeTexto
                titulo="Informe o seu nome: "
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.nomeUsuario && (
                <Text style={estilosViewCadastro.formulario.mensagemErro}>
                  {errors.nomeUsuario.message}
                </Text>
              )}
            </Fragment>
          )}
          name="nomeUsuario"
          rules={{ required: "O nome é obrigatório!" }}
          defaultValue={""}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Fragment>
              <EntradaDeTexto
                titulo="Informe o seu sobrenome: "
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.sobrenomeUsuario && (
                <Text style={estilosViewCadastro.formulario.mensagemErro}>
                  {errors.sobrenomeUsuario.message}
                </Text>
              )}
            </Fragment>
          )}
          name="sobrenomeUsuario"
          rules={{ required: "O sobrenome é obrigatório!" }}
          defaultValue={""}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Fragment>
              <EntradaDeTexto
                titulo="Informe o seu e-mail: "
                estado={value}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.emailUsuario && (
                <Text style={estilosViewCadastro.formulario.mensagemErro}>
                  {errors.emailUsuario.message}
                </Text>
              )}
            </Fragment>
          )}
          name="emailUsuario"
          rules={{ required: "O e-mail é obrigatório!" }}
          defaultValue={""}
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo="Crie a sua senha: "
                estado={value}
                ehSenha={true}
                setEstado={(text) => {
                  onChange(text);
                }}
              />
              {errors.senhaUsuario && (
                <Text style={estilosViewCadastro.formulario.mensagemErro}>
                  {errors.senhaUsuario.message}
                </Text>
              )}
            </View>
          )}
          name="senhaUsuario"
          rules={{ required: "A senha é obrigatório!" }}
          defaultValue={""}
        />

        <TouchableOpacity
          style={estilosViewCadastro.formulario.estiloBotao}
          onPress={handleSubmit(cadastrarNovoUsuario)}
        >
          <Text style={estilosViewCadastro.formulario.estiloBotao.textoBotao}>
            Criar conta!
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const gerarEstilosViewCadastro = (
  paletaCores,
  tamanhoFontes,
  larguraDaTela,
  alturaDaTela
) => {
  return StyleSheet.create({
    tela: {
      flex: 1,
      flexDirection: "column",
    },

    formulario: {
      flexGrow: 0.5,
      justifyContent: "space-evenly",

      estiloBotao: {
        alignSelf: "center",
        width: larguraDaTela * 0.8,
        height: alturaDaTela * 0.07,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        borderColor: paletaCores.marromSecundario,
        borderWidth: 1,
        backgroundColor: paletaCores.marromPrimario,

        textoBotao: {
          fontSize: tamanhoFontes.tamanhoPadrao,
          color: paletaCores.corFontePrimaria,
        },
      },

      mensagemErro: {
        fontSize: tamanhoFontes.tamanhoPequeno,
        color: "#eb3d34",
        fontWeight: "bold",
        textAlign: "center",
      },
    },
  });
};
