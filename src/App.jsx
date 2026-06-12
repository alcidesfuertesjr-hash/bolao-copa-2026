import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

/* ===================== CONFIG FIREBASE ===================== */
// Substitua pelos valores do seu projeto Firebase (Console > Configurações do projeto)
const firebaseConfig = {
  apiKey: "AIzaSyBlaAXMNgz1U6uVgARw70kGkqwZE5Qop8g",
  authDomain: "bolao-da-copa-2026-a405a.firebaseapp.com",
  projectId: "bolao-da-copa-2026-a405a",
  storageBucket: "bolao-da-copa-2026-a405a.firebasestorage.app",
  messagingSenderId: "403948561082",
  appId: "1:403948561082:web:21d56d4c250221c0119883",
  measurementId: "G-1FSKVPXTHB"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const DOC_REF = doc(db, 'bolao', 'copa2026-v1');

/* ===================== DADOS INICIAIS ===================== */
const JOGOS_INICIAIS = [{"id": 1, "fase": "grupos", "grupo": "A", "rodada": 1, "dataJogo": "2026-06-11T16:00:00", "timeA": "México", "timeB": "África do Sul", "ccA": "mx", "ccB": "za", "cidade": "Cidade do México", "placarOficialA": 2, "placarOficialB": 0}, {"id": 2, "fase": "grupos", "grupo": "D", "rodada": 1, "dataJogo": "2026-06-11T23:00:00", "timeA": "Coreia do Sul", "timeB": "República Tcheca", "ccA": "kr", "ccB": "cz", "cidade": "Guadalajara", "placarOficialA": 2, "placarOficialB": 1}, {"id": 3, "fase": "grupos", "grupo": "B", "rodada": 1, "dataJogo": "2026-06-12T16:00:00", "timeA": "Canadá", "timeB": "Bósnia e Herzegovina", "ccA": "ca", "ccB": "ba", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 4, "fase": "grupos", "grupo": "D", "rodada": 1, "dataJogo": "2026-06-12T22:00:00", "timeA": "Estados Unidos", "timeB": "Paraguai", "ccA": "us", "ccB": "py", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 5, "fase": "grupos", "grupo": "D", "rodada": 1, "dataJogo": "2026-06-13T01:00:00", "timeA": "Austrália", "timeB": "Turquia", "ccA": "au", "ccB": "tr", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 6, "fase": "grupos", "grupo": "B", "rodada": 1, "dataJogo": "2026-06-13T16:00:00", "timeA": "Catar", "timeB": "Suíça", "ccA": "qa", "ccB": "ch", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 7, "fase": "grupos", "grupo": "C", "rodada": 1, "dataJogo": "2026-06-13T19:00:00", "timeA": "Brasil", "timeB": "Marrocos", "ccA": "br", "ccB": "ma", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 8, "fase": "grupos", "grupo": "C", "rodada": 1, "dataJogo": "2026-06-13T22:00:00", "timeA": "Haiti", "timeB": "Escócia", "ccA": "ht", "ccB": "gb-sct", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 9, "fase": "grupos", "grupo": "E", "rodada": 1, "dataJogo": "2026-06-14T14:00:00", "timeA": "Alemanha", "timeB": "Curaçao", "ccA": "de", "ccB": "cw", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 10, "fase": "grupos", "grupo": "F", "rodada": 1, "dataJogo": "2026-06-14T17:00:00", "timeA": "Holanda", "timeB": "Japão", "ccA": "nl", "ccB": "jp", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 11, "fase": "grupos", "grupo": "E", "rodada": 1, "dataJogo": "2026-06-14T20:00:00", "timeA": "Costa do Marfim", "timeB": "Equador", "ccA": "ci", "ccB": "ec", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 12, "fase": "grupos", "grupo": "F", "rodada": 1, "dataJogo": "2026-06-14T23:00:00", "timeA": "Suécia", "timeB": "Tunísia", "ccA": "se", "ccB": "tn", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 13, "fase": "grupos", "grupo": "H", "rodada": 1, "dataJogo": "2026-06-15T13:00:00", "timeA": "Espanha", "timeB": "Cabo Verde", "ccA": "es", "ccB": "cv", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 14, "fase": "grupos", "grupo": "G", "rodada": 1, "dataJogo": "2026-06-15T16:00:00", "timeA": "Bélgica", "timeB": "Egito", "ccA": "be", "ccB": "eg", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 15, "fase": "grupos", "grupo": "H", "rodada": 1, "dataJogo": "2026-06-15T19:00:00", "timeA": "Arábia Saudita", "timeB": "Uruguai", "ccA": "sa", "ccB": "uy", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 16, "fase": "grupos", "grupo": "G", "rodada": 1, "dataJogo": "2026-06-15T22:00:00", "timeA": "Irã", "timeB": "Nova Zelândia", "ccA": "ir", "ccB": "nz", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 17, "fase": "grupos", "grupo": "J", "rodada": 1, "dataJogo": "2026-06-16T14:00:00", "timeA": "Argentina", "timeB": "Argélia", "ccA": "ar", "ccB": "dz", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 18, "fase": "grupos", "grupo": "I", "rodada": 1, "dataJogo": "2026-06-16T16:00:00", "timeA": "França", "timeB": "Senegal", "ccA": "fr", "ccB": "sn", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 19, "fase": "grupos", "grupo": "I", "rodada": 1, "dataJogo": "2026-06-16T19:00:00", "timeA": "Iraque", "timeB": "Noruega", "ccA": "iq", "ccB": "no", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 20, "fase": "grupos", "grupo": "J", "rodada": 1, "dataJogo": "2026-06-17T01:00:00", "timeA": "Áustria", "timeB": "Jordânia", "ccA": "at", "ccB": "jo", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 21, "fase": "grupos", "grupo": "K", "rodada": 1, "dataJogo": "2026-06-17T14:00:00", "timeA": "Portugal", "timeB": "RD Congo", "ccA": "pt", "ccB": "cd", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 22, "fase": "grupos", "grupo": "L", "rodada": 1, "dataJogo": "2026-06-17T17:00:00", "timeA": "Inglaterra", "timeB": "Croácia", "ccA": "gb-eng", "ccB": "hr", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 23, "fase": "grupos", "grupo": "L", "rodada": 1, "dataJogo": "2026-06-17T20:00:00", "timeA": "Gana", "timeB": "Panamá", "ccA": "gh", "ccB": "pa", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 24, "fase": "grupos", "grupo": "K", "rodada": 1, "dataJogo": "2026-06-17T23:00:00", "timeA": "Uzbequistão", "timeB": "Colômbia", "ccA": "uz", "ccB": "co", "cidade": "Cidade do México", "placarOficialA": null, "placarOficialB": null}, {"id": 25, "fase": "grupos", "grupo": "A", "rodada": 2, "dataJogo": "2026-06-18T13:00:00", "timeA": "República Tcheca", "timeB": "África do Sul", "ccA": "cz", "ccB": "za", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 26, "fase": "grupos", "grupo": "B", "rodada": 2, "dataJogo": "2026-06-18T16:00:00", "timeA": "Suíça", "timeB": "Bósnia e Herzegovina", "ccA": "ch", "ccB": "ba", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 27, "fase": "grupos", "grupo": "B", "rodada": 2, "dataJogo": "2026-06-18T19:00:00", "timeA": "Canadá", "timeB": "Catar", "ccA": "ca", "ccB": "qa", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 28, "fase": "grupos", "grupo": "A", "rodada": 2, "dataJogo": "2026-06-18T22:00:00", "timeA": "México", "timeB": "Coreia do Sul", "ccA": "mx", "ccB": "kr", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 29, "fase": "grupos", "grupo": "D", "rodada": 2, "dataJogo": "2026-06-19T01:00:00", "timeA": "Turquia", "timeB": "Paraguai", "ccA": "tr", "ccB": "py", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 30, "fase": "grupos", "grupo": "D", "rodada": 2, "dataJogo": "2026-06-19T16:00:00", "timeA": "Estados Unidos", "timeB": "Austrália", "ccA": "us", "ccB": "au", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 31, "fase": "grupos", "grupo": "C", "rodada": 2, "dataJogo": "2026-06-19T19:00:00", "timeA": "Escócia", "timeB": "Marrocos", "ccA": "gb-sct", "ccB": "ma", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 32, "fase": "grupos", "grupo": "C", "rodada": 2, "dataJogo": "2026-06-19T22:00:00", "timeA": "Brasil", "timeB": "Haiti", "ccA": "br", "ccB": "ht", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 33, "fase": "grupos", "grupo": "F", "rodada": 2, "dataJogo": "2026-06-20T14:00:00", "timeA": "Holanda", "timeB": "Suécia", "ccA": "nl", "ccB": "se", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 34, "fase": "grupos", "grupo": "E", "rodada": 2, "dataJogo": "2026-06-20T17:00:00", "timeA": "Alemanha", "timeB": "Costa do Marfim", "ccA": "de", "ccB": "ci", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 35, "fase": "grupos", "grupo": "E", "rodada": 2, "dataJogo": "2026-06-20T21:00:00", "timeA": "Equador", "timeB": "Curaçao", "ccA": "ec", "ccB": "cw", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 36, "fase": "grupos", "grupo": "F", "rodada": 2, "dataJogo": "2026-06-21T01:00:00", "timeA": "Tunísia", "timeB": "Japão", "ccA": "tn", "ccB": "jp", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 37, "fase": "grupos", "grupo": "H", "rodada": 2, "dataJogo": "2026-06-21T13:00:00", "timeA": "Espanha", "timeB": "Arábia Saudita", "ccA": "es", "ccB": "sa", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 38, "fase": "grupos", "grupo": "G", "rodada": 2, "dataJogo": "2026-06-21T16:00:00", "timeA": "Bélgica", "timeB": "Irã", "ccA": "be", "ccB": "ir", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 39, "fase": "grupos", "grupo": "H", "rodada": 2, "dataJogo": "2026-06-21T19:00:00", "timeA": "Uruguai", "timeB": "Cabo Verde", "ccA": "uy", "ccB": "cv", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 40, "fase": "grupos", "grupo": "G", "rodada": 2, "dataJogo": "2026-06-21T22:00:00", "timeA": "Nova Zelândia", "timeB": "Egito", "ccA": "nz", "ccB": "eg", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 41, "fase": "grupos", "grupo": "J", "rodada": 2, "dataJogo": "2026-06-22T14:00:00", "timeA": "Argentina", "timeB": "Áustria", "ccA": "ar", "ccB": "at", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 42, "fase": "grupos", "grupo": "I", "rodada": 2, "dataJogo": "2026-06-22T18:00:00", "timeA": "França", "timeB": "Iraque", "ccA": "fr", "ccB": "iq", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 43, "fase": "grupos", "grupo": "I", "rodada": 2, "dataJogo": "2026-06-22T21:00:00", "timeA": "Noruega", "timeB": "Senegal", "ccA": "no", "ccB": "sn", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 44, "fase": "grupos", "grupo": "J", "rodada": 2, "dataJogo": "2026-06-23T00:00:00", "timeA": "Jordânia", "timeB": "Argélia", "ccA": "jo", "ccB": "dz", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 45, "fase": "grupos", "grupo": "K", "rodada": 2, "dataJogo": "2026-06-23T14:00:00", "timeA": "Portugal", "timeB": "Uzbequistão", "ccA": "pt", "ccB": "uz", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 46, "fase": "grupos", "grupo": "L", "rodada": 2, "dataJogo": "2026-06-23T17:00:00", "timeA": "Inglaterra", "timeB": "Gana", "ccA": "gb-eng", "ccB": "gh", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 47, "fase": "grupos", "grupo": "L", "rodada": 2, "dataJogo": "2026-06-23T20:00:00", "timeA": "Panamá", "timeB": "Croácia", "ccA": "pa", "ccB": "hr", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 48, "fase": "grupos", "grupo": "K", "rodada": 2, "dataJogo": "2026-06-23T23:00:00", "timeA": "Colômbia", "timeB": "RD Congo", "ccA": "co", "ccB": "cd", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 49, "fase": "grupos", "grupo": "B", "rodada": 3, "dataJogo": "2026-06-24T16:00:00", "timeA": "Suíça", "timeB": "Canadá", "ccA": "ch", "ccB": "ca", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 50, "fase": "grupos", "grupo": "B", "rodada": 3, "dataJogo": "2026-06-24T16:00:00", "timeA": "Bósnia e Herzegovina", "timeB": "Catar", "ccA": "ba", "ccB": "qa", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 51, "fase": "grupos", "grupo": "C", "rodada": 3, "dataJogo": "2026-06-24T19:00:00", "timeA": "Escócia", "timeB": "Brasil", "ccA": "gb-sct", "ccB": "br", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 52, "fase": "grupos", "grupo": "C", "rodada": 3, "dataJogo": "2026-06-24T19:00:00", "timeA": "Marrocos", "timeB": "Haiti", "ccA": "ma", "ccB": "ht", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 53, "fase": "grupos", "grupo": "A", "rodada": 3, "dataJogo": "2026-06-24T22:00:00", "timeA": "República Tcheca", "timeB": "México", "ccA": "cz", "ccB": "mx", "cidade": "Cidade do México", "placarOficialA": null, "placarOficialB": null}, {"id": 54, "fase": "grupos", "grupo": "A", "rodada": 3, "dataJogo": "2026-06-24T22:00:00", "timeA": "África do Sul", "timeB": "Coreia do Sul", "ccA": "za", "ccB": "kr", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 55, "fase": "grupos", "grupo": "E", "rodada": 3, "dataJogo": "2026-06-25T17:00:00", "timeA": "Equador", "timeB": "Alemanha", "ccA": "ec", "ccB": "de", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 56, "fase": "grupos", "grupo": "E", "rodada": 3, "dataJogo": "2026-06-25T17:00:00", "timeA": "Curaçao", "timeB": "Costa do Marfim", "ccA": "cw", "ccB": "ci", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 57, "fase": "grupos", "grupo": "F", "rodada": 3, "dataJogo": "2026-06-25T20:00:00", "timeA": "Japão", "timeB": "Suécia", "ccA": "jp", "ccB": "se", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 58, "fase": "grupos", "grupo": "F", "rodada": 3, "dataJogo": "2026-06-25T20:00:00", "timeA": "Tunísia", "timeB": "Holanda", "ccA": "tn", "ccB": "nl", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 59, "fase": "grupos", "grupo": "D", "rodada": 3, "dataJogo": "2026-06-25T23:00:00", "timeA": "Turquia", "timeB": "Estados Unidos", "ccA": "tr", "ccB": "us", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 60, "fase": "grupos", "grupo": "D", "rodada": 3, "dataJogo": "2026-06-25T23:00:00", "timeA": "Paraguai", "timeB": "Austrália", "ccA": "py", "ccB": "au", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 61, "fase": "grupos", "grupo": "I", "rodada": 3, "dataJogo": "2026-06-26T16:00:00", "timeA": "Noruega", "timeB": "França", "ccA": "no", "ccB": "fr", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 62, "fase": "grupos", "grupo": "I", "rodada": 3, "dataJogo": "2026-06-26T16:00:00", "timeA": "Senegal", "timeB": "Iraque", "ccA": "sn", "ccB": "iq", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 63, "fase": "grupos", "grupo": "H", "rodada": 3, "dataJogo": "2026-06-26T21:00:00", "timeA": "Cabo Verde", "timeB": "Arábia Saudita", "ccA": "cv", "ccB": "sa", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 64, "fase": "grupos", "grupo": "H", "rodada": 3, "dataJogo": "2026-06-26T21:00:00", "timeA": "Uruguai", "timeB": "Espanha", "ccA": "uy", "ccB": "es", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 65, "fase": "grupos", "grupo": "G", "rodada": 3, "dataJogo": "2026-06-27T00:00:00", "timeA": "Egito", "timeB": "Irã", "ccA": "eg", "ccB": "ir", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 66, "fase": "grupos", "grupo": "G", "rodada": 3, "dataJogo": "2026-06-27T00:00:00", "timeA": "Nova Zelândia", "timeB": "Bélgica", "ccA": "nz", "ccB": "be", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 67, "fase": "grupos", "grupo": "L", "rodada": 3, "dataJogo": "2026-06-27T18:00:00", "timeA": "Panamá", "timeB": "Inglaterra", "ccA": "pa", "ccB": "gb-eng", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 68, "fase": "grupos", "grupo": "L", "rodada": 3, "dataJogo": "2026-06-27T18:00:00", "timeA": "Croácia", "timeB": "Gana", "ccA": "hr", "ccB": "gh", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 69, "fase": "grupos", "grupo": "K", "rodada": 3, "dataJogo": "2026-06-27T20:30:00", "timeA": "Colômbia", "timeB": "Portugal", "ccA": "co", "ccB": "pt", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 70, "fase": "grupos", "grupo": "K", "rodada": 3, "dataJogo": "2026-06-27T20:30:00", "timeA": "RD Congo", "timeB": "Uzbequistão", "ccA": "cd", "ccB": "uz", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 71, "fase": "grupos", "grupo": "J", "rodada": 3, "dataJogo": "2026-06-27T23:00:00", "timeA": "Argélia", "timeB": "Áustria", "ccA": "dz", "ccB": "at", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 72, "fase": "grupos", "grupo": "J", "rodada": 3, "dataJogo": "2026-06-27T23:00:00", "timeA": "Jordânia", "timeB": "Argentina", "ccA": "jo", "ccB": "ar", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}];
const PALPITES_INICIAIS = {"1_Alcides": {"a": 1, "b": 2}, "1_Bruno": {"a": 3, "b": 2}, "1_Erick": {"a": 2, "b": 0}, "1_Wes": {"a": 1, "b": 0}, "1_Mauricio": {"a": 2, "b": 1}, "1_Felipão": {"a": 2, "b": 0}, "1_Leo Vituzzo": {"a": 2, "b": 0}, "1_Danilo": {"a": 2, "b": 1}, "1_Leo Cunha": {"a": 2, "b": 0}, "1_Evandro": {"a": 3, "b": 1}, "2_Alcides": {"a": 3, "b": 1}, "2_Bruno": {"a": 1, "b": 2}, "2_Erick": {"a": 1, "b": 0}, "2_Wes": {"a": 0, "b": 2}, "2_Mauricio": {"a": 1, "b": 1}, "2_Felipão": {"a": 3, "b": 1}, "2_Leo Vituzzo": {"a": 1, "b": 1}, "2_Danilo": {"a": 0, "b": 2}, "2_Leo Cunha": {"a": 1, "b": 1}, "2_Evandro": {"a": 2, "b": 0}, "25_Alcides": {"a": 1, "b": 2}, "25_Bruno": {"a": 2, "b": 1}, "25_Erick": {"a": 2, "b": 1}, "25_Wes": {"a": 1, "b": 0}, "25_Leo Vituzzo": {"a": 2, "b": 1}, "28_Alcides": {"a": 2, "b": 3}, "28_Bruno": {"a": 1, "b": 2}, "28_Erick": {"a": 3, "b": 2}, "28_Leo Vituzzo": {"a": 2, "b": 1}, "53_Alcides": {"a": 0, "b": 2}, "53_Bruno": {"a": 1, "b": 3}, "53_Erick": {"a": 0, "b": 2}, "53_Leo Vituzzo": {"a": 1, "b": 1}, "54_Alcides": {"a": 0, "b": 2}, "54_Bruno": {"a": 1, "b": 3}, "54_Erick": {"a": 0, "b": 1}, "54_Leo Vituzzo": {"a": 1, "b": 2}, "3_Alcides": {"a": 1, "b": 1}, "3_Bruno": {"a": 2, "b": 1}, "3_Erick": {"a": 3, "b": 1}, "3_Mauricio": {"a": 2, "b": 1}, "3_Leo Vituzzo": {"a": 2, "b": 1}, "3_Danilo": {"a": 3, "b": 0}, "3_Evandro": {"a": 2, "b": 1}, "6_Alcides": {"a": 0, "b": 2}, "6_Bruno": {"a": 0, "b": 2}, "6_Erick": {"a": 0, "b": 1}, "6_Wes": {"a": 0, "b": 0}, "6_Mauricio": {"a": 0, "b": 2}, "6_Leo Vituzzo": {"a": 1, "b": 2}, "6_Danilo": {"a": 0, "b": 3}, "26_Alcides": {"a": 4, "b": 1}, "26_Bruno": {"a": 3, "b": 0}, "26_Erick": {"a": 2, "b": 0}, "26_Leo Vituzzo": {"a": 2, "b": 0}, "27_Alcides": {"a": 1, "b": 3}, "27_Bruno": {"a": 2, "b": 0}, "27_Erick": {"a": 3, "b": 1}, "27_Leo Vituzzo": {"a": 2, "b": 0}, "49_Alcides": {"a": 3, "b": 0}, "49_Bruno": {"a": 2, "b": 1}, "49_Erick": {"a": 2, "b": 2}, "49_Leo Vituzzo": {"a": 1, "b": 1}, "50_Alcides": {"a": 1, "b": 3}, "50_Bruno": {"a": 0, "b": 0}, "50_Erick": {"a": 3, "b": 2}, "50_Leo Vituzzo": {"a": 2, "b": 1}, "7_Alcides": {"a": 2, "b": 0}, "7_Bruno": {"a": 3, "b": 1}, "7_Erick": {"a": 2, "b": 2}, "7_Wes": {"a": 2, "b": 0}, "7_Mauricio": {"a": 2, "b": 1}, "7_Leo Vituzzo": {"a": 2, "b": 1}, "7_Danilo": {"a": 1, "b": 1}, "8_Alcides": {"a": 1, "b": 0}, "8_Bruno": {"a": 0, "b": 2}, "8_Erick": {"a": 1, "b": 3}, "8_Wes": {"a": 0, "b": 1}, "8_Mauricio": {"a": 0, "b": 3}, "8_Leo Vituzzo": {"a": 0, "b": 2}, "8_Danilo": {"a": 0, "b": 2}, "31_Alcides": {"a": 1, "b": 2}, "31_Bruno": {"a": 1, "b": 3}, "31_Erick": {"a": 1, "b": 3}, "31_Leo Vituzzo": {"a": 1, "b": 1}, "32_Alcides": {"a": 5, "b": 1}, "32_Bruno": {"a": 4, "b": 0}, "32_Erick": {"a": 4, "b": 0}, "32_Leo Vituzzo": {"a": 4, "b": 0}, "51_Alcides": {"a": 0, "b": 2}, "51_Bruno": {"a": 1, "b": 3}, "51_Erick": {"a": 3, "b": 1}, "51_Leo Vituzzo": {"a": 1, "b": 2}, "52_Alcides": {"a": 4, "b": 1}, "52_Bruno": {"a": 3, "b": 0}, "52_Erick": {"a": 4, "b": 1}, "52_Leo Vituzzo": {"a": 3, "b": 0}, "4_Alcides": {"a": 0, "b": 0}, "4_Bruno": {"a": 1, "b": 2}, "4_Erick": {"a": 2, "b": 1}, "4_Wes": {"a": 1, "b": 0}, "4_Mauricio": {"a": 1, "b": 1}, "4_Leo Vituzzo": {"a": 2, "b": 1}, "4_Danilo": {"a": 2, "b": 1}, "4_Evandro": {"a": 0, "b": 1}, "5_Alcides": {"a": 0, "b": 1}, "5_Bruno": {"a": 1, "b": 2}, "5_Erick": {"a": 0, "b": 1}, "5_Wes": {"a": 2, "b": 0}, "5_Mauricio": {"a": 1, "b": 1}, "5_Leo Vituzzo": {"a": 1, "b": 2}, "5_Danilo": {"a": 1, "b": 1}, "29_Alcides": {"a": 5, "b": 0}, "29_Bruno": {"a": 2, "b": 0}, "29_Erick": {"a": 3, "b": 0}, "29_Leo Vituzzo": {"a": 2, "b": 1}, "30_Alcides": {"a": 2, "b": 1}, "30_Bruno": {"a": 2, "b": 1}, "30_Erick": {"a": 3, "b": 1}, "30_Leo Vituzzo": {"a": 2, "b": 0}, "59_Alcides": {"a": 4, "b": 0}, "59_Bruno": {"a": 1, "b": 1}, "59_Erick": {"a": 1, "b": 2}, "59_Leo Vituzzo": {"a": 1, "b": 1}, "60_Alcides": {"a": 1, "b": 0}, "60_Bruno": {"a": 1, "b": 2}, "60_Erick": {"a": 0, "b": 1}, "60_Leo Vituzzo": {"a": 1, "b": 1}, "9_Alcides": {"a": 6, "b": 1}, "9_Bruno": {"a": 6, "b": 0}, "9_Erick": {"a": 5, "b": 0}, "9_Wes": {"a": 3, "b": 0}, "9_Mauricio": {"a": 5, "b": 0}, "9_Leo Vituzzo": {"a": 4, "b": 0}, "9_Danilo": {"a": 6, "b": 0}, "11_Alcides": {"a": 1, "b": 2}, "11_Bruno": {"a": 1, "b": 3}, "11_Erick": {"a": 1, "b": 1}, "11_Wes": {"a": 1, "b": 0}, "11_Mauricio": {"a": 3, "b": 0}, "11_Leo Vituzzo": {"a": 1, "b": 1}, "11_Danilo": {"a": 2, "b": 1}, "34_Alcides": {"a": 2, "b": 0}, "34_Bruno": {"a": 3, "b": 1}, "34_Erick": {"a": 4, "b": 1}, "34_Leo Vituzzo": {"a": 3, "b": 1}, "35_Alcides": {"a": 4, "b": 1}, "35_Bruno": {"a": 3, "b": 1}, "35_Erick": {"a": 3, "b": 0}, "35_Leo Vituzzo": {"a": 2, "b": 0}, "55_Alcides": {"a": 0, "b": 2}, "55_Bruno": {"a": 1, "b": 3}, "55_Erick": {"a": 1, "b": 2}, "55_Leo Vituzzo": {"a": 1, "b": 2}, "56_Alcides": {"a": 2, "b": 6}, "56_Bruno": {"a": 1, "b": 3}, "56_Erick": {"a": 2, "b": 3}, "56_Leo Vituzzo": {"a": 0, "b": 2}, "10_Alcides": {"a": 2, "b": 2}, "10_Bruno": {"a": 2, "b": 1}, "10_Erick": {"a": 2, "b": 1}, "10_Wes": {"a": 2, "b": 1}, "10_Mauricio": {"a": 2, "b": 0}, "10_Leo Vituzzo": {"a": 2, "b": 1}, "10_Danilo": {"a": 2, "b": 1}, "12_Alcides": {"a": 1, "b": 0}, "12_Bruno": {"a": 1, "b": 1}, "12_Erick": {"a": 1, "b": 0}, "12_Wes": {"a": 1, "b": 0}, "12_Mauricio": {"a": 2, "b": 1}, "12_Leo Vituzzo": {"a": 1, "b": 0}, "12_Danilo": {"a": 1, "b": 0}, "36_Alcides": {"a": 1, "b": 1}, "36_Bruno": {"a": 1, "b": 3}, "36_Erick": {"a": 1, "b": 2}, "36_Leo Vituzzo": {"a": 1, "b": 2}, "33_Alcides": {"a": 0, "b": 1}, "33_Bruno": {"a": 2, "b": 1}, "33_Erick": {"a": 1, "b": 0}, "33_Leo Vituzzo": {"a": 1, "b": 1}, "57_Alcides": {"a": 1, "b": 2}, "57_Bruno": {"a": 1, "b": 0}, "57_Erick": {"a": 2, "b": 2}, "57_Leo Vituzzo": {"a": 1, "b": 1}, "58_Alcides": {"a": 2, "b": 1}, "58_Bruno": {"a": 1, "b": 2}, "58_Erick": {"a": 1, "b": 3}, "58_Leo Vituzzo": {"a": 0, "b": 2}, "14_Alcides": {"a": 3, "b": 0}, "14_Bruno": {"a": 1, "b": 2}, "14_Erick": {"a": 3, "b": 0}, "14_Leo Vituzzo": {"a": 2, "b": 0}, "14_Danilo": {"a": 2, "b": 1}, "16_Alcides": {"a": 5, "b": 1}, "16_Bruno": {"a": 0, "b": 2}, "16_Erick": {"a": 1, "b": 1}, "16_Leo Vituzzo": {"a": 2, "b": 1}, "16_Danilo": {"a": 1, "b": 1}, "38_Alcides": {"a": 3, "b": 1}, "38_Bruno": {"a": 3, "b": 0}, "38_Erick": {"a": 3, "b": 2}, "38_Leo Vituzzo": {"a": 2, "b": 1}, "40_Alcides": {"a": 0, "b": 0}, "40_Bruno": {"a": 1, "b": 2}, "40_Erick": {"a": 2, "b": 1}, "40_Leo Vituzzo": {"a": 1, "b": 2}, "65_Alcides": {"a": 0, "b": 3}, "65_Bruno": {"a": 3, "b": 1}, "65_Erick": {"a": 1, "b": 3}, "65_Leo Vituzzo": {"a": 1, "b": 1}, "66_Alcides": {"a": 3, "b": 2}, "66_Bruno": {"a": 1, "b": 2}, "66_Erick": {"a": 0, "b": 2}, "66_Leo Vituzzo": {"a": 0, "b": 3}, "13_Alcides": {"a": 9, "b": 0}, "13_Bruno": {"a": 4, "b": 0}, "13_Erick": {"a": 5, "b": 0}, "13_Wes": {"a": 4, "b": 0}, "13_Leo Vituzzo": {"a": 3, "b": 0}, "13_Danilo": {"a": 7, "b": 0}, "15_Alcides": {"a": 0, "b": 2}, "15_Bruno": {"a": 1, "b": 2}, "15_Erick": {"a": 0, "b": 3}, "15_Wes": {"a": 1, "b": 2}, "15_Leo Vituzzo": {"a": 0, "b": 2}, "15_Danilo": {"a": 1, "b": 2}, "37_Alcides": {"a": 4, "b": 1}, "37_Bruno": {"a": 4, "b": 1}, "37_Erick": {"a": 3, "b": 1}, "37_Leo Vituzzo": {"a": 3, "b": 1}, "39_Alcides": {"a": 6, "b": 1}, "39_Bruno": {"a": 3, "b": 0}, "39_Erick": {"a": 3, "b": 0}, "39_Leo Vituzzo": {"a": 2, "b": 0}, "63_Alcides": {"a": 1, "b": 1}, "63_Bruno": {"a": 1, "b": 2}, "63_Erick": {"a": 0, "b": 0}, "63_Leo Vituzzo": {"a": 1, "b": 1}, "64_Alcides": {"a": 1, "b": 3}, "64_Bruno": {"a": 1, "b": 3}, "64_Erick": {"a": 1, "b": 2}, "64_Leo Vituzzo": {"a": 1, "b": 1}, "18_Alcides": {"a": 1, "b": 1}, "18_Bruno": {"a": 4, "b": 1}, "18_Erick": {"a": 4, "b": 1}, "18_Leo Vituzzo": {"a": 2, "b": 1}, "19_Alcides": {"a": 0, "b": 0}, "19_Bruno": {"a": 1, "b": 2}, "19_Erick": {"a": 0, "b": 1}, "19_Leo Vituzzo": {"a": 0, "b": 2}, "42_Alcides": {"a": 4, "b": 1}, "42_Bruno": {"a": 4, "b": 0}, "42_Erick": {"a": 5, "b": 0}, "42_Leo Vituzzo": {"a": 3, "b": 0}, "43_Alcides": {"a": 1, "b": 1}, "43_Bruno": {"a": 2, "b": 0}, "43_Erick": {"a": 2, "b": 0}, "43_Leo Vituzzo": {"a": 1, "b": 1}, "61_Alcides": {"a": 1, "b": 2}, "61_Bruno": {"a": 0, "b": 2}, "61_Erick": {"a": 1, "b": 3}, "61_Leo Vituzzo": {"a": 1, "b": 2}, "62_Alcides": {"a": 6, "b": 2}, "62_Bruno": {"a": 2, "b": 1}, "62_Erick": {"a": 1, "b": 1}, "62_Leo Vituzzo": {"a": 2, "b": 0}, "20_Alcides": {"a": 2, "b": 1}, "20_Bruno": {"a": 2, "b": 2}, "20_Erick": {"a": 1, "b": 1}, "20_Leo Vituzzo": {"a": 2, "b": 0}, "17_Alcides": {"a": 4, "b": 1}, "17_Bruno": {"a": 3, "b": 0}, "17_Erick": {"a": 4, "b": 0}, "17_Leo Vituzzo": {"a": 3, "b": 0}, "41_Alcides": {"a": 4, "b": 2}, "41_Bruno": {"a": 4, "b": 0}, "41_Erick": {"a": 3, "b": 1}, "41_Leo Vituzzo": {"a": 2, "b": 0}, "44_Alcides": {"a": 1, "b": 2}, "44_Bruno": {"a": 1, "b": 1}, "44_Erick": {"a": 2, "b": 0}, "44_Leo Vituzzo": {"a": 1, "b": 2}, "71_Alcides": {"a": 1, "b": 3}, "71_Bruno": {"a": 2, "b": 2}, "71_Erick": {"a": 0, "b": 2}, "71_Leo Vituzzo": {"a": 1, "b": 1}, "72_Alcides": {"a": 0, "b": 6}, "72_Bruno": {"a": 0, "b": 4}, "72_Erick": {"a": 0, "b": 5}, "72_Leo Vituzzo": {"a": 0, "b": 3}, "21_Alcides": {"a": 6, "b": 1}, "21_Bruno": {"a": 3, "b": 0}, "21_Erick": {"a": 4, "b": 0}, "21_Leo Vituzzo": {"a": 3, "b": 0}, "24_Alcides": {"a": 0, "b": 4}, "24_Bruno": {"a": 0, "b": 2}, "24_Erick": {"a": 0, "b": 2}, "24_Leo Vituzzo": {"a": 0, "b": 2}, "45_Alcides": {"a": 6, "b": 1}, "45_Bruno": {"a": 4, "b": 0}, "45_Erick": {"a": 3, "b": 1}, "45_Leo Vituzzo": {"a": 3, "b": 1}, "48_Alcides": {"a": 5, "b": 1}, "48_Bruno": {"a": 2, "b": 0}, "48_Erick": {"a": 4, "b": 2}, "48_Leo Vituzzo": {"a": 2, "b": 0}, "69_Alcides": {"a": 1, "b": 2}, "69_Bruno": {"a": 2, "b": 3}, "69_Erick": {"a": 1, "b": 2}, "69_Leo Vituzzo": {"a": 1, "b": 1}, "70_Alcides": {"a": 1, "b": 2}, "70_Bruno": {"a": 2, "b": 2}, "70_Erick": {"a": 0, "b": 0}, "70_Leo Vituzzo": {"a": 1, "b": 1}, "22_Alcides": {"a": 1, "b": 0}, "22_Bruno": {"a": 1, "b": 1}, "22_Erick": {"a": 3, "b": 1}, "22_Leo Vituzzo": {"a": 2, "b": 1}, "23_Alcides": {"a": 4, "b": 2}, "23_Bruno": {"a": 2, "b": 1}, "23_Erick": {"a": 1, "b": 2}, "23_Leo Vituzzo": {"a": 2, "b": 1}, "46_Alcides": {"a": 1, "b": 0}, "46_Bruno": {"a": 2, "b": 0}, "46_Erick": {"a": 4, "b": 0}, "46_Leo Vituzzo": {"a": 2, "b": 0}, "47_Alcides": {"a": 0, "b": 2}, "47_Bruno": {"a": 0, "b": 2}, "47_Erick": {"a": 0, "b": 3}, "47_Leo Vituzzo": {"a": 0, "b": 2}, "67_Alcides": {"a": 0, "b": 3}, "67_Bruno": {"a": 0, "b": 3}, "67_Erick": {"a": 1, "b": 3}, "67_Leo Vituzzo": {"a": 0, "b": 3}, "68_Alcides": {"a": 1, "b": 0}, "68_Bruno": {"a": 2, "b": 0}, "68_Erick": {"a": 2, "b": 0}, "68_Leo Vituzzo": {"a": 1, "b": 1}, "25_Felipão": {"a": 2, "b": 0}, "28_Felipão": {"a": 1, "b": 1}, "53_Felipão": {"a": 1, "b": 2}, "54_Felipão": {"a": 0, "b": 2}, "3_Felipão": {"a": 1, "b": 1}, "6_Felipão": {"a": 0, "b": 2}, "26_Felipão": {"a": 2, "b": 1}, "27_Felipão": {"a": 0, "b": 1}, "49_Felipão": {"a": 1, "b": 0}, "50_Felipão": {"a": 2, "b": 1}, "7_Felipão": {"a": 3, "b": 1}, "8_Felipão": {"a": 1, "b": 0}, "31_Felipão": {"a": 1, "b": 1}, "32_Felipão": {"a": 3, "b": 1}, "51_Felipão": {"a": 1, "b": 3}, "52_Felipão": {"a": 2, "b": 0}, "4_Felipão": {"a": 1, "b": 2}, "5_Felipão": {"a": 1, "b": 1}, "29_Felipão": {"a": 0, "b": 0}, "30_Felipão": {"a": 2, "b": 2}, "59_Felipão": {"a": 1, "b": 0}, "60_Felipão": {"a": 2, "b": 1}, "9_Felipão": {"a": 7, "b": 0}, "11_Felipão": {"a": 2, "b": 1}, "34_Felipão": {"a": 3, "b": 1}, "35_Felipão": {"a": 4, "b": 0}, "55_Felipão": {"a": 0, "b": 2}, "56_Felipão": {"a": 1, "b": 4}, "10_Felipão": {"a": 2, "b": 2}, "12_Felipão": {"a": 2, "b": 1}, "36_Felipão": {"a": 1, "b": 1}, "33_Felipão": {"a": 3, "b": 1}, "57_Felipão": {"a": 2, "b": 1}, "58_Felipão": {"a": 0, "b": 3}, "14_Felipão": {"a": 2, "b": 2}, "16_Felipão": {"a": 1, "b": 0}, "38_Felipão": {"a": 2, "b": 1}, "40_Felipão": {"a": 0, "b": 0}, "65_Felipão": {"a": 1, "b": 1}, "66_Felipão": {"a": 0, "b": 3}, "13_Felipão": {"a": 6, "b": 0}, "15_Felipão": {"a": 1, "b": 3}, "37_Felipão": {"a": 3, "b": 1}, "39_Felipão": {"a": 4, "b": 0}, "63_Felipão": {"a": 0, "b": 2}, "64_Felipão": {"a": 2, "b": 2}, "18_Felipão": {"a": 2, "b": 1}, "19_Felipão": {"a": 1, "b": 2}, "42_Felipão": {"a": 3, "b": 0}, "43_Felipão": {"a": 1, "b": 1}, "61_Felipão": {"a": 1, "b": 2}, "62_Felipão": {"a": 0, "b": 0}, "20_Felipão": {"a": 2, "b": 1}, "17_Felipão": {"a": 3, "b": 0}, "41_Felipão": {"a": 2, "b": 0}, "44_Felipão": {"a": 1, "b": 1}, "71_Felipão": {"a": 0, "b": 1}, "72_Felipão": {"a": 1, "b": 2}, "21_Felipão": {"a": 3, "b": 1}, "24_Felipão": {"a": 0, "b": 2}, "45_Felipão": {"a": 2, "b": 0}, "48_Felipão": {"a": 1, "b": 1}, "69_Felipão": {"a": 0, "b": 2}, "70_Felipão": {"a": 1, "b": 0}, "22_Felipão": {"a": 2, "b": 2}, "23_Felipão": {"a": 3, "b": 0}, "46_Felipão": {"a": 2, "b": 2}, "47_Felipão": {"a": 0, "b": 3}, "67_Felipão": {"a": 1, "b": 4}, "68_Felipão": {"a": 2, "b": 2}};
const EXTRAS_INICIAIS = {"Alcides": {"campeao": "Inglaterra", "vice": "Espanha", "terceiro": "Argentina", "artilheiro": "Harry Kane"}, "Bruno": {"campeao": "Brasil", "vice": "França", "terceiro": "Portugal", "artilheiro": "Mbappe"}, "Erick": {"campeao": "Espanha", "vice": "França", "terceiro": "Inglaterra", "artilheiro": "Mbappe"}, "Wes": {"campeao": "Brasil", "vice": "Espanha", "terceiro": "França", "artilheiro": "Vini Jr"}, "Mauricio": {"campeao": "França", "vice": "Espanha", "terceiro": "Argentina", "artilheiro": "Mbappe"}, "Felipão": {"campeao": "Argentina", "vice": "Espanha", "terceiro": "França", "artilheiro": "Lautaro Martínez"}, "Leo Vituzzo": {"campeao": "França", "vice": "Espanha", "terceiro": "Inglaterra", "artilheiro": "Mbappe"}, "Danilo": {"campeao": "França", "vice": "Espanha", "terceiro": "Portugal", "artilheiro": "Olise"}, "Leo Cunha": {"campeao": "Brasil", "vice": "França", "terceiro": "Argentina", "artilheiro": "Mbappe"}, "Evandro": {"campeao": "Portugal", "vice": "França", "terceiro": "Espanha", "artilheiro": "Harry Kane"}};
const USUARIOS_INICIAIS = ["Alcides", "Bruno", "Erick", "Wes", "Mauricio", "Felipão", "Leo Vituzzo", "Danilo", "Leo Cunha", "Evandro"];


const FASES = {
  grupos:     { nome: 'Fase de Grupos',     exato: 5,  vencedor: 2 },
  dezesseis:  { nome: 'Dezesseis Avos de Final', exato: 5,  vencedor: 2 },
  oitavas:    { nome: 'Oitavas de Final',   exato: 6,  vencedor: 3 },
  quartas:    { nome: 'Quartas de Final',   exato: 8,  vencedor: 4 },
  semi:       { nome: 'Semifinal',          exato: 10, vencedor: 5 },
  terceiro:   { nome: '3º Lugar',           exato: 8,  vencedor: 4 },
  final:      { nome: 'Final',              exato: 15, vencedor: 7 },
};

function ccToEmoji(cc) {
  const special = {
    'gb-eng': '🏴\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}',
    'gb-sct': '🏴\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}',
    'eu': '🇪🇺',
    'un': null,
  };
  if (special[cc] !== undefined) return special[cc];
  if (!cc || cc.length !== 2) return null;
  const codePoints = cc.toUpperCase().split('').map(c => 0x1F1E6 + (c.charCodeAt(0) - 65));
  return String.fromCodePoint(...codePoints);
}

function isLocked(jogo) {
  const limite = new Date(jogo.dataJogo).getTime() - 60 * 60 * 1000;
  return Date.now() >= limite;
}

async function hashSenha(senha) {
  const enc = new TextEncoder().encode('bolao2026_' + senha);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

const SESSION_KEY = 'bolao_session_usuario';

function calcPontosJogo(palpite, jogo) {
  if (!palpite || jogo.placarOficialA === null || jogo.placarOficialA === undefined) return null;
  const regra = FASES[jogo.fase] || FASES.grupos;
  const { a: pA, b: pB } = palpite;
  const oA = jogo.placarOficialA, oB = jogo.placarOficialB;
  if (pA === oA && pB === oB) return regra.exato;
  const palResult = Math.sign(pA - pB);
  const ofResult = Math.sign(oA - oB);
  if (palResult === ofResult) return regra.vencedor;
  return 0;
}

function calcPontosExtras(usuario, extras, resultadosFinais) {
  const ex = extras[usuario];
  const rf = resultadosFinais;
  if (!ex) return 0;
  let pts = 0;
  const norm = (s) => (s || '').trim().toLowerCase();
  if (rf.campeao && norm(ex.campeao) === norm(rf.campeao)) pts += 50;
  if (rf.vice && norm(ex.vice) === norm(rf.vice)) pts += 30;
  if (rf.terceiro && norm(ex.terceiro) === norm(rf.terceiro)) pts += 20;
  if (rf.artilheiro) {
    const oficiais = rf.artilheiro.split(',').map(norm).filter(Boolean);
    const palpite = norm(ex.artilheiro);
    if (palpite && oficiais.includes(palpite)) {
      pts += oficiais.length > 1 ? 25 : 50;
    }
  }
  return pts;
}

/* ===================== UI HELPERS ===================== */

function Flag({ cc, nome }) {
  if (!cc || cc === 'un') return <span title={nome} style={{ fontSize: 18 }}>🏳️</span>;

  // gb-eng / gb-sct não existem no flagcdn como subdivisão padrão de 2 letras;
  // usamos os códigos de bandeira regional do flagcdn para Inglaterra/Escócia
  const flagcdnCode = {
    'gb-eng': 'gb-eng',
    'gb-sct': 'gb-sct',
  }[cc] || cc;

  const src = `https://flagcdn.com/w40/${flagcdnCode}.png`;

  return (
    <img
      src={src}
      alt={nome}
      title={nome}
      style={{ width: 24, height: 18, objectFit: 'cover', borderRadius: 2, verticalAlign: 'middle', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)', display: 'inline-block' }}
      onError={(e) => {
        e.target.onerror = null;
        e.target.outerHTML = `<span title="${nome}" style="font-size:18px">🏳️</span>`;
      }}
    />
  );
}

function Badge({ children, tone = 'default' }) {
  const tones = {
    default: { bg: '#EEF2FF', color: '#3730A3' },
    open:    { bg: '#ECFDF5', color: '#047857' },
    locked:  { bg: '#FEF2F2', color: '#B91C1C' },
    done:    { bg: '#F1F5F9', color: '#475569' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 600, padding: '2px 8px',
      borderRadius: 999, background: t.bg, color: t.color, whiteSpace: 'nowrap',
      letterSpacing: '0.02em',
    }}>{children}</span>
  );
}

function ScoreInput({ value, onChange, disabled }) {
  return (
    <input
      type="number" min="0" inputMode="numeric"
      value={value === undefined || value === null ? '' : value}
      onChange={(e) => onChange(e.target.value === '' ? '' : Math.max(0, parseInt(e.target.value) || 0))}
      disabled={disabled}
      style={{
        width: 38, textAlign: 'center', padding: '6px 2px', fontSize: 15, fontWeight: 700,
        border: '1.5px solid #D6DCE5', borderRadius: 6, background: disabled ? '#F4F4F5' : '#fff',
        color: '#1F2937', outline: 'none',
      }}
    />
  );
}

function PrimaryButton({ children, onClick, disabled, small }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: disabled ? '#CBD5E1' : '#1D4ED8', color: '#fff', border: 'none',
      borderRadius: 8, padding: small ? '6px 12px' : '10px 18px', fontSize: small ? 13 : 14,
      fontWeight: 600, cursor: disabled ? 'default' : 'pointer', transition: 'background 0.15s',
    }}>{children}</button>
  );
}

