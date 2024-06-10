import React from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDesign } from "../../hooks/useDesign";
export const ModalAlert = ({
  estado = false,
  setAtivoModal,
  texto,
  textoDeFechamento,
}) => {
  const { paletaCores, tamanhoFontes, dimensoesDispositivo } = useDesign();
  const estilosModalAlert = gerarEstilosModalAlert(
    paletaCores,
    tamanhoFontes,
    dimensoesDispositivo
  );

  return (
    <View style={estilosModalAlert.tela}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={estado}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setAtivoModal(!estado);
        }}
      >
        <View style={estilosModalAlert.tela}>
          <View style={estilosModalAlert.janelaModal}>
            <Text style={estilosModalAlert.textoModal}>{texto}</Text>
            <TouchableOpacity
              style={[
                estilosModalAlert.botao,
                estilosModalAlert.botaoFechamento,
              ]}
              onPress={() => setAtivoModal(!estado)}
            >
              <Text style={estilosModalAlert.estiloTexto}>
                {textoDeFechamento}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const gerarEstilosModalAlert = (
  paletaCores,
  tamanhoFontes,
  dimensoesDispositivo
) => {
  return StyleSheet.create({
    tela: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    janelaModal: {
      flex: 0.15,
      justifyContent: "space-between",
      backgroundColor: paletaCores.corFontePrimaria,
      borderRadius: 14,
      padding: 35,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      width: dimensoesDispositivo.width * 0.9,
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    botao: {
      borderRadius: 10,
      padding: 10,
      elevation: 2,
    },
    botaoFechamento: {
      backgroundColor: paletaCores.marromTerciario,
    },
    estiloTexto: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    textoModal: {
      fontSize: tamanhoFontes.tamanhoPequeno,
      marginBottom: 15,
      textAlign: "center",
      color: paletaCores.marromTerciario,
      fontWeight: "bold",
    },
  });
};
