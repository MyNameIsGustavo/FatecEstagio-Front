import axios from "axios";

export const api = axios.create({
    /* Digite aqui o seu endereço de IPv4. O caminho é: src/services/api.js */
    baseURL: "http://192.168.0.105:3000/"
})