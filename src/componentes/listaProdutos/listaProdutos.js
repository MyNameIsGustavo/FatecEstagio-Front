import React from "react";
import { CardsProdutos } from "../cardsProdutos/cardsProdutos";
import { View, Text, FlatList } from "react-native";

export const ListaProdutos = ({ dadosLista }) => {
  return (
    <FlatList data={dadosLista} renderItem={({ item }) => <CardsProdutos imagem={item.imagem} preco={item.preco}/>} />
  );
};
