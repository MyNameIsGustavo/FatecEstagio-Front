import React from "react";
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
import { useViewControllerLogin } from "./viewControllerLogin";
import { Controller } from "react-hook-form";

export const ViewLogin = () => {
  const { vaiParaCadastro, realizaLogin, control, handleSubmit, errors } =
    useViewControllerLogin();
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosViewLogin = gerarEstilosViewLogin(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo.width || 1,
    dimensoesDispositivo.height || 1
  );

  return (
    <SafeAreaView style={estilosViewLogin.tela}>
      <StatusBar
        backgroundColor={paletaCores.marromPrimario}
        barStyle={"dark-content"}
      />

      <View style={estilosViewLogin.blocoSuperior}>
        <Text style={estilosViewLogin.blocoSuperior.titulo}>Native Coffe.</Text>
      </View>

      <View style={estilosViewLogin.blocoMediano}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo={"Informe o E-mail: "}
                estado={value}
                setEstado={(texto) => {
                  onChange(texto);
                }}
              />
              {errors.emailUsuario && (
                <Text style={estilosViewLogin.blocoMediano.mensagemErro}>
                  {errors.emailUsuario.message}
                </Text>
              )}
            </View>
          )}
          name="emailUsuario"
          rules={{ required: "O e-mail é obrigatório!" }}
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <View>
              <EntradaDeTexto
                titulo={"Informe a senha: "}
                estado={value}
                setEstado={(texto) => {
                  onChange(texto);
                }}
                ehSenha={true}
              />
              {errors.senhaUsuario && (
                <Text style={estilosViewLogin.blocoMediano.mensagemErro}>
                  {errors.senhaUsuario.message}
                </Text>
              )}
            </View>
          )}
          name="senhaUsuario"
          rules={{ required: "A senha é obrigatório!" }}
          defaultValue=""
        />
      </View>

      <View style={estilosViewLogin.blocoInferior}>
        <TouchableOpacity
          onPress={handleSubmit(realizaLogin)}
          style={estilosViewLogin.blocoInferior.estiloBotao}
        >
          <Text style={estilosViewLogin.blocoInferior.estiloBotao.textoBotao}>
            Entrar!
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => vaiParaCadastro()}>
          <Text style={estilosViewLogin.blocoInferior.textoLink}>
            Não tem conta? Cadastre-se
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const gerarEstilosViewLogin = (
  tema,
  tamanhoFontes,
  larguraDaTela,
  alturaDaTela
) => {
  return StyleSheet.create({
    tela: {
      backgroundColor: tema.marromPrimario,
      flex: 1,
      flexDirection: "column",
    },

    blocoSuperior: {
      flex: 0.25,
      justifyContent: "flex-end",
      alignItems: "center",

      titulo: {
        color: tema.corFontePrimaria,
        fontSize: tamanhoFontes.tituloHome,
        textAlign: "center",
      },
    },



    blocoMediano: {
      flex: 0.5,
      justifyContent: "center",

      mensagemErro: {
        fontSize: tamanhoFontes.tamanhoPequeno,
        color: "#eb3d34",
        fontWeight: "bold",
        textAlign: "center",
      },
    },

    blocoInferior: {
      flex: 0.25,
      justifyContent: "center",
      alignItems: "center",

      estiloBotao: {
        width: larguraDaTela * 0.8,
        height: alturaDaTela * 0.07,
        borderRadius: 15,
        backgroundColor: tema.marromSecundario,
        justifyContent: "center",
        alignItems: "center",

        textoBotao: {
          fontSize: tamanhoFontes.tamanhoGrande,
          color: tema.corFontePrimaria,
        },
      },

      textoLink: {
        color: tema.corFontePrimaria,
      },
    },
  });
};