/* ===================== APP ===================== */

export default function BolaoApp() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [tab, setTab] = useState('jogos');
  const [filtroFase, setFiltroFase] = useState('todas');
  const [filtroGrupo, setFiltroGrupo] = useState('todos');
  const [filtroFaseAdmin, setFiltroFaseAdmin] = useState('todas');
  const [pendingScores, setPendingScores] = useState({});
  const [pendingResults, setPendingResults] = useState({});
  const [saveMsg, setSaveMsg] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [extraDraft, setExtraDraft] = useState({ campeao: '', vice: '', terceiro: '', artilheiro: '' });

  // ----- login -----
  const [loggedUser, setLoggedUser] = useState(null); // null = não logado
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loginErro, setLoginErro] = useState('');
  const [novaSenha1, setNovaSenha1] = useState('');
  const [novaSenha2, setNovaSenha2] = useState('');
  const [senhaMsg, setSenhaMsg] = useState('');
  const [adminResetUser, setAdminResetUser] = useState('');
  const [adminResetSenha, setAdminResetSenha] = useState('');

  /* ----- carregar dados ----- */
  const loadState = useCallback(async () => {
    try {
      const snap = await getDoc(DOC_REF);
      if (snap.exists()) {
        const data = snap.data();
        if (!data.senhas) data.senhas = {};
        setState(data);
      } else {
        const initial = {
          usuarios: USUARIOS_INICIAIS,
          jogos: JOGOS_INICIAIS,
          palpites: PALPITES_INICIAIS,
          extras: EXTRAS_INICIAIS,
          resultadosFinais: { campeao: '', vice: '', terceiro: '', artilheiro: '' },
          senhas: {},
        };
        await setDoc(DOC_REF, initial);
        setState(initial);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do Firestore:', e);
      // fallback: estado inicial local (sem persistência) caso o Firestore esteja indisponível
      setState({
        usuarios: USUARIOS_INICIAIS,
        jogos: JOGOS_INICIAIS,
        palpites: PALPITES_INICIAIS,
        extras: EXTRAS_INICIAIS,
        resultadosFinais: { campeao: '', vice: '', terceiro: '', artilheiro: '' },
        senhas: {},
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadState(); }, [loadState]);

  // poll for shared updates every 15s (so users see each other's results)
  useEffect(() => {
    const id = setInterval(() => { loadState(); }, 15000);
    return () => clearInterval(id);
  }, [loadState]);

  // restaurar sessão salva (localStorage)
  useEffect(() => {
    if (!state || loggedUser) return;
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved && state.usuarios.includes(saved)) {
        setLoggedUser(saved);
        setUsuario(saved);
      }
    } catch (e) {}
  }, [state, loggedUser]);

  // load extras draft when usuario changes
  useEffect(() => {
    if (!state || !usuario) return;
    const ex = state.extras[usuario] || {};
    setExtraDraft({
      campeao: ex.campeao || '',
      vice: ex.vice || '',
      terceiro: ex.terceiro || '',
      artilheiro: ex.artilheiro || '',
    });
  }, [state, usuario]);

  const persist = async (newState) => {
    setState(newState);
    try {
      await setDoc(DOC_REF, newState);
    } catch (e) {
      console.error('Erro ao salvar no Firestore:', e);
      setSaveMsg('Erro ao salvar. Tente novamente.');
      setTimeout(() => setSaveMsg(''), 3000);
    }
  };

  if (loading || !state) {
    return (
      <div style={{ fontFamily: 'system-ui, sans-serif', padding: 40, textAlign: 'center', color: '#64748B' }}>
        Carregando bolão...
      </div>
    );
  }

  /* ----- tela de login ----- */
  if (!loggedUser) {
    const loginPage = {
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      background: 'linear-gradient(160deg, #1530A6 0%, #1B3FD1 45%, #0E2080 100%)',
      backgroundAttachment: 'fixed',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      boxSizing: 'border-box',
    };
    const loginCard = {
      background: '#fff', borderRadius: 14, padding: '28px 24px', width: '100%', maxWidth: 380,
      boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    };
    const loginSelect = {
      width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
      background: '#fff', color: '#1F2937', fontWeight: 600, marginBottom: 10, boxSizing: 'border-box',
    };
    const loginInput = {
      width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
      background: '#fff', color: '#1F2937', marginBottom: 10, boxSizing: 'border-box',
    };
    const senhaSalvaExiste = loginUsuario && (state.senhas || {})[loginUsuario];

    return (
      <div style={loginPage}>
        <div style={loginCard}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>🏆</div>
            <h1 style={{ margin: '6px 0 2px', fontSize: 20, fontWeight: 800, color: '#0F172A' }}>Bolão Copa do Mundo 2026</h1>
            <div style={{ color: '#64748B', fontSize: 13 }}>Entre com seu nome e senha</div>
          </div>
          <form onSubmit={fazerLogin}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Seu nome</label>
            <select style={loginSelect} value={loginUsuario} onChange={e => { setLoginUsuario(e.target.value); setLoginErro(''); }}>
              <option value="">Selecione...</option>
              {state.usuarios.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            {loginUsuario && !senhaSalvaExiste ? (
              <div style={{ fontSize: 12.5, color: '#475569', background: '#EEF2FF', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                Primeiro acesso de <strong>{loginUsuario}</strong>: clique em "Entrar" e depois defina sua senha em "Minha Conta".
              </div>
            ) : (
              <>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Senha</label>
                <input type="password" style={loginInput} value={loginSenha} onChange={e => setLoginSenha(e.target.value)} placeholder="Sua senha" />
              </>
            )}

            {loginErro && <div style={{ color: '#B91C1C', fontSize: 13, marginBottom: 10 }}>{loginErro}</div>}

            <button type="submit" style={{
              width: '100%', background: '#1D4ED8', color: '#fff', border: 'none',
              borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 700, cursor: 'pointer',
            }}>Entrar</button>
          </form>
          <div style={{ marginTop: 14, fontSize: 12, color: '#94A3B8', textAlign: 'center' }}>
            Esqueceu a senha? Peça ao administrador para redefinir.
          </div>
        </div>
      </div>
    );
  }

  /* ----- ações ----- */

  const addUsuario = () => {
    const v = novoUsuario.trim();
    if (v && !state.usuarios.includes(v)) {
      persist({ ...state, usuarios: [...state.usuarios, v] });
      setNovoUsuario('');
    }
  };

  const fazerLogin = async (e) => {
    e.preventDefault();
    setLoginErro('');
    if (!loginUsuario) {
      setLoginErro('Selecione seu nome.');
      return;
    }
    const senhaSalva = (state.senhas || {})[loginUsuario];
    if (!senhaSalva) {
      // primeiro acesso: ainda não tem senha definida -> entra e força criar senha
      setLoggedUser(loginUsuario);
      setUsuario(loginUsuario);
      try { localStorage.setItem(SESSION_KEY, loginUsuario); } catch (e2) {}
      setLoginSenha('');
      return;
    }
    const hash = await hashSenha(loginSenha);
    if (hash !== senhaSalva) {
      setLoginErro('Senha incorreta.');
      return;
    }
    setLoggedUser(loginUsuario);
    setUsuario(loginUsuario);
    try { localStorage.setItem(SESSION_KEY, loginUsuario); } catch (e2) {}
    setLoginSenha('');
  };

  const fazerLogout = () => {
    setLoggedUser(null);
    setLoginUsuario('');
    setLoginSenha('');
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  };

  const trocarSenha = async () => {
    setSenhaMsg('');
    if (!novaSenha1 || novaSenha1.length < 4) {
      setSenhaMsg('A senha deve ter pelo menos 4 caracteres.');
      return;
    }
    if (novaSenha1 !== novaSenha2) {
      setSenhaMsg('As senhas não coincidem.');
      return;
    }
    const hash = await hashSenha(novaSenha1);
    const novasSenhas = { ...(state.senhas || {}), [loggedUser]: hash };
    await persist({ ...state, senhas: novasSenhas });
    setNovaSenha1('');
    setNovaSenha2('');
    setSenhaMsg('Senha definida com sucesso!');
    setTimeout(() => setSenhaMsg(''), 2500);
  };

  const adminResetarSenha = async () => {
    if (!adminResetUser) return;
    if (!adminResetSenha || adminResetSenha.length < 4) {
      setSaveMsg('A senha deve ter pelo menos 4 caracteres.');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }
    const hash = await hashSenha(adminResetSenha);
    const novasSenhas = { ...(state.senhas || {}), [adminResetUser]: hash };
    await persist({ ...state, senhas: novasSenhas });
    setAdminResetSenha('');
    setSaveMsg(`Senha de ${adminResetUser} definida!`);
    setTimeout(() => setSaveMsg(''), 2500);
  };

  const salvarPalpite = (jogoId) => {
    const key = `${jogoId}_${usuario}`;
    const pend = pendingScores[key];
    if (!pend || pend.a === '' || pend.b === '') return;
    const jogo = state.jogos.find(j => j.id === jogoId);
    if (isLocked(jogo)) return;
    const novosPalpites = { ...state.palpites, [key]: { a: pend.a, b: pend.b } };
    persist({ ...state, palpites: novosPalpites });
    setSaveMsg('Palpite salvo!');
    setTimeout(() => setSaveMsg(''), 1500);
  };

  const salvarResultado = (jogoId) => {
    const pend = pendingResults[jogoId];
    if (!pend || pend.a === '' || pend.b === '') return;
    const novosJogos = state.jogos.map(j => j.id === jogoId ? { ...j, placarOficialA: pend.a, placarOficialB: pend.b } : j);
    persist({ ...state, jogos: novosJogos });
    setSaveMsg('Resultado salvo!');
    setTimeout(() => setSaveMsg(''), 1500);
  };

  const salvarExtras = () => {
    const novosExtras = { ...state.extras, [usuario]: { ...extraDraft } };
    persist({ ...state, extras: novosExtras });
    setSaveMsg('Palpites extras salvos!');
    setTimeout(() => setSaveMsg(''), 1500);
  };

  const salvarResultadosFinais = (novosResultados) => {
    persist({ ...state, resultadosFinais: novosResultados });
    setSaveMsg('Resultados finais salvos!');
    setTimeout(() => setSaveMsg(''), 1500);
  };

  /* ----- dados derivados ----- */

  const grupos = [...new Set(state.jogos.filter(j => j.grupo).map(j => j.grupo))].sort();

  let jogosFiltrados = [...state.jogos].sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo));
  if (filtroFase !== 'todas') jogosFiltrados = jogosFiltrados.filter(j => j.fase === filtroFase);
  if (filtroGrupo !== 'todos') jogosFiltrados = jogosFiltrados.filter(j => j.grupo === filtroGrupo);

  let jogosAdmin = [...state.jogos].sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo));
  if (filtroFaseAdmin !== 'todas') jogosAdmin = jogosAdmin.filter(j => j.fase === filtroFaseAdmin);

  const ranking = state.usuarios.map(u => {
    let ptsJogos = 0;
    state.jogos.forEach(jogo => {
      const palpite = state.palpites[`${jogo.id}_${u}`];
      const pts = calcPontosJogo(palpite, jogo);
      if (pts !== null) ptsJogos += pts;
    });
    const ptsExtras = calcPontosExtras(u, state.extras, state.resultadosFinais);
    return { usuario: u, ptsJogos, ptsExtras, total: ptsJogos + ptsExtras };
  }).sort((a, b) => b.total - a.total);

  const jogosFinalizados = state.jogos.filter(j => j.placarOficialA !== null && j.placarOficialA !== undefined).length;

  /* ----- styles ----- */
  const page = {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    background: 'linear-gradient(160deg, #1530A6 0%, #1B3FD1 45%, #0E2080 100%)',
    backgroundAttachment: 'fixed',
    minHeight: '100vh',
    padding: '20px 14px 60px',
    color: '#1F2937',
    boxSizing: 'border-box',
  };
  const container = { maxWidth: 980, margin: '0 auto' };
  const card = {
    background: '#fff', borderRadius: 14, padding: '18px 18px',
    marginBottom: 16, boxShadow: '0 1px 3px rgba(15,23,42,0.06)', border: '1px solid #EEF1F5',
  };
  const h3 = { margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0F172A' };
  const select = {
    padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
    background: '#fff', color: '#1F2937', fontWeight: 600,
  };
  const textInput = {
    padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
    background: '#fff', color: '#1F2937',
  };

  const tabs = [
    { id: 'jogos', label: 'Jogos & Palpites' },
    { id: 'extras', label: 'Palpites Extras' },
    { id: 'conta', label: 'Minha Conta' },
    { id: 'admin', label: 'Administração' },
    { id: 'rank', label: 'Classificação' },
  ];

  return (
    <div style={page}>
      <div style={container}>
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 32, lineHeight: 1 }}>🏆</div>
          <h1 style={{ margin: '6px 0 2px', fontSize: 24, fontWeight: 800, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.25)' }}>Bolão Copa do Mundo 2026</h1>
          <div style={{ color: '#CBD9F7', fontSize: 13 }}>Dados compartilhados em tempo real entre os participantes</div>
        </div>

        {/* SAVE MSG */}
        {saveMsg && (
          <div style={{
            position: 'fixed', top: 14, right: 14, background: '#0F172A', color: '#fff',
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 600, zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}>{saveMsg}</div>
        )}

        {/* RULES */}
        <div style={{ ...card, fontSize: 13, color: '#475569' }}>
          <div style={{ ...h3, marginBottom: 8 }}>Sistema de pontuação</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                <th style={{ textAlign: 'left', padding: '6px 10px' }}>Fase / Categoria</th>
                <th style={{ textAlign: 'center', padding: '6px 10px', width: 110 }}>Placar exato</th>
                <th style={{ textAlign: 'center', padding: '6px 10px', width: 150 }}>Vencedor/Empate certo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Fase de Grupos', 5, 2],
                ['Dezesseis Avos de Final', 5, 2],
                ['Oitavas de Final', 6, 3],
                ['Quartas de Final', 8, 4],
                ['Semifinal', 10, 5],
                ['3º Lugar', 8, 4],
                ['Final', 15, 7],
              ].map(([nome, exato, venc]) => (
                <tr key={nome} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 10px' }}>{nome}</td>
                  <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#1D4ED8' }}>{exato}</td>
                  <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#1D4ED8' }}>{venc}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, marginTop: 10 }}>
            <thead>
              <tr style={{ color: '#64748B', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 700 }}>
                <th style={{ textAlign: 'left', padding: '6px 10px' }}>Palpite Extra</th>
                <th style={{ textAlign: 'center', padding: '6px 10px', width: 110 }}>Pontos</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Campeão (1º lugar)', 50],
                ['Vice (2º lugar)', 30],
                ['3º colocado', 20],
                ['Artilheiro (acerto único)', 50],
                ['Artilheiro (compartilhado)', 25],
              ].map(([nome, pts]) => (
                <tr key={nome} style={{ borderBottom: '1px solid #F1F5F9' }}>
                  <td style={{ padding: '6px 10px' }}>{nome}</td>
                  <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#1D4ED8' }}>{pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 8, fontStyle: 'italic', color: '#94A3B8' }}>Palpites de jogos bloqueiam automaticamente 1 hora antes do início.</div>
        </div>

        {/* TABS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 16px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', background: tab === t.id ? '#1D4ED8' : '#E2E8F0',
              color: tab === t.id ? '#fff' : '#475569', transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* TAB: JOGOS */}
        {tab === 'jogos' && (
          <>
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Logado como</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0F172A' }}>{usuario}</div>
                </div>
                <PrimaryButton small onClick={fazerLogout}>Sair</PrimaryButton>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Jogos e palpites</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <select style={select} value={filtroFase} onChange={e => setFiltroFase(e.target.value)}>
                  <option value="todas">Todas as fases</option>
                  {Object.entries(FASES).map(([k, v]) => <option key={k} value={k}>{v.nome}</option>)}
                </select>
                <select style={select} value={filtroGrupo} onChange={e => setFiltroGrupo(e.target.value)}>
                  <option value="todos">Todos os grupos</option>
                  {grupos.map(g => <option key={g} value={g}>Grupo {g}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {jogosFiltrados.map(jogo => {
                  const key = `${jogo.id}_${usuario}`;
                  const palpite = state.palpites[key];
                  const locked = isLocked(jogo);
                  const pend = pendingScores[key] || {};
                  const valA = pend.a !== undefined ? pend.a : (palpite ? palpite.a : '');
                  const valB = pend.b !== undefined ? pend.b : (palpite ? palpite.b : '');
                  const dataFmt = new Date(jogo.dataJogo).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
                  const faseInfo = FASES[jogo.fase] || FASES.grupos;
                  const finalizado = jogo.placarOficialA !== null && jogo.placarOficialA !== undefined;
                  const pts = calcPontosJogo(palpite, jogo);

                  return (
                    <div key={jogo.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      flexWrap: 'wrap', gap: 10, padding: '10px 12px', borderRadius: 10,
                      background: finalizado ? '#F8FAFC' : '#fff', border: '1px solid #EEF1F5',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 220, flex: '1 1 auto' }}>
                        <Flag cc={jogo.ccA} nome={jogo.timeA} />
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{jogo.timeA}</span>
                        <span style={{ color: '#94A3B8', fontSize: 12 }}>x</span>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{jogo.timeB}</span>
                        <Flag cc={jogo.ccB} nome={jogo.timeB} />
                        <Badge>{jogo.grupo ? `Grupo ${jogo.grupo}` : faseInfo.nome}</Badge>
                      </div>

                      <div style={{ fontSize: 12, color: '#64748B', minWidth: 140 }}>
                        {dataFmt}{jogo.cidade ? ` · ${jogo.cidade}` : ''}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        {finalizado && (
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginRight: 4 }}>
                            Final: {jogo.placarOficialA} x {jogo.placarOficialB}
                          </span>
                        )}
                        {locked ? (
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
                            {palpite ? `${palpite.a} x ${palpite.b}` : <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>sem palpite</span>}
                          </span>
                        ) : (
                          <>
                            <ScoreInput value={valA} onChange={(v) => setPendingScores(s => ({ ...s, [key]: { a: v, b: s[key]?.b !== undefined ? s[key].b : valB } }))} />
                            <span style={{ color: '#94A3B8' }}>x</span>
                            <ScoreInput value={valB} onChange={(v) => setPendingScores(s => ({ ...s, [key]: { a: s[key]?.a !== undefined ? s[key].a : valA, b: v } }))} />
                            <PrimaryButton small onClick={() => salvarPalpite(jogo.id)} disabled={valA === '' || valB === ''}>Salvar</PrimaryButton>
                          </>
                        )}
                        {locked && <Badge tone="locked">Bloqueado</Badge>}
                        {!locked && <Badge tone="open">Aberto</Badge>}
                        {finalizado && pts !== null && <Badge tone="done">+{pts} pts</Badge>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* TAB: EXTRAS */}
        {tab === 'extras' && (
          <div style={card}>
            <div style={h3}>Palpites extras — {usuario}</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
              Esses palpites podem ser editados livremente até que o administrador lance os resultados finais.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
              {[
                { key: 'campeao', label: '🥇 Campeão (1º lugar)' },
                { key: 'vice', label: '🥈 Vice-campeão (2º lugar)' },
                { key: 'terceiro', label: '🥉 3º lugar' },
                { key: 'artilheiro', label: '👟 Artilheiro' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>{f.label}</label>
                  <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                    value={extraDraft[f.key]}
                    onChange={e => setExtraDraft(d => ({ ...d, [f.key]: e.target.value }))} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16 }}>
              <PrimaryButton onClick={salvarExtras}>Salvar palpites extras</PrimaryButton>
            </div>
          </div>
        )}

        {/* TAB: MINHA CONTA */}
        {tab === 'conta' && (
          <div style={card}>
            <div style={h3}>Minha Conta — {usuario}</div>
            <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
              Defina ou troque sua senha de acesso. Guarde-a em local seguro — caso esqueça, peça ao administrador para redefinir.
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12, maxWidth: 480 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Nova senha</label>
                <input type="password" style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                  value={novaSenha1} onChange={e => setNovaSenha1(e.target.value)} placeholder="Mínimo 4 caracteres" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Confirmar nova senha</label>
                <input type="password" style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                  value={novaSenha2} onChange={e => setNovaSenha2(e.target.value)} placeholder="Repita a senha" />
              </div>
            </div>
            {senhaMsg && <div style={{ marginTop: 10, fontSize: 13, color: senhaMsg.includes('sucesso') ? '#047857' : '#B91C1C' }}>{senhaMsg}</div>}
            <div style={{ marginTop: 16 }}>
              <PrimaryButton onClick={trocarSenha}>Salvar senha</PrimaryButton>
            </div>
          </div>
        )}

        {/* TAB: ADMIN */}
        {tab === 'admin' && (
          <>
            <div style={card}>
              <div style={h3}>Usuários e senhas</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Adicione novos participantes ou defina/redefina a senha de qualquer um.
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 16 }}>
                <input style={textInput} placeholder="Nome do novo participante" value={novoUsuario} onChange={e => setNovoUsuario(e.target.value)} />
                <PrimaryButton small onClick={addUsuario}>Adicionar participante</PrimaryButton>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                <select style={select} value={adminResetUser} onChange={e => setAdminResetUser(e.target.value)}>
                  <option value="">Selecione um participante...</option>
                  {state.usuarios.map(u => (
                    <option key={u} value={u}>{u}{(state.senhas || {})[u] ? ' (senha definida)' : ' (sem senha)'}</option>
                  ))}
                </select>
                <input type="password" style={textInput} placeholder="Nova senha (mín. 4 caracteres)" value={adminResetSenha} onChange={e => setAdminResetSenha(e.target.value)} />
                <PrimaryButton small onClick={adminResetarSenha} disabled={!adminResetUser}>Definir senha</PrimaryButton>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Resultado final do Mundial</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
                {[
                  { key: 'campeao', label: 'Campeão' },
                  { key: 'vice', label: 'Vice' },
                  { key: 'terceiro', label: '3º Lugar' },
                  { key: 'artilheiro', label: 'Artilheiro (separar por vírgula se houver mais de um)' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>{f.label}</label>
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={state.resultadosFinais[f.key] || ''}
                      onChange={e => setState(s => ({ ...s, resultadosFinais: { ...s.resultadosFinais, [f.key]: e.target.value } }))} />
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16 }}>
                <PrimaryButton onClick={() => salvarResultadosFinais(state.resultadosFinais)}>Salvar resultados finais</PrimaryButton>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Lançar resultados dos jogos</div>
              <div style={{ marginBottom: 12 }}>
                <select style={select} value={filtroFaseAdmin} onChange={e => setFiltroFaseAdmin(e.target.value)}>
                  <option value="todas">Todas as fases</option>
                  {Object.entries(FASES).map(([k, v]) => <option key={k} value={k}>{v.nome}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {jogosAdmin.map(jogo => {
                  const pend = pendingResults[jogo.id] || {};
                  const valA = pend.a !== undefined ? pend.a : (jogo.placarOficialA ?? '');
                  const valB = pend.b !== undefined ? pend.b : (jogo.placarOficialB ?? '');
                  const dataFmt = new Date(jogo.dataJogo).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
                  return (
                    <div key={jogo.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      flexWrap: 'wrap', gap: 10, padding: '10px 12px', borderRadius: 10,
                      background: '#fff', border: '1px solid #EEF1F5',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 220, flex: '1 1 auto' }}>
                        <Flag cc={jogo.ccA} nome={jogo.timeA} />
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{jogo.timeA}</span>
                        <span style={{ color: '#94A3B8', fontSize: 12 }}>x</span>
                        <span style={{ fontWeight: 700, fontSize: 13.5 }}>{jogo.timeB}</span>
                        <Flag cc={jogo.ccB} nome={jogo.timeB} />
                      </div>
                      <div style={{ fontSize: 12, color: '#64748B', minWidth: 110 }}>{dataFmt}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ScoreInput value={valA} onChange={(v) => setPendingResults(s => ({ ...s, [jogo.id]: { a: v, b: s[jogo.id]?.b !== undefined ? s[jogo.id].b : valB } }))} />
                        <span style={{ color: '#94A3B8' }}>x</span>
                        <ScoreInput value={valB} onChange={(v) => setPendingResults(s => ({ ...s, [jogo.id]: { a: s[jogo.id]?.a !== undefined ? s[jogo.id].a : valA, b: v } }))} />
                        <PrimaryButton small onClick={() => salvarResultado(jogo.id)} disabled={valA === '' || valB === ''}>Salvar</PrimaryButton>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* TAB: RANKING */}
        {tab === 'rank' && (
          <div style={card}>
            <div style={h3}>Classificação geral</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
              <div style={{ background: '#EEF2FF', borderRadius: 10, padding: '10px 16px', fontSize: 13 }}>
                <strong>{state.usuarios.length}</strong> participantes
              </div>
              <div style={{ background: '#EEF2FF', borderRadius: 10, padding: '10px 16px', fontSize: 13 }}>
                <strong>{state.jogos.length}</strong> jogos cadastrados
              </div>
              <div style={{ background: '#EEF2FF', borderRadius: 10, padding: '10px 16px', fontSize: 13 }}>
                <strong>{jogosFinalizados}</strong> jogos com resultado
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ textAlign: 'left', color: '#64748B', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <th style={{ padding: '8px 10px' }}>Pos.</th>
                    <th style={{ padding: '8px 10px' }}>Participante</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Pts Jogos</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Pts Extras</th>
                    <th style={{ padding: '8px 10px', textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {ranking.map((r, i) => (
                    <tr key={r.usuario} style={{ borderTop: '1px solid #F1F5F9', background: r.usuario === usuario ? '#F8FAFC' : 'transparent' }}>
                      <td style={{ padding: '10px 10px', fontWeight: 800, color: i < 3 ? '#1D4ED8' : '#94A3B8' }}>
                        {i + 1}º{i === 0 ? ' 🏆' : ''}
                      </td>
                      <td style={{ padding: '10px 10px', fontWeight: 700 }}>{r.usuario}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'right', color: '#475569' }}>{r.ptsJogos}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'right', color: '#475569' }}>{r.ptsExtras}</td>
                      <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 800, fontSize: 15 }}>{r.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 24 }}>
          Dados sincronizados automaticamente entre todos os participantes a cada 15s.
        </div>
      </div>
    </div>
  );
}
