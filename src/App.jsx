import React, { useState, useEffect, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

/* ===================== CONFIG FIREBASE ===================== */
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
const JOGOS_INICIAIS = [{"id": 1, "fase": "grupos", "grupo": "A", "rodada": 1, "dataJogo": "2026-06-11T16:00:00", "timeA": "México", "timeB": "África do Sul", "ccA": "mx", "ccB": "za", "cidade": "Cidade do México", "placarOficialA": 2, "placarOficialB": 0}, {"id": 2, "fase": "grupos", "grupo": "A", "rodada": 1, "dataJogo": "2026-06-11T23:00:00", "timeA": "Coreia do Sul", "timeB": "República Tcheca", "ccA": "kr", "ccB": "cz", "cidade": "Guadalajara", "placarOficialA": 2, "placarOficialB": 1}, {"id": 3, "fase": "grupos", "grupo": "B", "rodada": 1, "dataJogo": "2026-06-12T16:00:00", "timeA": "Canadá", "timeB": "Bósnia e Herzegovina", "ccA": "ca", "ccB": "ba", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 4, "fase": "grupos", "grupo": "D", "rodada": 1, "dataJogo": "2026-06-12T22:00:00", "timeA": "Estados Unidos", "timeB": "Paraguai", "ccA": "us", "ccB": "py", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 5, "fase": "grupos", "grupo": "D", "rodada": 1, "dataJogo": "2026-06-14T01:00:00", "timeA": "Austrália", "timeB": "Turquia", "ccA": "au", "ccB": "tr", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 6, "fase": "grupos", "grupo": "B", "rodada": 1, "dataJogo": "2026-06-13T16:00:00", "timeA": "Catar", "timeB": "Suíça", "ccA": "qa", "ccB": "ch", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 7, "fase": "grupos", "grupo": "C", "rodada": 1, "dataJogo": "2026-06-13T19:00:00", "timeA": "Brasil", "timeB": "Marrocos", "ccA": "br", "ccB": "ma", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 8, "fase": "grupos", "grupo": "C", "rodada": 1, "dataJogo": "2026-06-13T22:00:00", "timeA": "Haiti", "timeB": "Escócia", "ccA": "ht", "ccB": "gb-sct", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 9, "fase": "grupos", "grupo": "E", "rodada": 1, "dataJogo": "2026-06-14T14:00:00", "timeA": "Alemanha", "timeB": "Curaçao", "ccA": "de", "ccB": "cw", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 10, "fase": "grupos", "grupo": "F", "rodada": 1, "dataJogo": "2026-06-14T17:00:00", "timeA": "Holanda", "timeB": "Japão", "ccA": "nl", "ccB": "jp", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 11, "fase": "grupos", "grupo": "E", "rodada": 1, "dataJogo": "2026-06-14T20:00:00", "timeA": "Costa do Marfim", "timeB": "Equador", "ccA": "ci", "ccB": "ec", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 12, "fase": "grupos", "grupo": "F", "rodada": 1, "dataJogo": "2026-06-14T23:00:00", "timeA": "Suécia", "timeB": "Tunísia", "ccA": "se", "ccB": "tn", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 13, "fase": "grupos", "grupo": "H", "rodada": 1, "dataJogo": "2026-06-15T13:00:00", "timeA": "Espanha", "timeB": "Cabo Verde", "ccA": "es", "ccB": "cv", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 14, "fase": "grupos", "grupo": "G", "rodada": 1, "dataJogo": "2026-06-15T16:00:00", "timeA": "Bélgica", "timeB": "Egito", "ccA": "be", "ccB": "eg", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 15, "fase": "grupos", "grupo": "H", "rodada": 1, "dataJogo": "2026-06-15T19:00:00", "timeA": "Arábia Saudita", "timeB": "Uruguai", "ccA": "sa", "ccB": "uy", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 16, "fase": "grupos", "grupo": "G", "rodada": 1, "dataJogo": "2026-06-15T22:00:00", "timeA": "Irã", "timeB": "Nova Zelândia", "ccA": "ir", "ccB": "nz", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 17, "fase": "grupos", "grupo": "J", "rodada": 1, "dataJogo": "2026-06-16T22:00:00", "timeA": "Argentina", "timeB": "Argélia", "ccA": "ar", "ccB": "dz", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 18, "fase": "grupos", "grupo": "I", "rodada": 1, "dataJogo": "2026-06-16T16:00:00", "timeA": "França", "timeB": "Senegal", "ccA": "fr", "ccB": "sn", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 19, "fase": "grupos", "grupo": "I", "rodada": 1, "dataJogo": "2026-06-16T19:00:00", "timeA": "Iraque", "timeB": "Noruega", "ccA": "iq", "ccB": "no", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 20, "fase": "grupos", "grupo": "J", "rodada": 1, "dataJogo": "2026-06-17T01:00:00", "timeA": "Áustria", "timeB": "Jordânia", "ccA": "at", "ccB": "jo", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 21, "fase": "grupos", "grupo": "K", "rodada": 1, "dataJogo": "2026-06-17T14:00:00", "timeA": "Portugal", "timeB": "RD Congo", "ccA": "pt", "ccB": "cd", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 22, "fase": "grupos", "grupo": "L", "rodada": 1, "dataJogo": "2026-06-17T17:00:00", "timeA": "Inglaterra", "timeB": "Croácia", "ccA": "gb-eng", "ccB": "hr", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 23, "fase": "grupos", "grupo": "L", "rodada": 1, "dataJogo": "2026-06-17T20:00:00", "timeA": "Gana", "timeB": "Panamá", "ccA": "gh", "ccB": "pa", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 24, "fase": "grupos", "grupo": "K", "rodada": 1, "dataJogo": "2026-06-17T23:00:00", "timeA": "Uzbequistão", "timeB": "Colômbia", "ccA": "uz", "ccB": "co", "cidade": "Cidade do México", "placarOficialA": null, "placarOficialB": null}, {"id": 25, "fase": "grupos", "grupo": "A", "rodada": 2, "dataJogo": "2026-06-18T13:00:00", "timeA": "República Tcheca", "timeB": "África do Sul", "ccA": "cz", "ccB": "za", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 26, "fase": "grupos", "grupo": "B", "rodada": 2, "dataJogo": "2026-06-18T16:00:00", "timeA": "Suíça", "timeB": "Bósnia e Herzegovina", "ccA": "ch", "ccB": "ba", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 27, "fase": "grupos", "grupo": "B", "rodada": 2, "dataJogo": "2026-06-18T19:00:00", "timeA": "Canadá", "timeB": "Catar", "ccA": "ca", "ccB": "qa", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 28, "fase": "grupos", "grupo": "A", "rodada": 2, "dataJogo": "2026-06-18T22:00:00", "timeA": "México", "timeB": "Coreia do Sul", "ccA": "mx", "ccB": "kr", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 29, "fase": "grupos", "grupo": "D", "rodada": 2, "dataJogo": "2026-06-20T00:00:00", "timeA": "Turquia", "timeB": "Paraguai", "ccA": "tr", "ccB": "py", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 30, "fase": "grupos", "grupo": "D", "rodada": 2, "dataJogo": "2026-06-19T16:00:00", "timeA": "Estados Unidos", "timeB": "Austrália", "ccA": "us", "ccB": "au", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 31, "fase": "grupos", "grupo": "C", "rodada": 2, "dataJogo": "2026-06-19T19:00:00", "timeA": "Escócia", "timeB": "Marrocos", "ccA": "gb-sct", "ccB": "ma", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 32, "fase": "grupos", "grupo": "C", "rodada": 2, "dataJogo": "2026-06-19T22:00:00", "timeA": "Brasil", "timeB": "Haiti", "ccA": "br", "ccB": "ht", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 33, "fase": "grupos", "grupo": "F", "rodada": 2, "dataJogo": "2026-06-20T14:00:00", "timeA": "Holanda", "timeB": "Suécia", "ccA": "nl", "ccB": "se", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 34, "fase": "grupos", "grupo": "E", "rodada": 2, "dataJogo": "2026-06-20T17:00:00", "timeA": "Alemanha", "timeB": "Costa do Marfim", "ccA": "de", "ccB": "ci", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 35, "fase": "grupos", "grupo": "E", "rodada": 2, "dataJogo": "2026-06-20T21:00:00", "timeA": "Equador", "timeB": "Curaçao", "ccA": "ec", "ccB": "cw", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 36, "fase": "grupos", "grupo": "F", "rodada": 2, "dataJogo": "2026-06-21T01:00:00", "timeA": "Tunísia", "timeB": "Japão", "ccA": "tn", "ccB": "jp", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 37, "fase": "grupos", "grupo": "H", "rodada": 2, "dataJogo": "2026-06-21T13:00:00", "timeA": "Espanha", "timeB": "Arábia Saudita", "ccA": "es", "ccB": "sa", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 38, "fase": "grupos", "grupo": "G", "rodada": 2, "dataJogo": "2026-06-21T16:00:00", "timeA": "Bélgica", "timeB": "Irã", "ccA": "be", "ccB": "ir", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 39, "fase": "grupos", "grupo": "H", "rodada": 2, "dataJogo": "2026-06-21T19:00:00", "timeA": "Uruguai", "timeB": "Cabo Verde", "ccA": "uy", "ccB": "cv", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 40, "fase": "grupos", "grupo": "G", "rodada": 2, "dataJogo": "2026-06-21T22:00:00", "timeA": "Nova Zelândia", "timeB": "Egito", "ccA": "nz", "ccB": "eg", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 41, "fase": "grupos", "grupo": "J", "rodada": 2, "dataJogo": "2026-06-22T14:00:00", "timeA": "Argentina", "timeB": "Áustria", "ccA": "ar", "ccB": "at", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 42, "fase": "grupos", "grupo": "I", "rodada": 2, "dataJogo": "2026-06-22T18:00:00", "timeA": "França", "timeB": "Iraque", "ccA": "fr", "ccB": "iq", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 43, "fase": "grupos", "grupo": "I", "rodada": 2, "dataJogo": "2026-06-22T21:00:00", "timeA": "Noruega", "timeB": "Senegal", "ccA": "no", "ccB": "sn", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 44, "fase": "grupos", "grupo": "J", "rodada": 2, "dataJogo": "2026-06-23T00:00:00", "timeA": "Jordânia", "timeB": "Argélia", "ccA": "jo", "ccB": "dz", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 45, "fase": "grupos", "grupo": "K", "rodada": 2, "dataJogo": "2026-06-23T14:00:00", "timeA": "Portugal", "timeB": "Uzbequistão", "ccA": "pt", "ccB": "uz", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 46, "fase": "grupos", "grupo": "L", "rodada": 2, "dataJogo": "2026-06-23T17:00:00", "timeA": "Inglaterra", "timeB": "Gana", "ccA": "gb-eng", "ccB": "gh", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 47, "fase": "grupos", "grupo": "L", "rodada": 2, "dataJogo": "2026-06-23T20:00:00", "timeA": "Panamá", "timeB": "Croácia", "ccA": "pa", "ccB": "hr", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 48, "fase": "grupos", "grupo": "K", "rodada": 2, "dataJogo": "2026-06-23T23:00:00", "timeA": "Colômbia", "timeB": "RD Congo", "ccA": "co", "ccB": "cd", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 49, "fase": "grupos", "grupo": "B", "rodada": 3, "dataJogo": "2026-06-24T16:00:00", "timeA": "Suíça", "timeB": "Canadá", "ccA": "ch", "ccB": "ca", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 50, "fase": "grupos", "grupo": "B", "rodada": 3, "dataJogo": "2026-06-24T16:00:00", "timeA": "Bósnia e Herzegovina", "timeB": "Catar", "ccA": "ba", "ccB": "qa", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 51, "fase": "grupos", "grupo": "C", "rodada": 3, "dataJogo": "2026-06-24T19:00:00", "timeA": "Escócia", "timeB": "Brasil", "ccA": "gb-sct", "ccB": "br", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 52, "fase": "grupos", "grupo": "C", "rodada": 3, "dataJogo": "2026-06-24T19:00:00", "timeA": "Marrocos", "timeB": "Haiti", "ccA": "ma", "ccB": "ht", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 53, "fase": "grupos", "grupo": "A", "rodada": 3, "dataJogo": "2026-06-24T22:00:00", "timeA": "República Tcheca", "timeB": "México", "ccA": "cz", "ccB": "mx", "cidade": "Cidade do México", "placarOficialA": null, "placarOficialB": null}, {"id": 54, "fase": "grupos", "grupo": "A", "rodada": 3, "dataJogo": "2026-06-24T22:00:00", "timeA": "África do Sul", "timeB": "Coreia do Sul", "ccA": "za", "ccB": "kr", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 55, "fase": "grupos", "grupo": "E", "rodada": 3, "dataJogo": "2026-06-25T17:00:00", "timeA": "Equador", "timeB": "Alemanha", "ccA": "ec", "ccB": "de", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 56, "fase": "grupos", "grupo": "E", "rodada": 3, "dataJogo": "2026-06-25T17:00:00", "timeA": "Curaçao", "timeB": "Costa do Marfim", "ccA": "cw", "ccB": "ci", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 57, "fase": "grupos", "grupo": "F", "rodada": 3, "dataJogo": "2026-06-25T20:00:00", "timeA": "Japão", "timeB": "Suécia", "ccA": "jp", "ccB": "se", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 58, "fase": "grupos", "grupo": "F", "rodada": 3, "dataJogo": "2026-06-25T20:00:00", "timeA": "Tunísia", "timeB": "Holanda", "ccA": "tn", "ccB": "nl", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 59, "fase": "grupos", "grupo": "D", "rodada": 3, "dataJogo": "2026-06-25T23:00:00", "timeA": "Turquia", "timeB": "Estados Unidos", "ccA": "tr", "ccB": "us", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 60, "fase": "grupos", "grupo": "D", "rodada": 3, "dataJogo": "2026-06-25T23:00:00", "timeA": "Paraguai", "timeB": "Austrália", "ccA": "py", "ccB": "au", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 61, "fase": "grupos", "grupo": "I", "rodada": 3, "dataJogo": "2026-06-26T16:00:00", "timeA": "Noruega", "timeB": "França", "ccA": "no", "ccB": "fr", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 62, "fase": "grupos", "grupo": "I", "rodada": 3, "dataJogo": "2026-06-26T16:00:00", "timeA": "Senegal", "timeB": "Iraque", "ccA": "sn", "ccB": "iq", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 63, "fase": "grupos", "grupo": "H", "rodada": 3, "dataJogo": "2026-06-26T21:00:00", "timeA": "Cabo Verde", "timeB": "Arábia Saudita", "ccA": "cv", "ccB": "sa", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 64, "fase": "grupos", "grupo": "H", "rodada": 3, "dataJogo": "2026-06-26T21:00:00", "timeA": "Uruguai", "timeB": "Espanha", "ccA": "uy", "ccB": "es", "cidade": "Guadalajara", "placarOficialA": null, "placarOficialB": null}, {"id": 65, "fase": "grupos", "grupo": "G", "rodada": 3, "dataJogo": "2026-06-27T00:00:00", "timeA": "Egito", "timeB": "Irã", "ccA": "eg", "ccB": "ir", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 66, "fase": "grupos", "grupo": "G", "rodada": 3, "dataJogo": "2026-06-27T00:00:00", "timeA": "Nova Zelândia", "timeB": "Bélgica", "ccA": "nz", "ccB": "be", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 67, "fase": "grupos", "grupo": "L", "rodada": 3, "dataJogo": "2026-06-27T18:00:00", "timeA": "Panamá", "timeB": "Inglaterra", "ccA": "pa", "ccB": "gb-eng", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 68, "fase": "grupos", "grupo": "L", "rodada": 3, "dataJogo": "2026-06-27T18:00:00", "timeA": "Croácia", "timeB": "Gana", "ccA": "hr", "ccB": "gh", "cidade": "Filadélfia", "placarOficialA": null, "placarOficialB": null}, {"id": 69, "fase": "grupos", "grupo": "K", "rodada": 3, "dataJogo": "2026-06-27T20:30:00", "timeA": "Colômbia", "timeB": "Portugal", "ccA": "co", "ccB": "pt", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 70, "fase": "grupos", "grupo": "K", "rodada": 3, "dataJogo": "2026-06-27T20:30:00", "timeA": "RD Congo", "timeB": "Uzbequistão", "ccA": "cd", "ccB": "uz", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 71, "fase": "grupos", "grupo": "J", "rodada": 3, "dataJogo": "2026-06-27T23:00:00", "timeA": "Argélia", "timeB": "Áustria", "ccA": "dz", "ccB": "at", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 72, "fase": "grupos", "grupo": "J", "rodada": 3, "dataJogo": "2026-06-27T23:00:00", "timeA": "Jordânia", "timeB": "Argentina", "ccA": "jo", "ccB": "ar", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 73, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-28T16:00:00", "timeA": "África do Sul", "timeB": "Canadá", "ccA": "za", "ccB": "ca", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 74, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-29T17:30:00", "timeA": "Brasil", "timeB": "Japão", "ccA": "br", "ccB": "jp", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 75, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-29T22:00:00", "timeA": "Alemanha", "timeB": "Paraguai", "ccA": "de", "ccB": "py", "cidade": "Monterrey", "placarOficialA": null, "placarOficialB": null}, {"id": 76, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-29T14:00:00", "timeA": "Holanda", "timeB": "Marrocos", "ccA": "nl", "ccB": "ma", "cidade": "Houston", "placarOficialA": null, "placarOficialB": null}, {"id": 77, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-30T18:00:00", "timeA": "Costa do Marfim", "timeB": "Noruega", "ccA": "ci", "ccB": "no", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 78, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-30T14:00:00", "timeA": "França", "timeB": "Suécia", "ccA": "fr", "ccB": "se", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 79, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-06-30T22:00:00", "timeA": "México", "timeB": "Equador", "ccA": "mx", "ccB": "ec", "cidade": "Cidade do México", "placarOficialA": null, "placarOficialB": null}, {"id": 80, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-01T13:00:00", "timeA": "Inglaterra", "timeB": "RD Congo", "ccA": "gb-eng", "ccB": "cd", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 81, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-01T21:00:00", "timeA": "Bélgica", "timeB": "Senegal", "ccA": "be", "ccB": "sn", "cidade": "San Francisco", "placarOficialA": null, "placarOficialB": null}, {"id": 82, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-01T17:00:00", "timeA": "Estados Unidos", "timeB": "Bósnia e Herzegovina", "ccA": "us", "ccB": "ba", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 83, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-02T20:00:00", "timeA": "Espanha", "timeB": "Áustria", "ccA": "es", "ccB": "at", "cidade": "Toronto", "placarOficialA": null, "placarOficialB": null}, {"id": 84, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-02T16:00:00", "timeA": "Portugal", "timeB": "Croácia", "ccA": "pt", "ccB": "hr", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 85, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-03T00:00:00", "timeA": "Suíça", "timeB": "Argélia", "ccA": "ch", "ccB": "dz", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 86, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-03T19:00:00", "timeA": "Austrália", "timeB": "Egito", "ccA": "au", "ccB": "eg", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 87, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-03T22:30:00", "timeA": "Argentina", "timeB": "Cabo Verde", "ccA": "ar", "ccB": "cv", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 88, "fase": "dezesseis", "grupo": null, "rodada": null, "dataJogo": "2026-07-03T15:00:00", "timeA": "Colômbia", "timeB": "Gana", "ccA": "co", "ccB": "gh", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 89, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-04T14:00:00", "timeA": "Vencedor Jogo 76", "timeB": "Vencedor Jogo 77", "ccA": "un", "ccB": "un", "cidade": "Seattle", "placarOficialA": null, "placarOficialB": null}, {"id": 90, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-04T18:00:00", "timeA": "Vencedor Jogo 78", "timeB": "Vencedor Jogo 79", "ccA": "un", "ccB": "un", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 91, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-05T14:00:00", "timeA": "Vencedor Jogo 80", "timeB": "Vencedor Jogo 81", "ccA": "un", "ccB": "un", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 92, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-05T18:00:00", "timeA": "Vencedor Jogo 82", "timeB": "Vencedor Jogo 83", "ccA": "un", "ccB": "un", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}, {"id": 93, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-06T14:00:00", "timeA": "Vencedor Jogo 73", "timeB": "Vencedor Jogo 74", "ccA": "un", "ccB": "un", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 94, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-06T18:00:00", "timeA": "Vencedor Jogo 84", "timeB": "Vencedor Jogo 85", "ccA": "un", "ccB": "un", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 95, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-07T14:00:00", "timeA": "Vencedor Jogo 86", "timeB": "Vencedor Jogo 87", "ccA": "un", "ccB": "un", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 96, "fase": "oitavas", "grupo": null, "rodada": null, "dataJogo": "2026-07-07T18:00:00", "timeA": "Vencedor Jogo 75", "timeB": "Vencedor Jogo 88", "ccA": "un", "ccB": "un", "cidade": "Vancouver", "placarOficialA": null, "placarOficialB": null}, {"id": 97, "fase": "quartas", "grupo": null, "rodada": null, "dataJogo": "2026-07-09T18:00:00", "timeA": "Vencedor Jogo 93", "timeB": "Vencedor Jogo 94", "ccA": "un", "ccB": "un", "cidade": "Boston", "placarOficialA": null, "placarOficialB": null}, {"id": 98, "fase": "quartas", "grupo": null, "rodada": null, "dataJogo": "2026-07-10T17:00:00", "timeA": "Vencedor Jogo 89", "timeB": "Vencedor Jogo 90", "ccA": "un", "ccB": "un", "cidade": "Los Angeles", "placarOficialA": null, "placarOficialB": null}, {"id": 99, "fase": "quartas", "grupo": null, "rodada": null, "dataJogo": "2026-07-11T19:00:00", "timeA": "Vencedor Jogo 95", "timeB": "Vencedor Jogo 96", "ccA": "un", "ccB": "un", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 100, "fase": "quartas", "grupo": null, "rodada": null, "dataJogo": "2026-07-11T23:00:00", "timeA": "Vencedor Jogo 91", "timeB": "Vencedor Jogo 92", "ccA": "un", "ccB": "un", "cidade": "Kansas City", "placarOficialA": null, "placarOficialB": null}, {"id": 101, "fase": "semi", "grupo": null, "rodada": null, "dataJogo": "2026-07-14T17:00:00", "timeA": "Vencedor Jogo 97", "timeB": "Vencedor Jogo 98", "ccA": "un", "ccB": "un", "cidade": "Dallas", "placarOficialA": null, "placarOficialB": null}, {"id": 102, "fase": "semi", "grupo": null, "rodada": null, "dataJogo": "2026-07-15T17:00:00", "timeA": "Vencedor Jogo 99", "timeB": "Vencedor Jogo 100", "ccA": "un", "ccB": "un", "cidade": "Atlanta", "placarOficialA": null, "placarOficialB": null}, {"id": 103, "fase": "terceiro", "grupo": null, "rodada": null, "dataJogo": "2026-07-18T19:00:00", "timeA": "Perdedor Jogo 101", "timeB": "Perdedor Jogo 102", "ccA": "un", "ccB": "un", "cidade": "Miami", "placarOficialA": null, "placarOficialB": null}, {"id": 104, "fase": "final", "grupo": null, "rodada": null, "dataJogo": "2026-07-19T17:00:00", "timeA": "Vencedor Jogo 101", "timeB": "Vencedor Jogo 102", "ccA": "un", "ccB": "un", "cidade": "Nova York/NJ", "placarOficialA": null, "placarOficialB": null}];
const PALPITES_INICIAIS = {"1_Alcides": {"a": 1, "b": 2}, "1_Bruno": {"a": 3, "b": 2}, "1_Erick": {"a": 2, "b": 0}, "1_Wes": {"a": 1, "b": 0}, "1_Mauricio": {"a": 2, "b": 1}, "1_Felipão": {"a": 2, "b": 0}, "1_Leo Vituzzo": {"a": 2, "b": 0}, "1_Danilo": {"a": 2, "b": 1}, "1_Leo Cunha": {"a": 2, "b": 0}, "1_Evandro": {"a": 3, "b": 1}, "2_Alcides": {"a": 3, "b": 1}, "2_Bruno": {"a": 1, "b": 2}, "2_Erick": {"a": 1, "b": 0}, "2_Wes": {"a": 0, "b": 2}, "2_Mauricio": {"a": 1, "b": 1}, "2_Felipão": {"a": 3, "b": 1}, "2_Leo Vituzzo": {"a": 1, "b": 1}, "2_Danilo": {"a": 0, "b": 2}, "2_Leo Cunha": {"a": 1, "b": 1}, "2_Evandro": {"a": 2, "b": 0}, "25_Alcides": {"a": 1, "b": 2}, "25_Bruno": {"a": 2, "b": 1}, "25_Erick": {"a": 2, "b": 1}, "25_Wes": {"a": 1, "b": 0}, "25_Felipão": {"a": 2, "b": 0}, "25_Leo Vituzzo": {"a": 2, "b": 1}, "25_Leo Cunha": {"a": 2, "b": 1}, "25_Evandro": {"a": 1, "b": 0}, "28_Alcides": {"a": 2, "b": 3}, "28_Bruno": {"a": 1, "b": 2}, "28_Erick": {"a": 3, "b": 2}, "28_Wes": {"a": 2, "b": 1}, "28_Felipão": {"a": 1, "b": 1}, "28_Leo Vituzzo": {"a": 2, "b": 1}, "28_Leo Cunha": {"a": 2, "b": 1}, "28_Evandro": {"a": 2, "b": 2}, "53_Alcides": {"a": 0, "b": 2}, "53_Bruno": {"a": 1, "b": 3}, "53_Erick": {"a": 0, "b": 2}, "53_Wes": {"a": 1, "b": 1}, "53_Felipão": {"a": 1, "b": 2}, "53_Leo Vituzzo": {"a": 1, "b": 1}, "53_Evandro": {"a": 1, "b": 2}, "54_Alcides": {"a": 0, "b": 2}, "54_Bruno": {"a": 1, "b": 3}, "54_Erick": {"a": 0, "b": 1}, "54_Wes": {"a": 1, "b": 0}, "54_Felipão": {"a": 0, "b": 2}, "54_Leo Vituzzo": {"a": 1, "b": 2}, "54_Evandro": {"a": 0, "b": 3}, "3_Alcides": {"a": 1, "b": 1}, "3_Bruno": {"a": 2, "b": 1}, "3_Erick": {"a": 3, "b": 1}, "3_Wes": {"a": 2, "b": 1}, "3_Mauricio": {"a": 2, "b": 1}, "3_Felipão": {"a": 1, "b": 1}, "3_Leo Vituzzo": {"a": 2, "b": 1}, "3_Danilo": {"a": 3, "b": 0}, "3_Leo Cunha": {"a": 2, "b": 1}, "3_Evandro": {"a": 2, "b": 1}, "6_Alcides": {"a": 0, "b": 2}, "6_Bruno": {"a": 0, "b": 2}, "6_Erick": {"a": 0, "b": 1}, "6_Wes": {"a": 0, "b": 1}, "6_Mauricio": {"a": 0, "b": 2}, "6_Felipão": {"a": 0, "b": 2}, "6_Leo Vituzzo": {"a": 1, "b": 2}, "6_Danilo": {"a": 0, "b": 3}, "6_Leo Cunha": {"a": 0, "b": 2}, "6_Evandro": {"a": 0, "b": 3}, "26_Alcides": {"a": 4, "b": 1}, "26_Bruno": {"a": 1, "b": 1}, "26_Erick": {"a": 2, "b": 0}, "26_Wes": {"a": 1, "b": 0}, "26_Felipão": {"a": 2, "b": 1}, "26_Leo Vituzzo": {"a": 2, "b": 0}, "26_Leo Cunha": {"a": 1, "b": 1}, "26_Evandro": {"a": 2, "b": 1}, "27_Alcides": {"a": 1, "b": 3}, "27_Bruno": {"a": 2, "b": 0}, "27_Erick": {"a": 3, "b": 1}, "27_Wes": {"a": 2, "b": 0}, "27_Felipão": {"a": 0, "b": 1}, "27_Leo Vituzzo": {"a": 2, "b": 0}, "27_Leo Cunha": {"a": 2, "b": 1}, "27_Evandro": {"a": 2, "b": 1}, "49_Alcides": {"a": 3, "b": 0}, "49_Bruno": {"a": 2, "b": 1}, "49_Erick": {"a": 2, "b": 2}, "49_Wes": {"a": 1, "b": 1}, "49_Felipão": {"a": 1, "b": 0}, "49_Leo Vituzzo": {"a": 1, "b": 1}, "49_Evandro": {"a": 1, "b": 0}, "50_Alcides": {"a": 1, "b": 3}, "50_Bruno": {"a": 1, "b": 0}, "50_Erick": {"a": 3, "b": 2}, "50_Wes": {"a": 1, "b": 0}, "50_Felipão": {"a": 2, "b": 1}, "50_Leo Vituzzo": {"a": 2, "b": 1}, "50_Evandro": {"a": 2, "b": 0}, "7_Alcides": {"a": 2, "b": 0}, "7_Bruno": {"a": 3, "b": 1}, "7_Erick": {"a": 2, "b": 2}, "7_Wes": {"a": 2, "b": 0}, "7_Mauricio": {"a": 2, "b": 1}, "7_Felipão": {"a": 3, "b": 1}, "7_Leo Vituzzo": {"a": 2, "b": 1}, "7_Danilo": {"a": 1, "b": 1}, "7_Leo Cunha": {"a": 3, "b": 0}, "7_Evandro": {"a": 2, "b": 2}, "8_Alcides": {"a": 1, "b": 0}, "8_Bruno": {"a": 0, "b": 2}, "8_Erick": {"a": 1, "b": 3}, "8_Wes": {"a": 0, "b": 1}, "8_Mauricio": {"a": 0, "b": 3}, "8_Felipão": {"a": 1, "b": 0}, "8_Leo Vituzzo": {"a": 0, "b": 2}, "8_Danilo": {"a": 0, "b": 2}, "8_Leo Cunha": {"a": 1, "b": 1}, "8_Evandro": {"a": 0, "b": 3}, "31_Alcides": {"a": 1, "b": 2}, "31_Bruno": {"a": 1, "b": 3}, "31_Erick": {"a": 1, "b": 3}, "31_Wes": {"a": 1, "b": 2}, "31_Felipão": {"a": 1, "b": 1}, "31_Leo Vituzzo": {"a": 1, "b": 1}, "31_Evandro": {"a": 1, "b": 3}, "32_Alcides": {"a": 5, "b": 1}, "32_Bruno": {"a": 4, "b": 0}, "32_Erick": {"a": 4, "b": 0}, "32_Wes": {"a": 4, "b": 0}, "32_Felipão": {"a": 3, "b": 1}, "32_Leo Vituzzo": {"a": 4, "b": 0}, "32_Evandro": {"a": 5, "b": 0}, "51_Alcides": {"a": 0, "b": 2}, "51_Bruno": {"a": 1, "b": 3}, "51_Erick": {"a": 3, "b": 1}, "51_Wes": {"a": 1, "b": 3}, "51_Felipão": {"a": 1, "b": 3}, "51_Leo Vituzzo": {"a": 1, "b": 2}, "51_Evandro": {"a": 1, "b": 3}, "52_Alcides": {"a": 4, "b": 1}, "52_Bruno": {"a": 3, "b": 0}, "52_Erick": {"a": 4, "b": 1}, "52_Wes": {"a": 3, "b": 0}, "52_Felipão": {"a": 2, "b": 0}, "52_Leo Vituzzo": {"a": 3, "b": 0}, "52_Evandro": {"a": 3, "b": 1}, "4_Alcides": {"a": 0, "b": 0}, "4_Bruno": {"a": 1, "b": 2}, "4_Erick": {"a": 2, "b": 1}, "4_Wes": {"a": 1, "b": 0}, "4_Mauricio": {"a": 1, "b": 1}, "4_Felipão": {"a": 1, "b": 2}, "4_Leo Vituzzo": {"a": 2, "b": 1}, "4_Danilo": {"a": 2, "b": 1}, "4_Leo Cunha": {"a": 2, "b": 2}, "4_Evandro": {"a": 0, "b": 1}, "5_Alcides": {"a": 0, "b": 1}, "5_Bruno": {"a": 1, "b": 2}, "5_Erick": {"a": 0, "b": 1}, "5_Wes": {"a": 2, "b": 0}, "5_Mauricio": {"a": 1, "b": 2}, "5_Felipão": {"a": 1, "b": 1}, "5_Leo Vituzzo": {"a": 1, "b": 2}, "5_Danilo": {"a": 1, "b": 1}, "5_Leo Cunha": {"a": 1, "b": 0}, "5_Evandro": {"a": 0, "b": 2}, "29_Alcides": {"a": 5, "b": 0}, "29_Bruno": {"a": 2, "b": 0}, "29_Erick": {"a": 3, "b": 0}, "29_Wes": {"a": 1, "b": 1}, "29_Felipão": {"a": 0, "b": 0}, "29_Leo Vituzzo": {"a": 2, "b": 1}, "29_Evandro": {"a": 2, "b": 2}, "30_Alcides": {"a": 2, "b": 1}, "30_Bruno": {"a": 2, "b": 1}, "30_Erick": {"a": 3, "b": 1}, "30_Wes": {"a": 2, "b": 1}, "30_Felipão": {"a": 2, "b": 2}, "30_Leo Vituzzo": {"a": 2, "b": 0}, "30_Evandro": {"a": 3, "b": 2}, "59_Alcides": {"a": 4, "b": 0}, "59_Bruno": {"a": 1, "b": 1}, "59_Erick": {"a": 1, "b": 2}, "59_Wes": {"a": 2, "b": 2}, "59_Felipão": {"a": 1, "b": 0}, "59_Leo Vituzzo": {"a": 1, "b": 1}, "59_Evandro": {"a": 1, "b": 3}, "60_Alcides": {"a": 1, "b": 0}, "60_Bruno": {"a": 1, "b": 2}, "60_Erick": {"a": 0, "b": 1}, "60_Wes": {"a": 2, "b": 0}, "60_Felipão": {"a": 2, "b": 1}, "60_Leo Vituzzo": {"a": 1, "b": 1}, "60_Evandro": {"a": 2, "b": 1}, "9_Alcides": {"a": 6, "b": 1}, "9_Bruno": {"a": 3, "b": 0}, "9_Erick": {"a": 5, "b": 0}, "9_Wes": {"a": 3, "b": 0}, "9_Mauricio": {"a": 5, "b": 0}, "9_Felipão": {"a": 7, "b": 0}, "9_Leo Vituzzo": {"a": 4, "b": 0}, "9_Danilo": {"a": 6, "b": 0}, "9_Leo Cunha": {"a": 5, "b": 0}, "9_Evandro": {"a": 6, "b": 0}, "11_Alcides": {"a": 1, "b": 2}, "11_Bruno": {"a": 1, "b": 1}, "11_Erick": {"a": 1, "b": 1}, "11_Wes": {"a": 1, "b": 0}, "11_Mauricio": {"a": 3, "b": 0}, "11_Felipão": {"a": 2, "b": 1}, "11_Leo Vituzzo": {"a": 1, "b": 1}, "11_Danilo": {"a": 2, "b": 1}, "11_Leo Cunha": {"a": 2, "b": 0}, "11_Evandro": {"a": 1, "b": 3}, "34_Alcides": {"a": 2, "b": 0}, "34_Bruno": {"a": 3, "b": 1}, "34_Erick": {"a": 4, "b": 1}, "34_Wes": {"a": 2, "b": 1}, "34_Felipão": {"a": 3, "b": 1}, "34_Leo Vituzzo": {"a": 3, "b": 1}, "34_Evandro": {"a": 2, "b": 0}, "35_Alcides": {"a": 4, "b": 1}, "35_Bruno": {"a": 1, "b": 2}, "35_Erick": {"a": 3, "b": 0}, "35_Wes": {"a": 2, "b": 0}, "35_Felipão": {"a": 4, "b": 0}, "35_Leo Vituzzo": {"a": 2, "b": 0}, "35_Evandro": {"a": 4, "b": 1}, "55_Alcides": {"a": 0, "b": 2}, "55_Bruno": {"a": 1, "b": 3}, "55_Erick": {"a": 1, "b": 2}, "55_Wes": {"a": 1, "b": 2}, "55_Felipão": {"a": 0, "b": 2}, "55_Leo Vituzzo": {"a": 1, "b": 2}, "55_Evandro": {"a": 2, "b": 2}, "56_Alcides": {"a": 2, "b": 6}, "56_Bruno": {"a": 1, "b": 2}, "56_Erick": {"a": 2, "b": 3}, "56_Wes": {"a": 0, "b": 3}, "56_Felipão": {"a": 1, "b": 4}, "56_Leo Vituzzo": {"a": 0, "b": 2}, "56_Evandro": {"a": 1, "b": 3}, "10_Alcides": {"a": 2, "b": 2}, "10_Bruno": {"a": 2, "b": 1}, "10_Erick": {"a": 2, "b": 1}, "10_Wes": {"a": 2, "b": 1}, "10_Mauricio": {"a": 2, "b": 0}, "10_Felipão": {"a": 2, "b": 2}, "10_Leo Vituzzo": {"a": 2, "b": 1}, "10_Danilo": {"a": 2, "b": 1}, "10_Leo Cunha": {"a": 2, "b": 1}, "10_Evandro": {"a": 1, "b": 1}, "12_Alcides": {"a": 1, "b": 0}, "12_Bruno": {"a": 1, "b": 1}, "12_Erick": {"a": 1, "b": 0}, "12_Wes": {"a": 1, "b": 0}, "12_Mauricio": {"a": 2, "b": 1}, "12_Felipão": {"a": 2, "b": 1}, "12_Leo Vituzzo": {"a": 1, "b": 0}, "12_Danilo": {"a": 1, "b": 0}, "12_Leo Cunha": {"a": 2, "b": 0}, "12_Evandro": {"a": 3, "b": 1}, "36_Alcides": {"a": 1, "b": 1}, "36_Bruno": {"a": 1, "b": 3}, "36_Erick": {"a": 1, "b": 2}, "36_Wes": {"a": 0, "b": 2}, "36_Felipão": {"a": 1, "b": 1}, "36_Leo Vituzzo": {"a": 1, "b": 2}, "36_Evandro": {"a": 0, "b": 2}, "33_Alcides": {"a": 0, "b": 1}, "33_Bruno": {"a": 2, "b": 1}, "33_Erick": {"a": 1, "b": 0}, "33_Wes": {"a": 1, "b": 1}, "33_Felipão": {"a": 3, "b": 1}, "33_Leo Vituzzo": {"a": 1, "b": 1}, "33_Evandro": {"a": 1, "b": 1}, "57_Alcides": {"a": 1, "b": 2}, "57_Bruno": {"a": 1, "b": 0}, "57_Erick": {"a": 2, "b": 2}, "57_Wes": {"a": 1, "b": 1}, "57_Felipão": {"a": 2, "b": 1}, "57_Leo Vituzzo": {"a": 1, "b": 1}, "57_Evandro": {"a": 0, "b": 0}, "58_Alcides": {"a": 2, "b": 1}, "58_Bruno": {"a": 1, "b": 2}, "58_Erick": {"a": 1, "b": 3}, "58_Wes": {"a": 0, "b": 3}, "58_Felipão": {"a": 0, "b": 3}, "58_Leo Vituzzo": {"a": 0, "b": 2}, "58_Evandro": {"a": 1, "b": 3}, "14_Alcides": {"a": 3, "b": 0}, "14_Bruno": {"a": 1, "b": 2}, "14_Erick": {"a": 3, "b": 0}, "14_Wes": {"a": 2, "b": 1}, "14_Felipão": {"a": 2, "b": 2}, "14_Leo Vituzzo": {"a": 2, "b": 0}, "14_Danilo": {"a": 2, "b": 1}, "14_Leo Cunha": {"a": 3, "b": 1}, "14_Evandro": {"a": 1, "b": 1}, "16_Alcides": {"a": 5, "b": 1}, "16_Bruno": {"a": 0, "b": 2}, "16_Erick": {"a": 1, "b": 1}, "16_Wes": {"a": 2, "b": 0}, "16_Felipão": {"a": 1, "b": 0}, "16_Leo Vituzzo": {"a": 2, "b": 1}, "16_Danilo": {"a": 1, "b": 1}, "16_Leo Cunha": {"a": 1, "b": 1}, "16_Evandro": {"a": 0, "b": 0}, "38_Alcides": {"a": 3, "b": 1}, "38_Bruno": {"a": 3, "b": 0}, "38_Erick": {"a": 3, "b": 2}, "38_Wes": {"a": 2, "b": 0}, "38_Felipão": {"a": 2, "b": 1}, "38_Leo Vituzzo": {"a": 2, "b": 1}, "38_Evandro": {"a": 3, "b": 0}, "40_Alcides": {"a": 0, "b": 0}, "40_Bruno": {"a": 1, "b": 2}, "40_Erick": {"a": 2, "b": 1}, "40_Wes": {"a": 1, "b": 0}, "40_Felipão": {"a": 0, "b": 0}, "40_Leo Vituzzo": {"a": 1, "b": 2}, "40_Evandro": {"a": 1, "b": 3}, "65_Alcides": {"a": 0, "b": 3}, "65_Bruno": {"a": 3, "b": 1}, "65_Erick": {"a": 1, "b": 3}, "65_Wes": {"a": 1, "b": 1}, "65_Felipão": {"a": 1, "b": 1}, "65_Leo Vituzzo": {"a": 1, "b": 1}, "65_Evandro": {"a": 2, "b": 1}, "66_Alcides": {"a": 3, "b": 2}, "66_Bruno": {"a": 1, "b": 2}, "66_Erick": {"a": 0, "b": 2}, "66_Wes": {"a": 0, "b": 3}, "66_Felipão": {"a": 0, "b": 3}, "66_Leo Vituzzo": {"a": 0, "b": 3}, "66_Evandro": {"a": 0, "b": 3}, "13_Alcides": {"a": 9, "b": 0}, "13_Bruno": {"a": 4, "b": 0}, "13_Erick": {"a": 5, "b": 0}, "13_Wes": {"a": 4, "b": 0}, "13_Felipão": {"a": 6, "b": 0}, "13_Leo Vituzzo": {"a": 3, "b": 0}, "13_Danilo": {"a": 7, "b": 0}, "13_Leo Cunha": {"a": 5, "b": 0}, "13_Evandro": {"a": 7, "b": 0}, "15_Alcides": {"a": 0, "b": 2}, "15_Bruno": {"a": 1, "b": 2}, "15_Erick": {"a": 0, "b": 3}, "15_Wes": {"a": 1, "b": 2}, "15_Felipão": {"a": 1, "b": 3}, "15_Leo Vituzzo": {"a": 0, "b": 2}, "15_Danilo": {"a": 1, "b": 2}, "15_Leo Cunha": {"a": 1, "b": 2}, "15_Evandro": {"a": 1, "b": 2}, "37_Alcides": {"a": 4, "b": 1}, "37_Bruno": {"a": 4, "b": 1}, "37_Erick": {"a": 3, "b": 1}, "37_Wes": {"a": 3, "b": 0}, "37_Felipão": {"a": 3, "b": 1}, "37_Leo Vituzzo": {"a": 3, "b": 1}, "37_Evandro": {"a": 3, "b": 1}, "39_Alcides": {"a": 6, "b": 1}, "39_Bruno": {"a": 3, "b": 0}, "39_Erick": {"a": 3, "b": 0}, "39_Wes": {"a": 2, "b": 1}, "39_Felipão": {"a": 4, "b": 0}, "39_Leo Vituzzo": {"a": 2, "b": 0}, "39_Evandro": {"a": 4, "b": 0}, "63_Alcides": {"a": 1, "b": 1}, "63_Bruno": {"a": 1, "b": 2}, "63_Erick": {"a": 0, "b": 0}, "63_Wes": {"a": 1, "b": 1}, "63_Felipão": {"a": 0, "b": 2}, "63_Leo Vituzzo": {"a": 1, "b": 1}, "63_Evandro": {"a": 1, "b": 3}, "64_Alcides": {"a": 1, "b": 3}, "64_Bruno": {"a": 1, "b": 3}, "64_Erick": {"a": 1, "b": 2}, "64_Wes": {"a": 1, "b": 2}, "64_Felipão": {"a": 2, "b": 2}, "64_Leo Vituzzo": {"a": 1, "b": 1}, "64_Evandro": {"a": 2, "b": 3}, "18_Alcides": {"a": 1, "b": 1}, "18_Bruno": {"a": 4, "b": 1}, "18_Erick": {"a": 4, "b": 1}, "18_Wes": {"a": 2, "b": 1}, "18_Felipão": {"a": 2, "b": 1}, "18_Leo Vituzzo": {"a": 2, "b": 1}, "18_Leo Cunha": {"a": 5, "b": 0}, "18_Evandro": {"a": 4, "b": 1}, "19_Alcides": {"a": 0, "b": 0}, "19_Bruno": {"a": 1, "b": 2}, "19_Erick": {"a": 0, "b": 1}, "19_Wes": {"a": 0, "b": 3}, "19_Felipão": {"a": 1, "b": 2}, "19_Leo Vituzzo": {"a": 0, "b": 2}, "19_Leo Cunha": {"a": 0, "b": 2}, "19_Evandro": {"a": 0, "b": 2}, "42_Alcides": {"a": 4, "b": 1}, "42_Bruno": {"a": 4, "b": 0}, "42_Erick": {"a": 5, "b": 0}, "42_Wes": {"a": 4, "b": 0}, "42_Felipão": {"a": 3, "b": 0}, "42_Leo Vituzzo": {"a": 3, "b": 0}, "42_Evandro": {"a": 5, "b": 0}, "43_Alcides": {"a": 1, "b": 1}, "43_Bruno": {"a": 2, "b": 0}, "43_Erick": {"a": 2, "b": 0}, "43_Wes": {"a": 1, "b": 2}, "43_Felipão": {"a": 1, "b": 1}, "43_Leo Vituzzo": {"a": 1, "b": 1}, "43_Evandro": {"a": 1, "b": 1}, "61_Alcides": {"a": 1, "b": 2}, "61_Bruno": {"a": 0, "b": 2}, "61_Erick": {"a": 1, "b": 3}, "61_Wes": {"a": 2, "b": 3}, "61_Felipão": {"a": 1, "b": 2}, "61_Leo Vituzzo": {"a": 1, "b": 2}, "61_Evandro": {"a": 1, "b": 3}, "62_Alcides": {"a": 6, "b": 2}, "62_Bruno": {"a": 2, "b": 1}, "62_Erick": {"a": 1, "b": 1}, "62_Wes": {"a": 2, "b": 0}, "62_Felipão": {"a": 0, "b": 0}, "62_Leo Vituzzo": {"a": 2, "b": 0}, "62_Evandro": {"a": 3, "b": 1}, "20_Alcides": {"a": 2, "b": 1}, "20_Bruno": {"a": 2, "b": 2}, "20_Erick": {"a": 1, "b": 1}, "20_Wes": {"a": 2, "b": 0}, "20_Felipão": {"a": 2, "b": 1}, "20_Leo Vituzzo": {"a": 2, "b": 0}, "20_Leo Cunha": {"a": 2, "b": 0}, "20_Evandro": {"a": 3, "b": 0}, "17_Alcides": {"a": 4, "b": 1}, "17_Bruno": {"a": 3, "b": 0}, "17_Erick": {"a": 4, "b": 0}, "17_Wes": {"a": 2, "b": 0}, "17_Felipão": {"a": 3, "b": 0}, "17_Leo Vituzzo": {"a": 3, "b": 0}, "17_Leo Cunha": {"a": 4, "b": 0}, "17_Evandro": {"a": 4, "b": 0}, "41_Alcides": {"a": 4, "b": 2}, "41_Bruno": {"a": 4, "b": 0}, "41_Erick": {"a": 3, "b": 1}, "41_Wes": {"a": 2, "b": 1}, "41_Felipão": {"a": 2, "b": 0}, "41_Leo Vituzzo": {"a": 2, "b": 0}, "41_Evandro": {"a": 3, "b": 2}, "44_Alcides": {"a": 1, "b": 2}, "44_Bruno": {"a": 1, "b": 1}, "44_Erick": {"a": 2, "b": 0}, "44_Wes": {"a": 1, "b": 2}, "44_Felipão": {"a": 1, "b": 1}, "44_Leo Vituzzo": {"a": 1, "b": 2}, "44_Evandro": {"a": 1, "b": 1}, "71_Alcides": {"a": 1, "b": 3}, "71_Bruno": {"a": 2, "b": 2}, "71_Erick": {"a": 0, "b": 2}, "71_Wes": {"a": 1, "b": 1}, "71_Felipão": {"a": 0, "b": 1}, "71_Leo Vituzzo": {"a": 1, "b": 1}, "71_Evandro": {"a": 1, "b": 3}, "72_Alcides": {"a": 0, "b": 6}, "72_Bruno": {"a": 0, "b": 4}, "72_Erick": {"a": 0, "b": 5}, "72_Wes": {"a": 0, "b": 3}, "72_Felipão": {"a": 1, "b": 2}, "72_Leo Vituzzo": {"a": 0, "b": 3}, "72_Evandro": {"a": 0, "b": 5}, "21_Alcides": {"a": 6, "b": 1}, "21_Bruno": {"a": 3, "b": 0}, "21_Erick": {"a": 4, "b": 0}, "21_Wes": {"a": 3, "b": 0}, "21_Felipão": {"a": 3, "b": 1}, "21_Leo Vituzzo": {"a": 3, "b": 0}, "21_Leo Cunha": {"a": 4, "b": 0}, "21_Evandro": {"a": 6, "b": 0}, "24_Alcides": {"a": 0, "b": 4}, "24_Bruno": {"a": 0, "b": 2}, "24_Erick": {"a": 0, "b": 2}, "24_Wes": {"a": 0, "b": 2}, "24_Felipão": {"a": 0, "b": 2}, "24_Leo Vituzzo": {"a": 0, "b": 2}, "24_Leo Cunha": {"a": 0, "b": 2}, "24_Evandro": {"a": 0, "b": 2}, "45_Alcides": {"a": 6, "b": 1}, "45_Bruno": {"a": 4, "b": 0}, "45_Erick": {"a": 3, "b": 1}, "45_Wes": {"a": 2, "b": 0}, "45_Felipão": {"a": 2, "b": 0}, "45_Leo Vituzzo": {"a": 3, "b": 1}, "45_Evandro": {"a": 3, "b": 1}, "48_Alcides": {"a": 5, "b": 1}, "48_Bruno": {"a": 2, "b": 0}, "48_Erick": {"a": 4, "b": 2}, "48_Wes": {"a": 1, "b": 0}, "48_Felipão": {"a": 1, "b": 1}, "48_Leo Vituzzo": {"a": 2, "b": 0}, "48_Evandro": {"a": 4, "b": 0}, "69_Alcides": {"a": 1, "b": 2}, "69_Bruno": {"a": 2, "b": 3}, "69_Erick": {"a": 1, "b": 2}, "69_Wes": {"a": 1, "b": 1}, "69_Felipão": {"a": 0, "b": 2}, "69_Leo Vituzzo": {"a": 1, "b": 1}, "69_Evandro": {"a": 2, "b": 2}, "70_Alcides": {"a": 1, "b": 2}, "70_Bruno": {"a": 2, "b": 2}, "70_Erick": {"a": 0, "b": 0}, "70_Wes": {"a": 1, "b": 1}, "70_Felipão": {"a": 1, "b": 0}, "70_Leo Vituzzo": {"a": 1, "b": 1}, "70_Evandro": {"a": 1, "b": 2}, "22_Alcides": {"a": 1, "b": 0}, "22_Bruno": {"a": 1, "b": 1}, "22_Erick": {"a": 3, "b": 1}, "22_Wes": {"a": 2, "b": 1}, "22_Felipão": {"a": 2, "b": 2}, "22_Leo Vituzzo": {"a": 2, "b": 1}, "22_Leo Cunha": {"a": 3, "b": 2}, "22_Evandro": {"a": 3, "b": 2}, "23_Alcides": {"a": 4, "b": 2}, "23_Bruno": {"a": 2, "b": 1}, "23_Erick": {"a": 1, "b": 2}, "23_Wes": {"a": 2, "b": 1}, "23_Felipão": {"a": 3, "b": 0}, "23_Leo Vituzzo": {"a": 2, "b": 1}, "23_Leo Cunha": {"a": 1, "b": 1}, "23_Evandro": {"a": 2, "b": 1}, "46_Alcides": {"a": 1, "b": 0}, "46_Bruno": {"a": 2, "b": 0}, "46_Erick": {"a": 4, "b": 0}, "46_Wes": {"a": 1, "b": 0}, "46_Felipão": {"a": 2, "b": 2}, "46_Leo Vituzzo": {"a": 2, "b": 0}, "46_Evandro": {"a": 3, "b": 1}, "47_Alcides": {"a": 0, "b": 2}, "47_Bruno": {"a": 0, "b": 2}, "47_Erick": {"a": 0, "b": 3}, "47_Wes": {"a": 0, "b": 1}, "47_Felipão": {"a": 0, "b": 3}, "47_Leo Vituzzo": {"a": 0, "b": 2}, "47_Evandro": {"a": 0, "b": 2}, "67_Alcides": {"a": 0, "b": 3}, "67_Bruno": {"a": 0, "b": 3}, "67_Erick": {"a": 1, "b": 3}, "67_Wes": {"a": 0, "b": 2}, "67_Felipão": {"a": 1, "b": 4}, "67_Leo Vituzzo": {"a": 0, "b": 3}, "67_Evandro": {"a": 1, "b": 5}, "68_Alcides": {"a": 1, "b": 0}, "68_Bruno": {"a": 2, "b": 0}, "68_Erick": {"a": 2, "b": 0}, "68_Wes": {"a": 2, "b": 1}, "68_Felipão": {"a": 2, "b": 2}, "68_Leo Vituzzo": {"a": 1, "b": 1}, "68_Evandro": {"a": 1, "b": 1}};
const NOME_PARA_CC = {"México": "mx", "África do Sul": "za", "Coreia do Sul": "kr", "República Tcheca": "cz", "Canadá": "ca", "Bósnia e Herzegovina": "ba", "Estados Unidos": "us", "Paraguai": "py", "Austrália": "au", "Turquia": "tr", "Catar": "qa", "Suíça": "ch", "Brasil": "br", "Marrocos": "ma", "Haiti": "ht", "Escócia": "gb-sct", "Alemanha": "de", "Curaçao": "cw", "Holanda": "nl", "Japão": "jp", "Costa do Marfim": "ci", "Equador": "ec", "Suécia": "se", "Tunísia": "tn", "Espanha": "es", "Cabo Verde": "cv", "Bélgica": "be", "Egito": "eg", "Arábia Saudita": "sa", "Uruguai": "uy", "Irã": "ir", "Nova Zelândia": "nz", "Argentina": "ar", "Argélia": "dz", "França": "fr", "Senegal": "sn", "Iraque": "iq", "Noruega": "no", "Áustria": "at", "Jordânia": "jo", "Portugal": "pt", "RD Congo": "cd", "Inglaterra": "gb-eng", "Croácia": "hr", "Gana": "gh", "Panamá": "pa", "Uzbequistão": "uz", "Colômbia": "co"};

const PALPITES_CLAUDE = {"1_Claude": {"a": 2, "b": 0}, "2_Claude": {"a": 2, "b": 1}, "3_Claude": {"a": 2, "b": 1}, "4_Claude": {"a": 4, "b": 1}, "5_Claude": {"a": 0, "b": 1}, "6_Claude": {"a": 0, "b": 2}, "7_Claude": {"a": 2, "b": 0}, "8_Claude": {"a": 0, "b": 2}, "9_Claude": {"a": 7, "b": 1}, "10_Claude": {"a": 2, "b": 1}, "11_Claude": {"a": 1, "b": 0}, "12_Claude": {"a": 1, "b": 0}, "13_Claude": {"a": 0, "b": 0}, "14_Claude": {"a": 3, "b": 0}, "15_Claude": {"a": 1, "b": 2}, "16_Claude": {"a": 2, "b": 2}, "17_Claude": {"a": 3, "b": 0}, "18_Claude": {"a": 3, "b": 1}, "19_Claude": {"a": 1, "b": 4}, "20_Claude": {"a": 3, "b": 1}, "21_Claude": {"a": 3, "b": 0}, "22_Claude": {"a": 2, "b": 1}, "23_Claude": {"a": 1, "b": 1}, "24_Claude": {"a": 0, "b": 2}, "25_Claude": {"a": 1, "b": 1}, "26_Claude": {"a": 2, "b": 1}, "27_Claude": {"a": 2, "b": 0}, "28_Claude": {"a": 2, "b": 1}, "29_Claude": {"a": 2, "b": 1}, "30_Claude": {"a": 3, "b": 1}, "31_Claude": {"a": 1, "b": 2}, "32_Claude": {"a": 4, "b": 0}, "33_Claude": {"a": 2, "b": 1}, "34_Claude": {"a": 3, "b": 1}, "35_Claude": {"a": 2, "b": 0}, "36_Claude": {"a": 1, "b": 2}, "37_Claude": {"a": 3, "b": 0}, "38_Claude": {"a": 2, "b": 1}, "39_Claude": {"a": 3, "b": 0}, "40_Claude": {"a": 0, "b": 2}, "41_Claude": {"a": 4, "b": 0}, "42_Claude": {"a": 4, "b": 0}, "43_Claude": {"a": 1, "b": 1}, "44_Claude": {"a": 1, "b": 2}, "45_Claude": {"a": 3, "b": 0}, "46_Claude": {"a": 2, "b": 0}, "47_Claude": {"a": 0, "b": 2}, "48_Claude": {"a": 2, "b": 0}, "49_Claude": {"a": 1, "b": 0}, "50_Claude": {"a": 1, "b": 2}, "51_Claude": {"a": 0, "b": 3}, "52_Claude": {"a": 3, "b": 0}, "53_Claude": {"a": 0, "b": 2}, "54_Claude": {"a": 0, "b": 2}, "55_Claude": {"a": 1, "b": 2}, "56_Claude": {"a": 0, "b": 2}, "57_Claude": {"a": 1, "b": 1}, "58_Claude": {"a": 0, "b": 3}, "59_Claude": {"a": 1, "b": 2}, "60_Claude": {"a": 0, "b": 1}, "61_Claude": {"a": 1, "b": 2}, "62_Claude": {"a": 2, "b": 0}, "63_Claude": {"a": 0, "b": 1}, "64_Claude": {"a": 1, "b": 2}, "65_Claude": {"a": 1, "b": 1}, "66_Claude": {"a": 0, "b": 5}, "67_Claude": {"a": 0, "b": 2}, "68_Claude": {"a": 2, "b": 1}, "69_Claude": {"a": 0, "b": 0}, "70_Claude": {"a": 1, "b": 3}, "71_Claude": {"a": 3, "b": 3}, "72_Claude": {"a": 1, "b": 3}, "73_Claude": {"a": 0, "b": 2}, "74_Claude": {"a": 2, "b": 0}, "75_Claude": {"a": 3, "b": 0}, "76_Claude": {"a": 1, "b": 1}, "77_Claude": {"a": 1, "b": 2}, "78_Claude": {"a": 3, "b": 0}, "79_Claude": {"a": 2, "b": 1}, "80_Claude": {"a": 2, "b": 0}, "81_Claude": {"a": 2, "b": 1}, "82_Claude": {"a": 2, "b": 0}, "83_Claude": {"a": 3, "b": 0}, "84_Claude": {"a": 2, "b": 1}, "85_Claude": {"a": 2, "b": 0}, "86_Claude": {"a": 0, "b": 1}, "87_Claude": {"a": 4, "b": 0}, "88_Claude": {"a": 2, "b": 0}, "89_Claude": {"a": 1, "b": 2}, "90_Claude": {"a": 1, "b": 2}, "91_Claude": {"a": 2, "b": 1}, "92_Claude": {"a": 2, "b": 1}, "93_Claude": {"a": 2, "b": 1}, "94_Claude": {"a": 2, "b": 1}, "95_Claude": {"a": 2, "b": 0}, "96_Claude": {"a": 2, "b": 1}};

const NOVOS_PALPITES_IMPORT = {"1_Alcides": {"a": 1, "b": 2}, "1_Bruno": {"a": 3, "b": 2}, "1_Erick": {"a": 2, "b": 0}, "1_Wes": {"a": 1, "b": 0}, "1_Mauricio": {"a": 2, "b": 1}, "1_Felipão": {"a": 2, "b": 0}, "1_Leo Vituzzo": {"a": 2, "b": 0}, "1_Danilo": {"a": 2, "b": 1}, "1_Leo Cunha": {"a": 2, "b": 0}, "1_Evandro": {"a": 3, "b": 1}, "2_Alcides": {"a": 3, "b": 1}, "2_Bruno": {"a": 1, "b": 2}, "2_Erick": {"a": 1, "b": 0}, "2_Wes": {"a": 0, "b": 2}, "2_Mauricio": {"a": 1, "b": 1}, "2_Felipão": {"a": 3, "b": 1}, "2_Leo Vituzzo": {"a": 1, "b": 1}, "2_Danilo": {"a": 0, "b": 2}, "2_Leo Cunha": {"a": 1, "b": 1}, "2_Evandro": {"a": 2, "b": 0}, "25_Alcides": {"a": 1, "b": 2}, "25_Bruno": {"a": 2, "b": 1}, "25_Erick": {"a": 2, "b": 1}, "25_Wes": {"a": 1, "b": 0}, "25_Felipão": {"a": 2, "b": 0}, "25_Leo Vituzzo": {"a": 2, "b": 1}, "25_Leo Cunha": {"a": 2, "b": 1}, "25_Evandro": {"a": 1, "b": 0}, "28_Alcides": {"a": 2, "b": 3}, "28_Bruno": {"a": 1, "b": 2}, "28_Erick": {"a": 3, "b": 2}, "28_Wes": {"a": 2, "b": 1}, "28_Felipão": {"a": 1, "b": 1}, "28_Leo Vituzzo": {"a": 2, "b": 1}, "28_Leo Cunha": {"a": 2, "b": 1}, "28_Evandro": {"a": 2, "b": 2}, "53_Alcides": {"a": 0, "b": 2}, "53_Bruno": {"a": 1, "b": 3}, "53_Erick": {"a": 0, "b": 2}, "53_Wes": {"a": 1, "b": 1}, "53_Felipão": {"a": 1, "b": 2}, "53_Leo Vituzzo": {"a": 1, "b": 1}, "53_Evandro": {"a": 1, "b": 2}, "54_Alcides": {"a": 0, "b": 2}, "54_Bruno": {"a": 1, "b": 3}, "54_Erick": {"a": 0, "b": 1}, "54_Wes": {"a": 1, "b": 0}, "54_Felipão": {"a": 0, "b": 2}, "54_Leo Vituzzo": {"a": 1, "b": 2}, "54_Evandro": {"a": 0, "b": 3}, "3_Alcides": {"a": 1, "b": 1}, "3_Bruno": {"a": 2, "b": 1}, "3_Erick": {"a": 3, "b": 1}, "3_Wes": {"a": 2, "b": 1}, "3_Mauricio": {"a": 2, "b": 1}, "3_Felipão": {"a": 1, "b": 1}, "3_Leo Vituzzo": {"a": 2, "b": 1}, "3_Danilo": {"a": 3, "b": 0}, "3_Leo Cunha": {"a": 2, "b": 1}, "3_Evandro": {"a": 2, "b": 1}, "6_Alcides": {"a": 0, "b": 2}, "6_Bruno": {"a": 0, "b": 2}, "6_Erick": {"a": 0, "b": 1}, "6_Wes": {"a": 0, "b": 1}, "6_Mauricio": {"a": 0, "b": 2}, "6_Felipão": {"a": 0, "b": 2}, "6_Leo Vituzzo": {"a": 1, "b": 2}, "6_Danilo": {"a": 0, "b": 3}, "6_Leo Cunha": {"a": 0, "b": 2}, "6_Evandro": {"a": 0, "b": 3}, "26_Alcides": {"a": 4, "b": 1}, "26_Bruno": {"a": 1, "b": 1}, "26_Erick": {"a": 2, "b": 0}, "26_Wes": {"a": 1, "b": 0}, "26_Felipão": {"a": 2, "b": 1}, "26_Leo Vituzzo": {"a": 2, "b": 0}, "26_Leo Cunha": {"a": 1, "b": 1}, "26_Evandro": {"a": 2, "b": 1}, "27_Alcides": {"a": 1, "b": 3}, "27_Bruno": {"a": 2, "b": 0}, "27_Erick": {"a": 3, "b": 1}, "27_Wes": {"a": 2, "b": 0}, "27_Felipão": {"a": 0, "b": 1}, "27_Leo Vituzzo": {"a": 2, "b": 0}, "27_Leo Cunha": {"a": 2, "b": 1}, "27_Evandro": {"a": 2, "b": 1}, "49_Alcides": {"a": 3, "b": 0}, "49_Bruno": {"a": 2, "b": 1}, "49_Erick": {"a": 2, "b": 2}, "49_Wes": {"a": 1, "b": 1}, "49_Felipão": {"a": 1, "b": 0}, "49_Leo Vituzzo": {"a": 1, "b": 1}, "49_Evandro": {"a": 1, "b": 0}, "50_Alcides": {"a": 1, "b": 3}, "50_Bruno": {"a": 1, "b": 0}, "50_Erick": {"a": 3, "b": 2}, "50_Wes": {"a": 1, "b": 0}, "50_Felipão": {"a": 2, "b": 1}, "50_Leo Vituzzo": {"a": 2, "b": 1}, "50_Evandro": {"a": 2, "b": 0}, "7_Alcides": {"a": 2, "b": 0}, "7_Bruno": {"a": 3, "b": 1}, "7_Erick": {"a": 2, "b": 2}, "7_Wes": {"a": 2, "b": 0}, "7_Mauricio": {"a": 2, "b": 1}, "7_Felipão": {"a": 3, "b": 1}, "7_Leo Vituzzo": {"a": 2, "b": 1}, "7_Danilo": {"a": 1, "b": 1}, "7_Leo Cunha": {"a": 3, "b": 0}, "7_Evandro": {"a": 2, "b": 2}, "8_Alcides": {"a": 1, "b": 0}, "8_Bruno": {"a": 0, "b": 2}, "8_Erick": {"a": 1, "b": 3}, "8_Wes": {"a": 0, "b": 1}, "8_Mauricio": {"a": 0, "b": 3}, "8_Felipão": {"a": 1, "b": 0}, "8_Leo Vituzzo": {"a": 0, "b": 2}, "8_Danilo": {"a": 0, "b": 2}, "8_Leo Cunha": {"a": 1, "b": 1}, "8_Evandro": {"a": 0, "b": 3}, "31_Alcides": {"a": 1, "b": 2}, "31_Bruno": {"a": 1, "b": 3}, "31_Erick": {"a": 1, "b": 3}, "31_Wes": {"a": 1, "b": 2}, "31_Felipão": {"a": 1, "b": 1}, "31_Leo Vituzzo": {"a": 1, "b": 1}, "31_Evandro": {"a": 1, "b": 3}, "32_Alcides": {"a": 5, "b": 1}, "32_Bruno": {"a": 4, "b": 0}, "32_Erick": {"a": 4, "b": 0}, "32_Wes": {"a": 4, "b": 0}, "32_Felipão": {"a": 3, "b": 1}, "32_Leo Vituzzo": {"a": 4, "b": 0}, "32_Evandro": {"a": 5, "b": 0}, "51_Alcides": {"a": 0, "b": 2}, "51_Bruno": {"a": 1, "b": 3}, "51_Erick": {"a": 3, "b": 1}, "51_Wes": {"a": 1, "b": 3}, "51_Felipão": {"a": 1, "b": 3}, "51_Leo Vituzzo": {"a": 1, "b": 2}, "51_Evandro": {"a": 1, "b": 3}, "52_Alcides": {"a": 4, "b": 1}, "52_Bruno": {"a": 3, "b": 0}, "52_Erick": {"a": 4, "b": 1}, "52_Wes": {"a": 3, "b": 0}, "52_Felipão": {"a": 2, "b": 0}, "52_Leo Vituzzo": {"a": 3, "b": 0}, "52_Evandro": {"a": 3, "b": 1}, "4_Alcides": {"a": 0, "b": 0}, "4_Bruno": {"a": 1, "b": 2}, "4_Erick": {"a": 2, "b": 1}, "4_Wes": {"a": 1, "b": 0}, "4_Mauricio": {"a": 1, "b": 1}, "4_Felipão": {"a": 1, "b": 2}, "4_Leo Vituzzo": {"a": 2, "b": 1}, "4_Danilo": {"a": 2, "b": 1}, "4_Leo Cunha": {"a": 2, "b": 2}, "4_Evandro": {"a": 0, "b": 1}, "5_Alcides": {"a": 0, "b": 1}, "5_Bruno": {"a": 1, "b": 2}, "5_Erick": {"a": 0, "b": 1}, "5_Wes": {"a": 2, "b": 0}, "5_Mauricio": {"a": 1, "b": 2}, "5_Felipão": {"a": 1, "b": 1}, "5_Leo Vituzzo": {"a": 1, "b": 2}, "5_Danilo": {"a": 1, "b": 1}, "5_Leo Cunha": {"a": 1, "b": 0}, "5_Evandro": {"a": 0, "b": 2}, "29_Alcides": {"a": 5, "b": 0}, "29_Bruno": {"a": 2, "b": 0}, "29_Erick": {"a": 3, "b": 0}, "29_Wes": {"a": 1, "b": 1}, "29_Felipão": {"a": 0, "b": 0}, "29_Leo Vituzzo": {"a": 2, "b": 1}, "29_Evandro": {"a": 2, "b": 2}, "30_Alcides": {"a": 2, "b": 1}, "30_Bruno": {"a": 2, "b": 1}, "30_Erick": {"a": 3, "b": 1}, "30_Wes": {"a": 2, "b": 1}, "30_Felipão": {"a": 2, "b": 2}, "30_Leo Vituzzo": {"a": 2, "b": 0}, "30_Evandro": {"a": 3, "b": 2}, "59_Alcides": {"a": 4, "b": 0}, "59_Bruno": {"a": 1, "b": 1}, "59_Erick": {"a": 1, "b": 2}, "59_Wes": {"a": 2, "b": 2}, "59_Felipão": {"a": 1, "b": 0}, "59_Leo Vituzzo": {"a": 1, "b": 1}, "59_Evandro": {"a": 1, "b": 3}, "60_Alcides": {"a": 1, "b": 0}, "60_Bruno": {"a": 1, "b": 2}, "60_Erick": {"a": 0, "b": 1}, "60_Wes": {"a": 2, "b": 0}, "60_Felipão": {"a": 2, "b": 1}, "60_Leo Vituzzo": {"a": 1, "b": 1}, "60_Evandro": {"a": 2, "b": 1}, "9_Alcides": {"a": 6, "b": 1}, "9_Bruno": {"a": 3, "b": 0}, "9_Erick": {"a": 5, "b": 0}, "9_Wes": {"a": 3, "b": 0}, "9_Mauricio": {"a": 5, "b": 0}, "9_Felipão": {"a": 7, "b": 0}, "9_Leo Vituzzo": {"a": 4, "b": 0}, "9_Danilo": {"a": 6, "b": 0}, "9_Leo Cunha": {"a": 5, "b": 0}, "9_Evandro": {"a": 6, "b": 0}, "11_Alcides": {"a": 1, "b": 2}, "11_Bruno": {"a": 1, "b": 1}, "11_Erick": {"a": 1, "b": 1}, "11_Wes": {"a": 1, "b": 0}, "11_Mauricio": {"a": 3, "b": 0}, "11_Felipão": {"a": 2, "b": 1}, "11_Leo Vituzzo": {"a": 1, "b": 1}, "11_Danilo": {"a": 2, "b": 1}, "11_Leo Cunha": {"a": 2, "b": 0}, "11_Evandro": {"a": 1, "b": 3}, "34_Alcides": {"a": 2, "b": 0}, "34_Bruno": {"a": 3, "b": 1}, "34_Erick": {"a": 4, "b": 1}, "34_Wes": {"a": 2, "b": 1}, "34_Felipão": {"a": 3, "b": 1}, "34_Leo Vituzzo": {"a": 3, "b": 1}, "34_Evandro": {"a": 2, "b": 0}, "35_Alcides": {"a": 4, "b": 1}, "35_Bruno": {"a": 1, "b": 2}, "35_Erick": {"a": 3, "b": 0}, "35_Wes": {"a": 2, "b": 0}, "35_Felipão": {"a": 4, "b": 0}, "35_Leo Vituzzo": {"a": 2, "b": 0}, "35_Evandro": {"a": 4, "b": 1}, "55_Alcides": {"a": 0, "b": 2}, "55_Bruno": {"a": 1, "b": 3}, "55_Erick": {"a": 1, "b": 2}, "55_Wes": {"a": 1, "b": 2}, "55_Felipão": {"a": 0, "b": 2}, "55_Leo Vituzzo": {"a": 1, "b": 2}, "55_Evandro": {"a": 2, "b": 2}, "56_Alcides": {"a": 2, "b": 6}, "56_Bruno": {"a": 1, "b": 2}, "56_Erick": {"a": 2, "b": 3}, "56_Wes": {"a": 0, "b": 3}, "56_Felipão": {"a": 1, "b": 4}, "56_Leo Vituzzo": {"a": 0, "b": 2}, "56_Evandro": {"a": 1, "b": 3}, "10_Alcides": {"a": 2, "b": 2}, "10_Bruno": {"a": 2, "b": 1}, "10_Erick": {"a": 2, "b": 1}, "10_Wes": {"a": 2, "b": 1}, "10_Mauricio": {"a": 2, "b": 0}, "10_Felipão": {"a": 2, "b": 2}, "10_Leo Vituzzo": {"a": 2, "b": 1}, "10_Danilo": {"a": 2, "b": 1}, "10_Leo Cunha": {"a": 2, "b": 1}, "10_Evandro": {"a": 1, "b": 1}, "12_Alcides": {"a": 1, "b": 0}, "12_Bruno": {"a": 1, "b": 1}, "12_Erick": {"a": 1, "b": 0}, "12_Wes": {"a": 1, "b": 0}, "12_Mauricio": {"a": 2, "b": 1}, "12_Felipão": {"a": 2, "b": 1}, "12_Leo Vituzzo": {"a": 1, "b": 0}, "12_Danilo": {"a": 1, "b": 0}, "12_Leo Cunha": {"a": 2, "b": 0}, "12_Evandro": {"a": 3, "b": 1}, "36_Alcides": {"a": 1, "b": 1}, "36_Bruno": {"a": 1, "b": 3}, "36_Erick": {"a": 1, "b": 2}, "36_Wes": {"a": 0, "b": 2}, "36_Felipão": {"a": 1, "b": 1}, "36_Leo Vituzzo": {"a": 1, "b": 2}, "36_Evandro": {"a": 0, "b": 2}, "33_Alcides": {"a": 0, "b": 1}, "33_Bruno": {"a": 2, "b": 1}, "33_Erick": {"a": 1, "b": 0}, "33_Wes": {"a": 1, "b": 1}, "33_Felipão": {"a": 3, "b": 1}, "33_Leo Vituzzo": {"a": 1, "b": 1}, "33_Evandro": {"a": 1, "b": 1}, "57_Alcides": {"a": 1, "b": 2}, "57_Bruno": {"a": 1, "b": 0}, "57_Erick": {"a": 2, "b": 2}, "57_Wes": {"a": 1, "b": 1}, "57_Felipão": {"a": 2, "b": 1}, "57_Leo Vituzzo": {"a": 1, "b": 1}, "57_Evandro": {"a": 0, "b": 0}, "58_Alcides": {"a": 2, "b": 1}, "58_Bruno": {"a": 1, "b": 2}, "58_Erick": {"a": 1, "b": 3}, "58_Wes": {"a": 0, "b": 3}, "58_Felipão": {"a": 0, "b": 3}, "58_Leo Vituzzo": {"a": 0, "b": 2}, "58_Evandro": {"a": 1, "b": 3}, "14_Alcides": {"a": 3, "b": 0}, "14_Bruno": {"a": 1, "b": 2}, "14_Erick": {"a": 3, "b": 0}, "14_Wes": {"a": 2, "b": 1}, "14_Felipão": {"a": 2, "b": 2}, "14_Leo Vituzzo": {"a": 2, "b": 0}, "14_Danilo": {"a": 2, "b": 1}, "14_Leo Cunha": {"a": 3, "b": 1}, "14_Evandro": {"a": 1, "b": 1}, "16_Alcides": {"a": 5, "b": 1}, "16_Bruno": {"a": 0, "b": 2}, "16_Erick": {"a": 1, "b": 1}, "16_Wes": {"a": 2, "b": 0}, "16_Felipão": {"a": 1, "b": 0}, "16_Leo Vituzzo": {"a": 2, "b": 1}, "16_Danilo": {"a": 1, "b": 1}, "16_Leo Cunha": {"a": 1, "b": 1}, "16_Evandro": {"a": 0, "b": 0}, "38_Alcides": {"a": 3, "b": 1}, "38_Bruno": {"a": 3, "b": 0}, "38_Erick": {"a": 3, "b": 2}, "38_Wes": {"a": 2, "b": 0}, "38_Felipão": {"a": 2, "b": 1}, "38_Leo Vituzzo": {"a": 2, "b": 1}, "38_Evandro": {"a": 3, "b": 0}, "40_Alcides": {"a": 0, "b": 0}, "40_Bruno": {"a": 1, "b": 2}, "40_Erick": {"a": 2, "b": 1}, "40_Wes": {"a": 1, "b": 0}, "40_Felipão": {"a": 0, "b": 0}, "40_Leo Vituzzo": {"a": 1, "b": 2}, "40_Evandro": {"a": 1, "b": 3}, "65_Alcides": {"a": 0, "b": 3}, "65_Bruno": {"a": 3, "b": 1}, "65_Erick": {"a": 1, "b": 3}, "65_Wes": {"a": 1, "b": 1}, "65_Felipão": {"a": 1, "b": 1}, "65_Leo Vituzzo": {"a": 1, "b": 1}, "65_Evandro": {"a": 2, "b": 1}, "66_Alcides": {"a": 3, "b": 2}, "66_Bruno": {"a": 1, "b": 2}, "66_Erick": {"a": 0, "b": 2}, "66_Wes": {"a": 0, "b": 3}, "66_Felipão": {"a": 0, "b": 3}, "66_Leo Vituzzo": {"a": 0, "b": 3}, "66_Evandro": {"a": 0, "b": 3}, "13_Alcides": {"a": 9, "b": 0}, "13_Bruno": {"a": 4, "b": 0}, "13_Erick": {"a": 5, "b": 0}, "13_Wes": {"a": 4, "b": 0}, "13_Felipão": {"a": 6, "b": 0}, "13_Leo Vituzzo": {"a": 3, "b": 0}, "13_Danilo": {"a": 7, "b": 0}, "13_Leo Cunha": {"a": 5, "b": 0}, "13_Evandro": {"a": 7, "b": 0}, "15_Alcides": {"a": 0, "b": 2}, "15_Bruno": {"a": 1, "b": 2}, "15_Erick": {"a": 0, "b": 3}, "15_Wes": {"a": 1, "b": 2}, "15_Felipão": {"a": 1, "b": 3}, "15_Leo Vituzzo": {"a": 0, "b": 2}, "15_Danilo": {"a": 1, "b": 2}, "15_Leo Cunha": {"a": 1, "b": 2}, "15_Evandro": {"a": 1, "b": 2}, "37_Alcides": {"a": 4, "b": 1}, "37_Bruno": {"a": 4, "b": 1}, "37_Erick": {"a": 3, "b": 1}, "37_Wes": {"a": 3, "b": 0}, "37_Felipão": {"a": 3, "b": 1}, "37_Leo Vituzzo": {"a": 3, "b": 1}, "37_Evandro": {"a": 3, "b": 1}, "39_Alcides": {"a": 6, "b": 1}, "39_Bruno": {"a": 3, "b": 0}, "39_Erick": {"a": 3, "b": 0}, "39_Wes": {"a": 2, "b": 1}, "39_Felipão": {"a": 4, "b": 0}, "39_Leo Vituzzo": {"a": 2, "b": 0}, "39_Evandro": {"a": 4, "b": 0}, "63_Alcides": {"a": 1, "b": 1}, "63_Bruno": {"a": 1, "b": 2}, "63_Erick": {"a": 0, "b": 0}, "63_Wes": {"a": 1, "b": 1}, "63_Felipão": {"a": 0, "b": 2}, "63_Leo Vituzzo": {"a": 1, "b": 1}, "63_Evandro": {"a": 1, "b": 3}, "64_Alcides": {"a": 1, "b": 3}, "64_Bruno": {"a": 1, "b": 3}, "64_Erick": {"a": 1, "b": 2}, "64_Wes": {"a": 1, "b": 2}, "64_Felipão": {"a": 2, "b": 2}, "64_Leo Vituzzo": {"a": 1, "b": 1}, "64_Evandro": {"a": 2, "b": 3}, "18_Alcides": {"a": 1, "b": 1}, "18_Bruno": {"a": 4, "b": 1}, "18_Erick": {"a": 4, "b": 1}, "18_Wes": {"a": 2, "b": 1}, "18_Felipão": {"a": 2, "b": 1}, "18_Leo Vituzzo": {"a": 2, "b": 1}, "18_Leo Cunha": {"a": 5, "b": 0}, "18_Evandro": {"a": 4, "b": 1}, "19_Alcides": {"a": 0, "b": 0}, "19_Bruno": {"a": 1, "b": 2}, "19_Erick": {"a": 0, "b": 1}, "19_Wes": {"a": 0, "b": 3}, "19_Felipão": {"a": 1, "b": 2}, "19_Leo Vituzzo": {"a": 0, "b": 2}, "19_Leo Cunha": {"a": 0, "b": 2}, "19_Evandro": {"a": 0, "b": 2}, "42_Alcides": {"a": 4, "b": 1}, "42_Bruno": {"a": 4, "b": 0}, "42_Erick": {"a": 5, "b": 0}, "42_Wes": {"a": 4, "b": 0}, "42_Felipão": {"a": 3, "b": 0}, "42_Leo Vituzzo": {"a": 3, "b": 0}, "42_Evandro": {"a": 5, "b": 0}, "43_Alcides": {"a": 1, "b": 1}, "43_Bruno": {"a": 2, "b": 0}, "43_Erick": {"a": 2, "b": 0}, "43_Wes": {"a": 1, "b": 2}, "43_Felipão": {"a": 1, "b": 1}, "43_Leo Vituzzo": {"a": 1, "b": 1}, "43_Evandro": {"a": 1, "b": 1}, "61_Alcides": {"a": 1, "b": 2}, "61_Bruno": {"a": 0, "b": 2}, "61_Erick": {"a": 1, "b": 3}, "61_Wes": {"a": 2, "b": 3}, "61_Felipão": {"a": 1, "b": 2}, "61_Leo Vituzzo": {"a": 1, "b": 2}, "61_Evandro": {"a": 1, "b": 3}, "62_Alcides": {"a": 6, "b": 2}, "62_Bruno": {"a": 2, "b": 1}, "62_Erick": {"a": 1, "b": 1}, "62_Wes": {"a": 2, "b": 0}, "62_Felipão": {"a": 0, "b": 0}, "62_Leo Vituzzo": {"a": 2, "b": 0}, "62_Evandro": {"a": 3, "b": 1}, "20_Alcides": {"a": 2, "b": 1}, "20_Bruno": {"a": 2, "b": 2}, "20_Erick": {"a": 1, "b": 1}, "20_Wes": {"a": 2, "b": 0}, "20_Felipão": {"a": 2, "b": 1}, "20_Leo Vituzzo": {"a": 2, "b": 0}, "20_Leo Cunha": {"a": 2, "b": 0}, "20_Evandro": {"a": 3, "b": 0}, "17_Alcides": {"a": 4, "b": 1}, "17_Bruno": {"a": 3, "b": 0}, "17_Erick": {"a": 4, "b": 0}, "17_Wes": {"a": 2, "b": 0}, "17_Felipão": {"a": 3, "b": 0}, "17_Leo Vituzzo": {"a": 3, "b": 0}, "17_Leo Cunha": {"a": 4, "b": 0}, "17_Evandro": {"a": 4, "b": 0}, "41_Alcides": {"a": 4, "b": 2}, "41_Bruno": {"a": 4, "b": 0}, "41_Erick": {"a": 3, "b": 1}, "41_Wes": {"a": 2, "b": 1}, "41_Felipão": {"a": 2, "b": 0}, "41_Leo Vituzzo": {"a": 2, "b": 0}, "41_Evandro": {"a": 3, "b": 2}, "44_Alcides": {"a": 1, "b": 2}, "44_Bruno": {"a": 1, "b": 1}, "44_Erick": {"a": 2, "b": 0}, "44_Wes": {"a": 1, "b": 2}, "44_Felipão": {"a": 1, "b": 1}, "44_Leo Vituzzo": {"a": 1, "b": 2}, "44_Evandro": {"a": 1, "b": 1}, "71_Alcides": {"a": 1, "b": 3}, "71_Bruno": {"a": 2, "b": 2}, "71_Erick": {"a": 0, "b": 2}, "71_Wes": {"a": 1, "b": 1}, "71_Felipão": {"a": 0, "b": 1}, "71_Leo Vituzzo": {"a": 1, "b": 1}, "71_Evandro": {"a": 1, "b": 3}, "72_Alcides": {"a": 0, "b": 6}, "72_Bruno": {"a": 0, "b": 4}, "72_Erick": {"a": 0, "b": 5}, "72_Wes": {"a": 0, "b": 3}, "72_Felipão": {"a": 1, "b": 2}, "72_Leo Vituzzo": {"a": 0, "b": 3}, "72_Evandro": {"a": 0, "b": 5}, "21_Alcides": {"a": 6, "b": 1}, "21_Bruno": {"a": 3, "b": 0}, "21_Erick": {"a": 4, "b": 0}, "21_Wes": {"a": 3, "b": 0}, "21_Felipão": {"a": 3, "b": 1}, "21_Leo Vituzzo": {"a": 3, "b": 0}, "21_Leo Cunha": {"a": 4, "b": 0}, "21_Evandro": {"a": 6, "b": 0}, "24_Alcides": {"a": 0, "b": 4}, "24_Bruno": {"a": 0, "b": 2}, "24_Erick": {"a": 0, "b": 2}, "24_Wes": {"a": 0, "b": 2}, "24_Felipão": {"a": 0, "b": 2}, "24_Leo Vituzzo": {"a": 0, "b": 2}, "24_Leo Cunha": {"a": 0, "b": 2}, "24_Evandro": {"a": 0, "b": 2}, "45_Alcides": {"a": 6, "b": 1}, "45_Bruno": {"a": 4, "b": 0}, "45_Erick": {"a": 3, "b": 1}, "45_Wes": {"a": 2, "b": 0}, "45_Felipão": {"a": 2, "b": 0}, "45_Leo Vituzzo": {"a": 3, "b": 1}, "45_Evandro": {"a": 3, "b": 1}, "48_Alcides": {"a": 5, "b": 1}, "48_Bruno": {"a": 2, "b": 0}, "48_Erick": {"a": 4, "b": 2}, "48_Wes": {"a": 1, "b": 0}, "48_Felipão": {"a": 1, "b": 1}, "48_Leo Vituzzo": {"a": 2, "b": 0}, "48_Evandro": {"a": 4, "b": 0}, "69_Alcides": {"a": 1, "b": 2}, "69_Bruno": {"a": 2, "b": 3}, "69_Erick": {"a": 1, "b": 2}, "69_Wes": {"a": 1, "b": 1}, "69_Felipão": {"a": 0, "b": 2}, "69_Leo Vituzzo": {"a": 1, "b": 1}, "69_Evandro": {"a": 2, "b": 2}, "70_Alcides": {"a": 1, "b": 2}, "70_Bruno": {"a": 2, "b": 2}, "70_Erick": {"a": 0, "b": 0}, "70_Wes": {"a": 1, "b": 1}, "70_Felipão": {"a": 1, "b": 0}, "70_Leo Vituzzo": {"a": 1, "b": 1}, "70_Evandro": {"a": 1, "b": 2}, "22_Alcides": {"a": 1, "b": 0}, "22_Bruno": {"a": 1, "b": 1}, "22_Erick": {"a": 3, "b": 1}, "22_Wes": {"a": 2, "b": 1}, "22_Felipão": {"a": 2, "b": 2}, "22_Leo Vituzzo": {"a": 2, "b": 1}, "22_Leo Cunha": {"a": 3, "b": 2}, "22_Evandro": {"a": 3, "b": 2}, "23_Alcides": {"a": 4, "b": 2}, "23_Bruno": {"a": 2, "b": 1}, "23_Erick": {"a": 1, "b": 2}, "23_Wes": {"a": 2, "b": 1}, "23_Felipão": {"a": 3, "b": 0}, "23_Leo Vituzzo": {"a": 2, "b": 1}, "23_Leo Cunha": {"a": 1, "b": 1}, "23_Evandro": {"a": 2, "b": 1}, "46_Alcides": {"a": 1, "b": 0}, "46_Bruno": {"a": 2, "b": 0}, "46_Erick": {"a": 4, "b": 0}, "46_Wes": {"a": 1, "b": 0}, "46_Felipão": {"a": 2, "b": 2}, "46_Leo Vituzzo": {"a": 2, "b": 0}, "46_Evandro": {"a": 3, "b": 1}, "47_Alcides": {"a": 0, "b": 2}, "47_Bruno": {"a": 0, "b": 2}, "47_Erick": {"a": 0, "b": 3}, "47_Wes": {"a": 0, "b": 1}, "47_Felipão": {"a": 0, "b": 3}, "47_Leo Vituzzo": {"a": 0, "b": 2}, "47_Evandro": {"a": 0, "b": 2}, "67_Alcides": {"a": 0, "b": 3}, "67_Bruno": {"a": 0, "b": 3}, "67_Erick": {"a": 1, "b": 3}, "67_Wes": {"a": 0, "b": 2}, "67_Felipão": {"a": 1, "b": 4}, "67_Leo Vituzzo": {"a": 0, "b": 3}, "67_Evandro": {"a": 1, "b": 5}, "68_Alcides": {"a": 1, "b": 0}, "68_Bruno": {"a": 2, "b": 0}, "68_Erick": {"a": 2, "b": 0}, "68_Wes": {"a": 2, "b": 1}, "68_Felipão": {"a": 2, "b": 2}, "68_Leo Vituzzo": {"a": 1, "b": 1}, "68_Evandro": {"a": 1, "b": 1}};
const EXTRAS_INICIAIS = {"Alcides": {"campeao": "Inglaterra", "vice": "Espanha", "terceiro": "Argentina", "artilheiro": "Harry Kane"}, "Bruno": {"campeao": "Brasil", "vice": "França", "terceiro": "Portugal", "artilheiro": "Mbappe"}, "Erick": {"campeao": "Espanha", "vice": "França", "terceiro": "Inglaterra", "artilheiro": "Mbappe"}, "Wes": {"campeao": "Brasil", "vice": "Espanha", "terceiro": "França", "artilheiro": "Vini Jr"}, "Mauricio": {"campeao": "França", "vice": "Espanha", "terceiro": "Argentina", "artilheiro": "Mbappe"}, "Felipão": {"campeao": "Argentina", "vice": "Espanha", "terceiro": "França", "artilheiro": "Lautaro Martínez"}, "Leo Vituzzo": {"campeao": "França", "vice": "Espanha", "terceiro": "Inglaterra", "artilheiro": "Mbappe"}, "Danilo": {"campeao": "França", "vice": "Espanha", "terceiro": "Portugal", "artilheiro": "Olise"}, "Leo Cunha": {"campeao": "Brasil", "vice": "França", "terceiro": "Argentina", "artilheiro": "Mbappe"}, "Evandro": {"campeao": "Portugal", "vice": "França", "terceiro": "Espanha", "artilheiro": "Harry Kane"}};
const USUARIOS_INICIAIS = ["Alcides", "Bruno", "Erick", "Wes", "Mauricio", "Felipão", "Leo Vituzzo", "Danilo", "Leo Cunha", "Evandro", "Claude"];
const ADMINS_INICIAIS = ["Alcides", "Felipão"];

const FASES = {
  grupos:    { nome: 'Fase de Grupos',          exato: 5,  vencedor: 2 },
  dezesseis: { nome: 'Dezesseis Avos de Final', exato: 5,  vencedor: 2 },
  oitavas:   { nome: 'Oitavas de Final',        exato: 6,  vencedor: 3 },
  quartas:   { nome: 'Quartas de Final',        exato: 8,  vencedor: 4 },
  semi:      { nome: 'Semifinal',               exato: 10, vencedor: 5 },
  terceiro:  { nome: '3º Lugar',                exato: 8,  vencedor: 4 },
  final:     { nome: 'Final',                   exato: 15, vencedor: 7 },
};

const SESSION_KEY = 'bolao_session_usuario';

function isLocked(jogo) {
  const limite = new Date(jogo.dataJogo).getTime() - 60 * 60 * 1000;
  return Date.now() >= limite;
}

async function hashSenha(senha) {
  const enc = new TextEncoder().encode('bolao2026_' + senha);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

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

/* ===================== CLASSIFICAÇÃO DE GRUPOS E RODADA DE 32 ===================== */

const GRUPOS_LETRAS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// mapeia jogo_id da Rodada de 32 -> { tipo: 'pos', posicao: '1'|'2', grupo: 'A' } ou { tipo: 'terceiro', grupos: ['A','B',...], ordem: 0 (1º melhor 3º entre os listados), label }
const CRUZAMENTO_R32 = {
  73: { a: { tipo: 'pos', posicao: 2, grupo: 'A' }, b: { tipo: 'pos', posicao: 2, grupo: 'B' } },
  74: { a: { tipo: 'pos', posicao: 1, grupo: 'E' }, b: { tipo: 'terceiro', grupos: ['A','B','C','D','F'] } },
  75: { a: { tipo: 'pos', posicao: 1, grupo: 'F' }, b: { tipo: 'pos', posicao: 2, grupo: 'C' } },
  76: { a: { tipo: 'pos', posicao: 1, grupo: 'C' }, b: { tipo: 'pos', posicao: 2, grupo: 'F' } },
  77: { a: { tipo: 'pos', posicao: 1, grupo: 'I' }, b: { tipo: 'terceiro', grupos: ['C','D','F','G','H'] } },
  78: { a: { tipo: 'pos', posicao: 2, grupo: 'E' }, b: { tipo: 'pos', posicao: 2, grupo: 'I' } },
  79: { a: { tipo: 'pos', posicao: 1, grupo: 'A' }, b: { tipo: 'terceiro', grupos: ['C','E','F','H','I'] } },
  80: { a: { tipo: 'pos', posicao: 1, grupo: 'L' }, b: { tipo: 'terceiro', grupos: ['E','H','I','J','K'] } },
  81: { a: { tipo: 'pos', posicao: 1, grupo: 'D' }, b: { tipo: 'terceiro', grupos: ['B','E','F','I','J'] } },
  82: { a: { tipo: 'pos', posicao: 1, grupo: 'G' }, b: { tipo: 'terceiro', grupos: ['A','E','H','I','J'] } },
  83: { a: { tipo: 'pos', posicao: 2, grupo: 'K' }, b: { tipo: 'pos', posicao: 2, grupo: 'L' } },
  84: { a: { tipo: 'pos', posicao: 1, grupo: 'H' }, b: { tipo: 'pos', posicao: 2, grupo: 'J' } },
  85: { a: { tipo: 'pos', posicao: 1, grupo: 'B' }, b: { tipo: 'terceiro', grupos: ['E','F','G','I','J'] } },
  86: { a: { tipo: 'pos', posicao: 1, grupo: 'J' }, b: { tipo: 'pos', posicao: 2, grupo: 'H' } },
  87: { a: { tipo: 'pos', posicao: 1, grupo: 'K' }, b: { tipo: 'terceiro', grupos: ['D','E','I','J','L'] } },
  88: { a: { tipo: 'pos', posicao: 2, grupo: 'D' }, b: { tipo: 'pos', posicao: 2, grupo: 'G' } },
};

// calcula a tabela de cada grupo (pts, saldo, gols pró) a partir dos jogos da fase de grupos já finalizados
function calcularClassificacaoGrupos(jogos) {
  const tabela = {}; // grupo -> { time: {pts, sg, gp, jogados} }
  GRUPOS_LETRAS.forEach(g => { tabela[g] = {}; });

  jogos.filter(j => j.fase === 'grupos').forEach(jogo => {
    const g = jogo.grupo;
    if (!g || !tabela[g]) return;
    [jogo.timeA, jogo.timeB].forEach(time => {
      if (!tabela[g][time]) tabela[g][time] = { time, pts: 0, sg: 0, gp: 0, jogados: 0 };
    });
    if (jogo.placarOficialA === null || jogo.placarOficialA === undefined) return;
    const A = tabela[g][jogo.timeA], B = tabela[g][jogo.timeB];
    A.jogados++; B.jogados++;
    A.gp += jogo.placarOficialA; B.gp += jogo.placarOficialB;
    A.sg += jogo.placarOficialA - jogo.placarOficialB;
    B.sg += jogo.placarOficialB - jogo.placarOficialA;
    if (jogo.placarOficialA > jogo.placarOficialB) A.pts += 3;
    else if (jogo.placarOficialA < jogo.placarOficialB) B.pts += 3;
    else { A.pts += 1; B.pts += 1; }
  });

  const ordenar = (times) => times.sort((x, y) => y.pts - x.pts || y.sg - x.sg || y.gp - x.gp);

  const resultado = {};
  GRUPOS_LETRAS.forEach(g => {
    const times = ordenar(Object.values(tabela[g]));
    resultado[g] = times; // [1º, 2º, 3º, 4º]
  });
  return resultado;
}

// verifica se um grupo está totalmente concluído (3 jogos de cada um dos 4 times = 6 jogos, todos com placar há mais de 4h)
function grupoConcluido(jogos, grupo, agora) {
  const jogosGrupo = jogos.filter(j => j.fase === 'grupos' && j.grupo === grupo);
  if (jogosGrupo.length === 0) return false;
  return jogosGrupo.every(j => {
    if (j.placarOficialA === null || j.placarOficialA === undefined) return false;
    const inicio = new Date(j.dataJogo).getTime();
    return agora - inicio >= 4 * 60 * 60 * 1000;
  });
}

// confrontos da R32 são gerenciados manualmente via Admin

function Flag({ cc, nome }) {
  if (!cc || cc === 'un') return <span title={nome} style={{ fontSize: 18 }}>🏳️</span>;
  const src = `https://flagcdn.com/w40/${cc}.png`;
  return (
    <img
      src={src}
      alt={nome}
      title={nome}
      style={{ width: 24, height: 18, objectFit: 'cover', borderRadius: 2, verticalAlign: 'middle', boxShadow: '0 0 0 1px rgba(0,0,0,0.08)', display: 'inline-block', flexShrink: 0 }}
      onError={(e) => { e.target.style.visibility = 'hidden'; }}
    />
  );
}

function Badge({ children, tone = 'default' }) {
  const tones = {
    default: { bg: '#1E2F66', color: '#FFD600' },
    open:    { bg: '#ECFDF5', color: '#047857' },
    locked:  { bg: '#FEF2F2', color: '#B91C1C' },
    done:    { bg: '#F1F5F9', color: '#475569' },
  };
  const t = tones[tone] || tones.default;
  return (
    <span style={{
      display: 'inline-block', fontSize: 11, fontWeight: 700, padding: '2px 8px',
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
      background: disabled ? '#94A3B8' : '#FFC400', color: disabled ? '#fff' : '#0E2080', border: 'none',
      borderRadius: 8, padding: small ? '6px 12px' : '10px 18px', fontSize: small ? 13 : 14,
      fontWeight: 800, cursor: disabled ? 'default' : 'pointer', transition: 'background 0.15s',
    }}>{children}</button>
  );
}

function SecondaryButton({ children, onClick, disabled, small }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)',
      borderRadius: 8, padding: small ? '6px 12px' : '10px 18px', fontSize: small ? 13 : 14,
      fontWeight: 700, cursor: disabled ? 'default' : 'pointer',
    }}>{children}</button>
  );
}

/* ===================== APP ===================== */

function MatchCard({ jogo, palpite, locked }) {
  if (!jogo) return (
    <div style={{ width: 170, background: '#F1F5F9', borderRadius: 8, border: '1px dashed #CBD5E1', padding: 0, minHeight: 74 }}>
      <div style={{ padding: '6px 8px', borderBottom: '1px solid #E2E8F0' }}>
        <div style={{ height: 14, background: '#E2E8F0', borderRadius: 3, width: '70%', marginBottom: 4 }} />
        <div style={{ height: 12, background: '#E2E8F0', borderRadius: 3, width: '50%' }} />
      </div>
      <div style={{ padding: '6px 8px' }}>
        <div style={{ height: 14, background: '#E2E8F0', borderRadius: 3, width: '70%', marginBottom: 4 }} />
        <div style={{ height: 12, background: '#E2E8F0', borderRadius: 3, width: '50%' }} />
      </div>
    </div>
  );

  const finalizado = jogo.placarOficialA !== null && jogo.placarOficialA !== undefined;
  const isPH = (n) => !n || n.startsWith('1º') || n.startsWith('2º') || n.startsWith('Melhor') || n.startsWith('Vencedor') || n.startsWith('Perdedor');
  const winA = finalizado && jogo.placarOficialA > jogo.placarOficialB;
  const winB = finalizado && jogo.placarOficialB > jogo.placarOficialA;
  const dataFmt = new Date(jogo.dataJogo).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
  const phA = isPH(jogo.timeA), phB = isPH(jogo.timeB);

  return (
    <div style={{ width: 170, background: '#fff', borderRadius: 8, border: `1px solid ${finalizado ? '#BBF7D0' : '#DDE3EE'}`, boxShadow: '0 1px 4px rgba(0,0,0,0.07)', overflow: 'hidden' }}>
      <div style={{ background: '#0E2080', padding: '3px 7px', fontSize: 10, color: '#FFD600', fontWeight: 700, display: 'flex', justifyContent: 'space-between', gap: 4 }}>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 90 }}>{jogo.cidade}</span>
        <span style={{ whiteSpace: 'nowrap' }}>{dataFmt}</span>
      </div>
      {[
        { nome: jogo.timeA, cc: jogo.ccA, gol: jogo.placarOficialA, win: winA, ph: phA },
        { nome: jogo.timeB, cc: jogo.ccB, gol: jogo.placarOficialB, win: winB, ph: phB },
      ].map((t, i) => (
        <div key={i} style={{
          display: 'flex', alignItems: 'center', gap: 5, padding: '5px 7px',
          background: t.win ? '#F0FDF4' : '#fff',
          borderTop: i === 1 ? '1px solid #F1F5F9' : 'none',
          minHeight: 28,
        }}>
          {!t.ph && <Flag cc={t.cc} nome={t.nome} />}
          {t.ph && <span style={{ width: 24, textAlign: 'center', color: '#CBD5E1', fontSize: 12 }}>?</span>}
          <span style={{
            flex: 1, fontSize: 11, fontWeight: t.win ? 800 : (t.ph ? 400 : 600),
            color: t.ph ? '#94A3B8' : '#0F172A', fontStyle: t.ph ? 'italic' : 'normal',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            {t.ph ? (t.nome || '?') : t.nome}
          </span>
          {finalizado && <span style={{ fontWeight: 800, fontSize: 13, color: t.win ? '#16A34A' : '#94A3B8', minWidth: 14, textAlign: 'right' }}>{t.gol}</span>}
        </div>
      ))}
      {palpite && !finalizado && (
        <div style={{ padding: '2px 7px', background: '#EEF2FF', fontSize: 10, color: '#3730A3', fontWeight: 700, textAlign: 'center' }}>
          Palpite: {palpite.a} x {palpite.b}
        </div>
      )}
    </div>
  );
}

function BracketFull({ jogos, palpites, usuario }) {
  const byId = {};
  jogos.forEach(j => { byId[j.id] = j; });

  // 8 linhas do bracket, cada uma com: r32a, r32b → oitava → quarta → semi → final
  const rows = [
    { r32: [73, 84], oitava: 93, quarta: 97, semi: 101, final: 104 },
    { r32: [74, 85], oitava: 93, quarta: 97, semi: 101, final: 104 },  // r32 invertido: só 73 e 74 alimentam oitava 93
    { r32: [76, 78], oitava: 89, quarta: 98, semi: 101, final: 104 },
    { r32: [77, 79], oitava: 90, quarta: 98, semi: 101, final: 104 },
    { r32: [86, 75], oitava: 95, quarta: 99, semi: 102, final: 104 },
    { r32: [87, 88], oitava: 96, quarta: 99, semi: 102, final: 104 },
    { r32: [80, 82], oitava: 91, quarta: 100, semi: 102, final: 104 },
    { r32: [81, 83], oitava: 92, quarta: 100, semi: 102, final: 104 },
  ];

  // Cada "célula" de bracket
  // Layout: R32 (2 cards por grupo) | Oitavas | Quartas | Semi | Final
  // 8 pares de R32 → 8 oitavas → 4 quartas → 2 semis → 1 final

  const CARD_H = 88;  // altura do card incluindo padding
  const GAP = 16;     // gap entre cards
  const COL_W = 182;  // largura do card
  const COL_GAP = 36; // gap entre colunas (para as linhas)
  const TOTAL_H = 8 * (CARD_H * 2 + GAP * 3); // altura total

  // posição vertical centralizada de um card em relação ao seu slot
  function slotTop(slotIndex, slotsTotal) {
    const slotH = TOTAL_H / slotsTotal;
    return slotIndex * slotH + slotH / 2 - CARD_H / 2;
  }

  // pares de R32 (8 pares, cada par = 2 jogos)
  const r32Pairs = [
    [73, 74], [84, 85],
    [76, 77], [78, 79],
    [86, 87], [75, 88],
    [80, 81], [82, 83],
  ];
  // oitavas (8)
  const oitavas = [93, 94, 89, 90, 95, 96, 91, 92];
  // quartas (4)
  const quartas = [97, 97, 98, 98, 99, 99, 100, 100];
  // semis (2)
  const semis = [101, 101, 101, 101, 102, 102, 102, 102];
  // final (1)
  const fId = 104;

  const phases = [
    { label: 'Rodada de 32', ids: r32Pairs.flat(), slots: 16 },
    { label: 'Oitavas', ids: oitavas, slots: 8 },
    { label: 'Quartas', ids: quartas, slots: 4 },  // deduplicated below
    { label: 'Semifinal', ids: semis, slots: 2 },
    { label: 'Final', ids: [fId], slots: 1 },
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: 16 }}>
      {/* cabeçalhos */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 10 }}>
        {['Rodada de 32', 'Oitavas de Final', 'Quartas de Final', 'Semifinal', 'Final'].map((label, i) => (
          <div key={label} style={{ width: COL_W + (i < 4 ? COL_GAP : 0), textAlign: 'center', fontSize: 11, fontWeight: 800, color: '#FFD600', textTransform: 'uppercase', letterSpacing: '0.06em', flexShrink: 0 }}>
            {label}
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', width: (COL_W + COL_GAP) * 4 + COL_W, height: TOTAL_H }}>
        {/* SVG linhas */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
          {/* R32 → Oitavas: cada par de R32 converge para 1 oitava */}
          {r32Pairs.map((pair, pi) => {
            const top1 = slotTop(pi * 2, 16);
            const top2 = slotTop(pi * 2 + 1, 16);
            const midA = top1 + CARD_H / 2;
            const midB = top2 + CARD_H / 2;
            const midC = (midA + midB) / 2;
            const x1 = COL_W;
            const x2 = COL_W + COL_GAP;
            return (
              <g key={`r32-oit-${pi}`} stroke="#4F6ECC" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.6">
                <path d={`M ${x1} ${midA} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
                <path d={`M ${x1} ${midB} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
              </g>
            );
          })}

          {/* Oitavas → Quartas: pares de oitavas convergem */}
          {[0, 1, 2, 3].map(qi => {
            const oi1 = qi * 2;
            const oi2 = qi * 2 + 1;
            const top1 = slotTop(oi1, 8) + CARD_H / 2;
            const top2 = slotTop(oi2, 8) + CARD_H / 2;
            const midC = (top1 + top2) / 2;
            const x1 = COL_W + COL_GAP + COL_W;
            const x2 = x1 + COL_GAP;
            return (
              <g key={`oit-q-${qi}`} stroke="#4F6ECC" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.6">
                <path d={`M ${x1} ${top1} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
                <path d={`M ${x1} ${top2} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
              </g>
            );
          })}

          {/* Quartas → Semis */}
          {[0, 1].map(si => {
            const qi1 = si * 2;
            const qi2 = si * 2 + 1;
            const top1 = slotTop(qi1, 4) + CARD_H / 2;
            const top2 = slotTop(qi2, 4) + CARD_H / 2;
            const midC = (top1 + top2) / 2;
            const x1 = (COL_W + COL_GAP) * 2 + COL_W;
            const x2 = x1 + COL_GAP;
            return (
              <g key={`q-s-${si}`} stroke="#4F6ECC" strokeWidth="1.5" fill="none" strokeDasharray="4 2" opacity="0.6">
                <path d={`M ${x1} ${top1} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
                <path d={`M ${x1} ${top2} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
              </g>
            );
          })}

          {/* Semis → Final */}
          {[0, 1].map(fi => {
            const top = slotTop(fi, 2) + CARD_H / 2;
            const midC = TOTAL_H / 2;
            const x1 = (COL_W + COL_GAP) * 3 + COL_W;
            const x2 = x1 + COL_GAP;
            return (
              <g key={`s-f-${fi}`} stroke="#FFD600" strokeWidth="2" fill="none" opacity="0.8">
                <path d={`M ${x1} ${top} H ${x1 + COL_GAP / 2} V ${midC} H ${x2}`} />
              </g>
            );
          })}
        </svg>

        {/* Cards R32 — 16 slots */}
        {r32Pairs.map((pair, pi) => (
          pair.map((jid, ji) => {
            const slotIdx = pi * 2 + ji;
            const top = slotTop(slotIdx, 16);
            return (
              <div key={jid} style={{ position: 'absolute', top, left: 0 }}>
                <MatchCard jogo={byId[jid]} palpite={palpites[`${jid}_${usuario}`]} />
              </div>
            );
          })
        ))}

        {/* Cards Oitavas — 8 slots */}
        {oitavas.filter((id, i, a) => a.indexOf(id) === i).map((jid, oi) => {
          const top = slotTop(oi, 8);
          return (
            <div key={jid} style={{ position: 'absolute', top, left: COL_W + COL_GAP }}>
              <MatchCard jogo={byId[jid]} palpite={palpites[`${jid}_${usuario}`]} />
            </div>
          );
        })}

        {/* Cards Quartas — 4 slots */}
        {[97, 98, 99, 100].map((jid, qi) => {
          const top = slotTop(qi, 4);
          return (
            <div key={jid} style={{ position: 'absolute', top, left: (COL_W + COL_GAP) * 2 }}>
              <MatchCard jogo={byId[jid]} palpite={palpites[`${jid}_${usuario}`]} />
            </div>
          );
        })}

        {/* Cards Semis — 2 slots */}
        {[101, 102].map((jid, si) => {
          const top = slotTop(si, 2);
          return (
            <div key={jid} style={{ position: 'absolute', top, left: (COL_W + COL_GAP) * 3 }}>
              <MatchCard jogo={byId[jid]} palpite={palpites[`${jid}_${usuario}`]} />
            </div>
          );
        })}

        {/* Final — 1 slot central */}
        <div style={{ position: 'absolute', top: TOTAL_H / 2 - CARD_H / 2, left: (COL_W + COL_GAP) * 4 }}>
          <MatchCard jogo={byId[fId]} palpite={palpites[`${fId}_${usuario}`]} />
        </div>
      </div>
    </div>
  );
}


function SplashScreen({ onDone }) {
  const [activeScene, setActiveScene] = React.useState(0);
  const [flashing, setFlashing] = React.useState(false);
  const [showFinal, setShowFinal] = React.useState(false);
  const [barWidth, setBarWidth] = React.useState(0);
  const [hiding, setHiding] = React.useState(false);

  const scenes = [
    { id: 's1970', bg: 'radial-gradient(ellipse at center,#2D5A1B 0%,#1A3A0A 100%)', year: '1970', detail: 'TRI · MÉXICO', badge: '🟡', desc: '⭐⭐⭐  PELÉ · TOSTÃO · RIVELINO', scanlines: true },
    { id: 's1982', bg: 'radial-gradient(ellipse at center,#1A1A6E 0%,#0A0A40 100%)', year: '1982', detail: 'ESPANHA', badge: '💙', desc: 'ZICO · SÓCRATES · FALCÃO\nA COPA QUE O MUNDO AMOU', descColor: '#FF6B6B' },
    { id: 's1994', bg: 'radial-gradient(ellipse at center,#8B0000 0%,#4A0000 100%)', year: '1994', detail: 'TETRA · EUA', badge: '🏆', desc: '⭐⭐⭐⭐  ROMÁRIO · BEBETO' },
    { id: 's2002', bg: 'radial-gradient(ellipse at center,#003580 0%,#001A4A 100%)', year: '2002', detail: 'PENTA · KOREA/JAPÃO', badge: '🌟', desc: '⭐⭐⭐⭐⭐ PENTACAMPEÃO ⭐⭐⭐⭐⭐', descColor: '#FFD700', descSize: 20 },
  ];

  function playSound() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      [0, 1.2, 2.4, 3.6].forEach((t, i) => {
        const o = ctx.createOscillator(), g = ctx.createGain();
        o.connect(g); g.connect(ctx.destination);
        o.type = 'sine';
        o.frequency.setValueAtTime(150, ctx.currentTime + t);
        o.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + t + 0.4);
        g.gain.setValueAtTime(0.5, ctx.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.4);
        o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.4);
        [400, 600, 800].forEach(freq => {
          const oc = ctx.createOscillator(), gc = ctx.createGain();
          oc.connect(gc); gc.connect(ctx.destination);
          oc.type = 'triangle'; oc.frequency.value = freq * (1 + i * 0.15);
          gc.gain.setValueAtTime(0.07, ctx.currentTime + t + 0.05);
          gc.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.5);
          oc.start(ctx.currentTime + t + 0.05); oc.stop(ctx.currentTime + t + 0.5);
        });
      });
      const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const src = ctx.createBufferSource(); src.buffer = buf;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 700; f.Q.value = 0.5;
      const cg = ctx.createGain();
      src.connect(f); f.connect(cg); cg.connect(ctx.destination);
      cg.gain.setValueAtTime(0, ctx.currentTime + 4.5);
      cg.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 5.5);
      cg.gain.linearRampToValueAtTime(0, ctx.currentTime + 7.5);
      src.start(ctx.currentTime + 4.5);
      const w = ctx.createOscillator(), wg = ctx.createGain();
      w.connect(wg); wg.connect(ctx.destination); w.type = 'sine';
      w.frequency.setValueAtTime(2800, ctx.currentTime + 5.2);
      w.frequency.linearRampToValueAtTime(3400, ctx.currentTime + 5.7);
      wg.gain.setValueAtTime(0.3, ctx.currentTime + 5.2);
      wg.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 5.9);
      w.start(ctx.currentTime + 5.2); w.stop(ctx.currentTime + 5.9);
    } catch (e) {}
  }

  React.useEffect(() => {
    playSound();
    const timers = [
      setTimeout(() => { setFlashing(true);  setTimeout(() => { setFlashing(false); setActiveScene(1); }, 120); }, 1200),
      setTimeout(() => { setFlashing(true);  setTimeout(() => { setFlashing(false); setActiveScene(2); }, 120); }, 2400),
      setTimeout(() => { setFlashing(true);  setTimeout(() => { setFlashing(false); setActiveScene(3); }, 120); }, 3600),
      setTimeout(() => { setFlashing(true);  setTimeout(() => { setFlashing(false); setActiveScene(4); setShowFinal(true); }, 120); }, 4800),
    ];
    // barra de progresso
    let p = 0;
    const barTimer = setTimeout(() => {
      const iv = setInterval(() => {
        p += 2; setBarWidth(p);
        if (p >= 100) {
          clearInterval(iv);
          setTimeout(() => { setHiding(true); setTimeout(onDone, 700); }, 300);
        }
      }, 40);
    }, 5000);
    return () => { timers.forEach(clearTimeout); clearTimeout(barTimer); };
  }, []);

  const scene = scenes[activeScene] || null;
  const confettiColors = ['#FFD700','#009C3B','#FFFFFF','#F9A021','#3CB6CE','#FD3F43'];

  const base = {
    position:'fixed', inset:0, display:'flex', flexDirection:'column',
    alignItems:'center', justifyContent:'center', fontFamily:"'Impact','Arial Black',system-ui,sans-serif",
    transition:'opacity 0.7s', opacity: hiding ? 0 : 1, zIndex: 999,
  };

  return (
    <div style={base}>
      {/* flash branco */}
      <div style={{ position:'fixed', inset:0, background:'#fff', opacity: flashing ? 0.85 : 0, transition:'opacity 0.08s', zIndex:1001, pointerEvents:'none' }} />

      {/* cenas históricas */}
      {activeScene < 4 && scene && (
        <div style={{
          position:'fixed', inset:0, background: scene.bg,
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          zIndex:1000,
        }}>
          {scene.scanlines && (
            <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.15) 3px,rgba(0,0,0,0.15) 4px)', pointerEvents:'none' }} />
          )}
          <div style={{ fontSize:'clamp(50px,10vw,90px)', marginBottom:16 }}>{scene.badge}</div>
          <div style={{ fontSize:'clamp(70px,15vw,130px)', color:'#FFD700', textShadow:'0 0 40px rgba(255,215,0,0.8)', letterSpacing:'0.05em', lineHeight:1 }}>{scene.year}</div>
          <div style={{ color: scene.id === 's1982' ? '#87CEEB' : '#FFD700', fontSize:'clamp(16px,3.5vw,30px)', letterSpacing:'0.2em', marginTop:8 }}>{scene.detail}</div>
          <div style={{ color: scene.descColor || 'rgba(255,255,255,0.75)', fontSize: scene.descSize || 'clamp(12px,2.5vw,18px)', marginTop:14, textAlign:'center', whiteSpace:'pre-line', fontFamily:'system-ui', letterSpacing:'0.08em' }}>{scene.desc}</div>
        </div>
      )}

      {/* cena final */}
      {activeScene === 4 && (
        <div style={{
          position:'fixed', inset:0,
          background:'linear-gradient(160deg,#0E2080 0%,#1530A6 45%,#0A1A5C 100%)',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
          zIndex:1000, overflow:'hidden',
        }}>
          {/* confetes */}
          {showFinal && confettiColors.map((color, ci) =>
            Array.from({length:6}).map((_, i) => (
              <div key={`${ci}-${i}`} style={{
                position:'absolute',
                left: `${Math.random()*100}%`,
                top: '-20px',
                width: `${7+Math.random()*8}px`,
                height: `${7+Math.random()*8}px`,
                background: color,
                borderRadius: 2,
                animation: `cfFall ${2.5+Math.random()*3}s ${Math.random()*1.5}s linear infinite`,
              }} />
            ))
          )}
          <style>{`
            @keyframes cfFall { 0%{opacity:1;transform:translateY(0) rotate(0deg)} 100%{opacity:0;transform:translateY(110vh) rotate(540deg)} }
            @keyframes trophyPulse { 0%,100%{filter:drop-shadow(0 0 20px rgba(255,196,0,0.7));transform:scale(1)} 50%{filter:drop-shadow(0 0 50px rgba(255,196,0,1));transform:scale(1.07)} }
          `}</style>
          <div style={{ fontSize:'clamp(60px,14vw,110px)', animation:'trophyPulse 1.5s ease-in-out infinite', position:'relative', zIndex:2 }}>🏆</div>
          <div style={{ color:'#FFD700', fontSize:'clamp(22px,5vw,38px)', letterSpacing:'0.06em', textAlign:'center', marginTop:16, textShadow:'0 2px 8px rgba(0,0,0,0.5)', position:'relative', zIndex:2 }}>BOLÃO COPA DO MUNDO</div>
          <div style={{ color:'rgba(255,255,255,0.75)', fontSize:'clamp(12px,2.5vw,18px)', letterSpacing:'0.14em', textTransform:'uppercase', marginTop:8, fontFamily:'system-ui', position:'relative', zIndex:2 }}>2026 · USA · Canada · México</div>
          <div style={{ fontSize:'clamp(24px,5vw,38px)', marginTop:14, letterSpacing:4, position:'relative', zIndex:2 }}>🇧🇷 🇺🇸 🇨🇦 🇲🇽 🇦🇷 🇫🇷</div>
          <div style={{ width:'min(220px,60vw)', height:3, background:'rgba(255,255,255,0.15)', borderRadius:99, marginTop:28, overflow:'hidden', position:'relative', zIndex:2 }}>
            <div style={{ height:'100%', width:`${barWidth}%`, background:'#FFD700', borderRadius:99, transition:'width 0.04s linear' }} />
          </div>
        </div>
      )}
    </div>
  );
}

function StadiumBackground() {
  return (
    <svg
      viewBox="0 0 1000 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    >
      <defs>
        <radialGradient id="spotlight" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stopColor="#3D5BD9" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#3D5BD9" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pitchFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16A34A" stopOpacity="0" />
          <stop offset="100%" stopColor="#15803D" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* glow geral vindo do topo */}
      <rect x="0" y="0" width="1000" height="1000" fill="url(#spotlight)" />

      {/* arquibancadas estilizadas */}
      <g opacity="0.18" fill="#FFFFFF">
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={i * 46} y={40 + (i % 3) * 6} width="34" height={70 - (i % 3) * 8} rx="4" />
        ))}
      </g>

      {/* holofotes */}
      {[120, 880].map((x, i) => (
        <g key={i}>
          <rect x={x - 6} y="0" width="12" height="130" fill="#FFFFFF" opacity="0.12" />
          <circle cx={x} cy="0" r="60" fill="#FFD600" opacity="0.10" />
          <polygon points={`${x},10 ${x - 140},480 ${x + 140},480`} fill="#FFD600" opacity="0.05" />
        </g>
      ))}

      {/* campo / gramado na base */}
      <rect x="0" y="700" width="1000" height="300" fill="url(#pitchFade)" />
      {Array.from({ length: 10 }).map((_, i) => (
        <rect key={i} x={i * 100} y="700" width="100" height="300" fill={i % 2 === 0 ? '#16A34A' : '#15803D'} opacity="0.10" />
      ))}
      <ellipse cx="500" cy="980" rx="220" ry="60" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.10" />
      <line x1="500" y1="700" x2="500" y2="1000" stroke="#FFFFFF" strokeWidth="2" opacity="0.10" />

      {/* bola de futebol estilizada */}
      <g transform="translate(850,790)" opacity="0.16">
        <circle r="55" fill="#FFFFFF" />
        <g fill="#0E2080">
          <polygon points="0,-55 16,-30 -16,-30" />
          <polygon points="0,55 16,30 -16,30" />
          <polygon points="-55,0 -30,-16 -30,16" />
          <polygon points="55,0 30,-16 30,16" />
          <polygon points="-22,-22 22,-22 28,0 0,28 -28,0" opacity="0.9" />
        </g>
      </g>

      {/* confetes */}
      <g>
        {[
          [80, 120, '#FFD600'], [200, 60, '#34D399'], [340, 160, '#F87171'],
          [470, 90, '#FFD600'], [600, 50, '#60A5FA'], [730, 140, '#FBBF24'],
          [860, 70, '#34D399'], [120, 250, '#F87171'], [950, 200, '#FFD600'],
          [40, 350, '#60A5FA'], [300, 30, '#FFFFFF'], [620, 230, '#F87171'],
        ].map(([x, y, c], i) => (
          <rect key={i} x={x} y={y} width="14" height="14" rx="2" fill={c} opacity="0.22"
            transform={`rotate(${(i * 37) % 360} ${x + 7} ${y + 7})`} />
        ))}
      </g>

      {/* bandeirinhas (estilo varal de festival) */}
      <g opacity="0.20">
        {[
          ['#16A34A', '#FBBF24', '#1E3A8A'], // BR
          ['#FFFFFF', '#CE1126', '#FFFFFF'], // generic
          ['#0055A4', '#FFFFFF', '#EF4135'], // FR-like
          ['#FFCE00', '#000000', '#DD0000'], // DE-like
          ['#FFFFFF', '#D52B1E', '#FFFFFF'], // CA-like
          ['#006847', '#FFFFFF', '#CE1126'], // generic2
        ].map((colors, i) => (
          <g key={i} transform={`translate(${60 + i * 160},190)`}>
            <line x1="0" y1="0" x2="60" y2="20" stroke="#FFFFFF" strokeWidth="1.5" />
            <polygon points="0,0 60,15 0,30" fill={colors[0]} />
          </g>
        ))}
      </g>
    </svg>
  );
}
export default function BolaoApp() {
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(true);
  const [splashDone, setSplashDone] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [usuario, setUsuario] = useState('');
  const [tab, setTab] = useState('jogos');
  const [filtroFase, setFiltroFase] = useState('todas');
  const [filtroGrupo, setFiltroGrupo] = useState('todos');
  const [mostrarProximos, setMostrarProximos] = useState(true);
  const [filtroFaseAdmin, setFiltroFaseAdmin] = useState('todas');
  const [pendingScores, setPendingScores] = useState({});
  const [pendingResults, setPendingResults] = useState({});
  const [saveMsg, setSaveMsg] = useState('');
  const [novoUsuario, setNovoUsuario] = useState('');
  const [extraDraft, setExtraDraft] = useState({ campeao: '', vice: '', terceiro: '', artilheiro: '' });

  // login
  const [loggedUser, setLoggedUser] = useState(null);
  const [loginUsuario, setLoginUsuario] = useState('');
  const [loginSenha, setLoginSenha] = useState('');
  const [loginErro, setLoginErro] = useState('');
  const [novaSenha1, setNovaSenha1] = useState('');
  const [novaSenha2, setNovaSenha2] = useState('');
  const [senhaMsg, setSenhaMsg] = useState('');
  const [adminResetUser, setAdminResetUser] = useState('');
  const [adminResetSenha, setAdminResetSenha] = useState('');
  const [editJogoId, setEditJogoId] = useState('');
  const [editTimeA, setEditTimeA] = useState('');
  const [editTimeB, setEditTimeB] = useState('');
  const [editCcA, setEditCcA] = useState('');
  const [editCcB, setEditCcB] = useState('');
  const [verUsuario, setVerUsuario] = useState('');
  const [tooltip, setTooltip] = useState(null);
  const [rankExpanded, setRankExpanded] = useState(null); // nome do participante expandido

  /* ----- carregar dados ----- */
  const loadState = useCallback(async () => {
    try {
      const snap = await getDoc(DOC_REF);
      if (snap.exists()) {
        const data = snap.data();
        if (!data.senhas) data.senhas = {};
        if (!data.admins) data.admins = ADMINS_INICIAIS;
        if (data.extrasBloqueados === undefined) data.extrasBloqueados = false;

        // FIXAR confrontos da Rodada de 32 — nunca deixar o auto-update sobrescrever
        const confrontosFixos = {
          73: { 'timeA': 'África do Sul', 'ccA': 'za', 'timeB': 'Canadá', 'ccB': 'ca', 'dataJogo': '2026-06-28T16:00:00' },
          74: { 'timeA': 'Brasil', 'ccA': 'br', 'timeB': 'Japão', 'ccB': 'jp', 'dataJogo': '2026-06-29T14:00:00' },
          75: { 'timeA': 'Alemanha', 'ccA': 'de', 'timeB': 'Paraguai', 'ccB': 'py', 'dataJogo': '2026-06-29T17:30:00' },
          76: { 'timeA': 'Holanda', 'ccA': 'nl', 'timeB': 'Marrocos', 'ccB': 'ma', 'dataJogo': '2026-06-29T22:00:00' },
          77: { 'timeA': 'Costa do Marfim', 'ccA': 'ci', 'timeB': 'Noruega', 'ccB': 'no', 'dataJogo': '2026-06-30T14:00:00' },
          78: { 'timeA': 'França', 'ccA': 'fr', 'timeB': 'Suécia', 'ccB': 'se', 'dataJogo': '2026-06-30T18:00:00' },
          79: { 'timeA': 'México', 'ccA': 'mx', 'timeB': 'Equador', 'ccB': 'ec', 'dataJogo': '2026-06-30T22:00:00' },
          80: { 'timeA': 'Inglaterra', 'ccA': 'gb-eng', 'timeB': 'RD Congo', 'ccB': 'cd', 'dataJogo': '2026-07-01T13:00:00' },
          81: { 'timeA': 'Bélgica', 'ccA': 'be', 'timeB': 'Senegal', 'ccB': 'sn', 'dataJogo': '2026-07-01T17:00:00' },
          82: { 'timeA': 'Estados Unidos', 'ccA': 'us', 'timeB': 'Bósnia e Herzegovina', 'ccB': 'ba', 'dataJogo': '2026-07-01T21:00:00' },
          83: { 'timeA': 'Espanha', 'ccA': 'es', 'timeB': 'Áustria', 'ccB': 'at', 'dataJogo': '2026-07-02T16:00:00' },
          84: { 'timeA': 'Portugal', 'ccA': 'pt', 'timeB': 'Croácia', 'ccB': 'hr', 'dataJogo': '2026-07-02T20:00:00' },
          85: { 'timeA': 'Suíça', 'ccA': 'ch', 'timeB': 'Argélia', 'ccB': 'dz', 'dataJogo': '2026-07-03T00:00:00' },
          86: { 'timeA': 'Austrália', 'ccA': 'au', 'timeB': 'Egito', 'ccB': 'eg', 'dataJogo': '2026-07-03T15:00:00' },
          87: { 'timeA': 'Argentina', 'ccA': 'ar', 'timeB': 'Cabo Verde', 'ccB': 'cv', 'dataJogo': '2026-07-03T19:00:00' },
          88: { 'timeA': 'Colômbia', 'ccA': 'co', 'timeB': 'Gana', 'ccB': 'gh', 'dataJogo': '2026-07-03T22:30:00' },
          89: { 'timeA': 'Canadá', 'ccA': 'ca', 'timeB': 'Marrocos', 'ccB': 'ma', 'dataJogo': '2026-07-04T14:00:00', 'cidade': 'Houston' },
          90: { 'timeA': 'Paraguai', 'ccA': 'py', 'timeB': 'França', 'ccB': 'fr', 'dataJogo': '2026-07-04T18:00:00', 'cidade': 'Filadélfia' },
          91: { 'timeA': 'Brasil', 'ccA': 'br', 'timeB': 'Noruega', 'ccB': 'no', 'dataJogo': '2026-07-05T17:00:00', 'cidade': 'Nova York/NJ' },
          92: { 'timeA': 'México', 'ccA': 'mx', 'timeB': 'Inglaterra', 'ccB': 'gb-eng', 'dataJogo': '2026-07-05T21:00:00', 'cidade': 'Cidade do México' },
          93: { 'timeA': 'Vencedor Jogo 84', 'ccA': 'un', 'timeB': 'Vencedor Jogo 83', 'ccB': 'un', 'dataJogo': '2026-07-06T16:00:00', 'cidade': 'Los Angeles' },
          94: { 'timeA': 'Vencedor Jogo 82', 'ccA': 'un', 'timeB': 'Vencedor Jogo 81', 'ccB': 'un', 'dataJogo': '2026-07-06T21:00:00', 'cidade': 'Seattle' },
          95: { 'timeA': 'Vencedor Jogo 87', 'ccA': 'un', 'timeB': 'Vencedor Jogo 86', 'ccB': 'un', 'dataJogo': '2026-07-07T13:00:00', 'cidade': 'Atlanta' },
          96: { 'timeA': 'Vencedor Jogo 85', 'ccA': 'un', 'timeB': 'Vencedor Jogo 88', 'ccB': 'un', 'dataJogo': '2026-07-07T17:00:00', 'cidade': 'Vancouver' }
        };
        if (data.jogos) {
          let corrigiu = false;
          data.jogos = data.jogos.map(j => {
            const c = confrontosFixos[j.id];
            if (!c) return j;
            if (j.timeA !== c.timeA || j.timeB !== c.timeB || j.dataJogo !== c.dataJogo) corrigiu = true;
            return { ...j, timeA: c.timeA, ccA: c.ccA, timeB: c.timeB, ccB: c.ccB, dataJogo: c.dataJogo || j.dataJogo, ...(c.cidade ? { cidade: c.cidade } : {}) };
          });
          if (corrigiu) await setDoc(DOC_REF, data);
        }

        setState(data);
      } else {
        const initial = {
          usuarios: USUARIOS_INICIAIS,
          jogos: JOGOS_INICIAIS,
          palpites: PALPITES_INICIAIS,
          extras: EXTRAS_INICIAIS,
          resultadosFinais: { campeao: '', vice: '', terceiro: '', artilheiro: '' },
          senhas: {},
          admins: ADMINS_INICIAIS,
          extrasBloqueados: false,
        };
        await setDoc(DOC_REF, initial);
        setState(initial);
      }
    } catch (e) {
      console.error('Erro ao carregar dados do Firestore:', e);
      setState({
        usuarios: USUARIOS_INICIAIS,
        jogos: JOGOS_INICIAIS,
        palpites: PALPITES_INICIAIS,
        extras: EXTRAS_INICIAIS,
        resultadosFinais: { campeao: '', vice: '', terceiro: '', artilheiro: '' },
        senhas: {},
        admins: ADMINS_INICIAIS,
        extrasBloqueados: false,
      });
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadState(); }, [loadState]);

  useEffect(() => {
    const id = setInterval(() => { loadState(); }, 15000);
    return () => clearInterval(id);
  }, [loadState]);

  // restaurar sessão salva
  useEffect(() => {
    if (!state || loggedUser) return;
    try {
      const saved = localStorage.getItem(SESSION_KEY);
      if (saved && state.usuarios.includes(saved)) {
        setLoggedUser(saved);
        setUsuario(saved);
        setVerUsuario(saved);
      }
    } catch (e) {}
  }, [state, loggedUser]);

  // carregar draft de extras quando usuario muda
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

  // auto-atualização: propaga vencedores/perdedores de jogos eliminatórios já finalizados
  // NÃO faz mais auto-preenchimento da R32 (controlado manualmente via Admin)
  useEffect(() => {
    if (!state || !state.jogos) return;
    const agora = Date.now();
    const mapaJogos = {};
    state.jogos.forEach(j => { mapaJogos[j.id] = j; });

    function nomeVencedor(jogo) {
      if (!jogo || jogo.placarOficialA === null || jogo.placarOficialA === undefined) return null;
      if (agora - new Date(jogo.dataJogo).getTime() < 4 * 60 * 60 * 1000) return null;
      if (jogo.placarOficialA > jogo.placarOficialB) return jogo.timeA;
      if (jogo.placarOficialB > jogo.placarOficialA) return jogo.timeB;
      return null;
    }
    function nomePerdedor(jogo) {
      if (!jogo || jogo.placarOficialA === null || jogo.placarOficialA === undefined) return null;
      if (agora - new Date(jogo.dataJogo).getTime() < 4 * 60 * 60 * 1000) return null;
      if (jogo.placarOficialA > jogo.placarOficialB) return jogo.timeB;
      if (jogo.placarOficialB > jogo.placarOficialA) return jogo.timeA;
      return null;
    }

    let mudou = false;
    const novosJogos = state.jogos.map(j => {
      if (j.fase === 'dezesseis') return j; // R32 nunca é tocada pelo auto-update
      let novoA = j.timeA, novoB = j.timeB;
      const mA = j.timeA && j.timeA.match(/^Vencedor Jogo (\d+)$/);
      const mB = j.timeB && j.timeB.match(/^Vencedor Jogo (\d+)$/);
      const mPA = j.timeA && j.timeA.match(/^Perdedor Jogo (\d+)$/);
      const mPB = j.timeB && j.timeB.match(/^Perdedor Jogo (\d+)$/);
      if (mA) { const v = nomeVencedor(mapaJogos[+mA[1]]); if (v) novoA = v; }
      if (mB) { const v = nomeVencedor(mapaJogos[+mB[1]]); if (v) novoB = v; }
      if (mPA) { const v = nomePerdedor(mapaJogos[+mPA[1]]); if (v) novoA = v; }
      if (mPB) { const v = nomePerdedor(mapaJogos[+mPB[1]]); if (v) novoB = v; }
      if (novoA !== j.timeA || novoB !== j.timeB) {
        mudou = true;
        return { ...j, timeA: novoA, timeB: novoB, ccA: NOME_PARA_CC[novoA] || j.ccA, ccB: NOME_PARA_CC[novoB] || j.ccB };
      }
      return j;
    });
    if (mudou) persist({ ...state, jogos: novosJogos });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state && state.jogos]);

  if (!splashDone) {
    return <SplashScreen onDone={() => setSplashDone(true)} />;
  }

  if (loading || !state) {
    return (
      <div style={{
        fontFamily: '"Inter", system-ui, sans-serif', minHeight: '100vh',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #0E2080 0%, #1530A6 50%, #0A1A5C 100%)',
        color: '#FFD600', fontWeight: 700, fontSize: 16,
      }}>
        Carregando bolão...
      </div>
    );
  }

  /* ----- tela de login ----- */
  if (!loggedUser) {
    const senhaSalvaExiste = loginUsuario && (state.senhas || {})[loginUsuario];

    return (
      <div style={{
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        background: 'linear-gradient(160deg, #0E2080 0%, #1530A6 45%, #0A1A5C 100%)',
        backgroundAttachment: 'fixed',
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 16, boxSizing: 'border-box',
      }}>
        <StadiumBackground />
        <div style={{
          background: '#fff', borderRadius: 14, padding: '28px 24px', width: '100%', maxWidth: 380,
          boxShadow: '0 10px 30px rgba(0,0,0,0.25)', position: 'relative', zIndex: 1,
        }}>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div style={{ fontSize: 32, lineHeight: 1 }}>🏆</div>
            <h1 style={{ margin: '6px 0 2px', fontSize: 20, fontWeight: 800, color: '#0E2080' }}>Bolão Copa do Mundo 2026</h1>
            <div style={{ color: '#64748B', fontSize: 13 }}>Entre com seu nome e senha</div>
          </div>
          <form onSubmit={fazerLogin}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Seu nome</label>
            <select
              value={loginUsuario}
              onChange={e => { setLoginUsuario(e.target.value); setLoginErro(''); }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14, background: '#fff', color: '#1F2937', fontWeight: 600, marginBottom: 10, boxSizing: 'border-box' }}
            >
              <option value="">Selecione...</option>
              {state.usuarios.map(u => <option key={u} value={u}>{u}</option>)}
            </select>

            {loginUsuario && !senhaSalvaExiste ? (
              <div style={{ fontSize: 12.5, color: '#0E2080', background: '#FFF7CC', borderRadius: 8, padding: '10px 12px', marginBottom: 10, fontWeight: 600 }}>
                Primeiro acesso de {loginUsuario}: clique em "Entrar" e depois defina sua senha em "Minha Conta".
              </div>
            ) : (
              <>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Senha</label>
                <input
                  type="password"
                  value={loginSenha}
                  onChange={e => setLoginSenha(e.target.value)}
                  placeholder="Sua senha"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14, background: '#fff', color: '#1F2937', marginBottom: 10, boxSizing: 'border-box' }}
                />
              </>
            )}

            {loginErro && <div style={{ color: '#B91C1C', fontSize: 13, marginBottom: 10, fontWeight: 600 }}>{loginErro}</div>}

            <button type="submit" style={{
              width: '100%', background: '#FFC400', color: '#0E2080', border: 'none',
              borderRadius: 8, padding: '10px 18px', fontSize: 14, fontWeight: 800, cursor: 'pointer',
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

  async function fazerLogin(e) {
    e.preventDefault();
    setLoginErro('');
    if (!loginUsuario) {
      setLoginErro('Selecione seu nome.');
      return;
    }
    const senhaSalva = (state.senhas || {})[loginUsuario];
    if (!senhaSalva) {
      setLoggedUser(loginUsuario);
      setUsuario(loginUsuario);
      setVerUsuario(loginUsuario);
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
    setVerUsuario(loginUsuario);
    try { localStorage.setItem(SESSION_KEY, loginUsuario); } catch (e2) {}
    setLoginSenha('');
  }

  function fazerLogout() {
    setLoggedUser(null);
    setLoginUsuario('');
    setLoginSenha('');
    try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
  }

  async function trocarSenha() {
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
  }

  async function adminResetarSenha() {
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
  }

  const importarPalpitesAtualizados = () => {
    const novosPalpites = { ...state.palpites, ...NOVOS_PALPITES_IMPORT };
    persist({ ...state, palpites: novosPalpites });
    setSaveMsg(`${Object.keys(NOVOS_PALPITES_IMPORT).length} palpites importados/atualizados!`);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const selecionarJogoParaEditar = (jogoId) => {
    setEditJogoId(jogoId);
    if (!jogoId) { setEditTimeA(''); setEditTimeB(''); setEditCcA(''); setEditCcB(''); return; }
    const jogo = state.jogos.find(j => j.id === +jogoId);
    if (jogo) {
      setEditTimeA(jogo.timeA);
      setEditTimeB(jogo.timeB);
      setEditCcA(jogo.ccA === 'un' ? '' : (jogo.ccA || ''));
      setEditCcB(jogo.ccB === 'un' ? '' : (jogo.ccB || ''));
    }
  };

  const salvarConfrontoEditado = () => {
    if (!editJogoId || !editTimeA.trim() || !editTimeB.trim()) {
      setSaveMsg('Preencha os dois times.');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }
    const novosJogos = state.jogos.map(j => j.id === +editJogoId ? {
      ...j,
      timeA: editTimeA.trim(),
      timeB: editTimeB.trim(),
      ccA: editCcA.trim().toLowerCase() || NOME_PARA_CC[editTimeA.trim()] || 'un',
      ccB: editCcB.trim().toLowerCase() || NOME_PARA_CC[editTimeB.trim()] || 'un',
    } : j);
    persist({ ...state, jogos: novosJogos });
    setSaveMsg(`Confronto do Jogo ${editJogoId} atualizado!`);
    setTimeout(() => setSaveMsg(''), 2500);
    selecionarJogoParaEditar('');
  };

  const forcarConfrontosR32 = () => {
    const confrontosCorretos = {
      73: { timeA: 'África do Sul', ccA: 'za', timeB: 'Canadá', ccB: 'ca' },
      74: { timeA: 'Brasil', ccA: 'br', timeB: 'Japão', ccB: 'jp' },
      75: { timeA: 'Alemanha', ccA: 'de', timeB: 'Paraguai', ccB: 'py' },
      76: { timeA: 'Holanda', ccA: 'nl', timeB: 'Marrocos', ccB: 'ma' },
      77: { timeA: 'Costa do Marfim', ccA: 'ci', timeB: 'Noruega', ccB: 'no' },
      78: { timeA: 'França', ccA: 'fr', timeB: 'Suécia', ccB: 'se' },
      79: { timeA: 'México', ccA: 'mx', timeB: 'Equador', ccB: 'ec' },
      80: { timeA: 'Inglaterra', ccA: 'gb-eng', timeB: 'RD Congo', ccB: 'cd' },
      81: { timeA: 'Bélgica', ccA: 'be', timeB: 'Senegal', ccB: 'sn' },
      82: { timeA: 'Estados Unidos', ccA: 'us', timeB: 'Bósnia e Herzegovina', ccB: 'ba' },
      83: { timeA: 'Espanha', ccA: 'es', timeB: 'Áustria', ccB: 'at' },
      84: { timeA: 'Portugal', ccA: 'pt', timeB: 'Croácia', ccB: 'hr' },
      85: { timeA: 'Suíça', ccA: 'ch', timeB: 'Argélia', ccB: 'dz' },
      86: { timeA: 'Austrália', ccA: 'au', timeB: 'Egito', ccB: 'eg' },
      87: { timeA: 'Argentina', ccA: 'ar', timeB: 'Cabo Verde', ccB: 'cv' },
      88: { timeA: 'Colômbia', ccA: 'co', timeB: 'Gana', ccB: 'gh' },
    };
    const novosJogos = state.jogos.map(j => {
      const c = confrontosCorretos[j.id];
      if (!c) return j;
      return { ...j, timeA: c.timeA, ccA: c.ccA, timeB: c.timeB, ccB: c.ccB };
    });
    persist({ ...state, jogos: novosJogos });
    setSaveMsg('16 confrontos da Rodada de 32 corrigidos no banco!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const sincronizarJogosFaltantes = () => {
    const idsExistentes = new Set(state.jogos.map(j => j.id));
    const jogosFaltantes = JOGOS_INICIAIS.filter(j => !idsExistentes.has(j.id));
    if (jogosFaltantes.length === 0) {
      setSaveMsg('Todos os jogos já estão no banco. Nenhum ajuste necessário.');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }
    const novosJogos = [...state.jogos, ...jogosFaltantes].sort((a, b) => a.id - b.id);
    persist({ ...state, jogos: novosJogos });
    setSaveMsg(`${jogosFaltantes.length} jogo(s) adicionado(s) ao banco!`);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const sincronizarDatasJogos = () => {
    const mapaNovasDatas = {};
    JOGOS_INICIAIS.forEach(j => { mapaNovasDatas[j.id] = j.dataJogo; });
    let alterados = 0;
    const novosJogos = state.jogos.map(j => {
      const novaData = mapaNovasDatas[j.id];
      if (novaData && novaData !== j.dataJogo) {
        alterados++;
        return { ...j, dataJogo: novaData };
      }
      return j;
    });
    persist({ ...state, jogos: novosJogos });
    setSaveMsg(alterados > 0 ? `${alterados} jogo(s) com data/horário atualizado!` : 'Nenhuma data divergente encontrada.');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const atualizarPalpitesClaude = () => {
    const usuarios = state.usuarios.includes('Claude') ? state.usuarios : [...state.usuarios, 'Claude'];
    const novosPalpites = { ...state.palpites, ...PALPITES_CLAUDE };
    persist({ ...state, usuarios, palpites: novosPalpites });
    setSaveMsg(`Palpites do Claude atualizados (${Object.keys(PALPITES_CLAUDE).length} jogos)!`);
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const gerarAvisoWhatsapp = () => {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimAmanha = new Date(inicioHoje);
    fimAmanha.setDate(fimAmanha.getDate() + 2);

    const jogosProximos = state.jogos
      .filter(j => {
        const d = new Date(j.dataJogo);
        return d >= inicioHoje && d < fimAmanha && !isLocked(j);
      })
      .sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo));

    if (jogosProximos.length === 0) {
      setSaveMsg('Não há jogos abertos para hoje/amanhã.');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }

    let linhas = ['⚠️ *Pessoal, faltam palpites para os próximos jogos!*', ''];
    let temPendencia = false;

    jogosProximos.forEach(jogo => {
      const pendentes = state.usuarios.filter(u => !state.palpites[`${jogo.id}_${u}`]);
      if (pendentes.length === 0) return;
      temPendencia = true;
      const dataFmt = new Date(jogo.dataJogo).toLocaleString('pt-BR', { weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
      linhas.push(`⚽ *${jogo.timeA} x ${jogo.timeB}* (${dataFmt})`);
      linhas.push(pendentes.map(p => `- ${p}`).join('\n'));
      linhas.push('');
    });

    if (!temPendencia) {
      setSaveMsg('Todos já palpitaram nos jogos de hoje/amanhã! 🎉');
      setTimeout(() => setSaveMsg(''), 2500);
      return;
    }

    linhas.push('Não esqueçam de dar seus palpites! 🇧🇷');
    const texto = linhas.join('\n');
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const gerarRankingWhatsapp = () => {
    const medalhas = ['🥇', '🥈', '🥉'];
    let linhas = ['🏆 *Classificação do Bolão Copa do Mundo 2026*', ''];
    ranking.forEach((r, i) => {
      const prefixo = medalhas[i] || `${i + 1}º`;
      linhas.push(`${prefixo} ${r.usuario} — ${r.total} pts (jogos: ${r.ptsJogos} + extras: ${r.ptsExtras})`);
    });
    linhas.push('');
    linhas.push(`Jogos com resultado: ${jogosFinalizados}/${state.jogos.length}`);
    const texto = linhas.join('\n');
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  const toggleExtrasBloqueados = () => {
    const novo = !state.extrasBloqueados;
    persist({ ...state, extrasBloqueados: novo });
    setSaveMsg(novo ? 'Palpites de pódio/artilheiro bloqueados!' : 'Palpites de pódio/artilheiro desbloqueados!');
    setTimeout(() => setSaveMsg(''), 2500);
  };

  const toggleAdmin = (u) => {
    const atuais = state.admins || ADMINS_INICIAIS;
    const novos = atuais.includes(u) ? atuais.filter(a => a !== u) : [...atuais, u];
    persist({ ...state, admins: novos });
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
  if (mostrarProximos) {
    const hoje = new Date();
    const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    const fimAmanha = new Date(inicioHoje);
    fimAmanha.setDate(fimAmanha.getDate() + 2); // hoje + amanhã (exclusivo no dia seguinte)
    jogosFiltrados = jogosFiltrados.filter(j => {
      const d = new Date(j.dataJogo);
      return d >= inicioHoje && d < fimAmanha;
    });
  }

  let jogosAdmin = [...state.jogos].sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo));
  if (filtroFaseAdmin !== 'todas') jogosAdmin = jogosAdmin.filter(j => j.fase === filtroFaseAdmin);
  // ocultar jogos finalizados há mais de 24h (já resolvidos, não precisam mais aparecer na lista do admin)
  const limite24h = Date.now() - 24 * 60 * 60 * 1000;
  jogosAdmin = jogosAdmin.filter(j => {
    const finalizado = j.placarOficialA !== null && j.placarOficialA !== undefined;
    if (!finalizado) return true; // jogos sem resultado sempre aparecem
    const inicio = new Date(j.dataJogo).getTime();
    return inicio > limite24h; // jogos finalizados só aparecem se começaram nas últimas 24h
  });

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

  // próximos 4 jogos: considera jogos cujo início foi há menos de 2h (ainda "atuais") ou está no futuro
  const agora = new Date();
  const limiteRecente = new Date(agora.getTime() - 2 * 60 * 60 * 1000);
  const proximosJogos = [...state.jogos]
    .filter(j => new Date(j.dataJogo) >= limiteRecente)
    .sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo))
    .slice(0, 4);

  const proximosResumo = proximosJogos.map(jogo => {
    let countA = 0, countEmpate = 0, countB = 0, total = 0;
    const nomesA = [], nomesEmpate = [], nomesB = [];
    state.usuarios.forEach(u => {
      const p = state.palpites[`${jogo.id}_${u}`];
      if (!p) return;
      total++;
      if (p.a > p.b) { countA++; nomesA.push(u); }
      else if (p.a < p.b) { countB++; nomesB.push(u); }
      else { countEmpate++; nomesEmpate.push(u); }
    });
    const pct = (n) => total > 0 ? Math.round((n / total) * 100) : 0;
    return { jogo, total, pctA: pct(countA), pctEmpate: pct(countEmpate), pctB: pct(countB), nomesA, nomesEmpate, nomesB };
  });

  /* ----- estilos ----- */
  const page = {
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    background: 'linear-gradient(160deg, #0E2080 0%, #1530A6 45%, #0A1A5C 100%)',
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
  const h3 = { margin: '0 0 12px', fontSize: 16, fontWeight: 700, color: '#0E2080' };
  const select = {
    padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
    background: '#fff', color: '#1F2937', fontWeight: 600,
  };
  const textInput = {
    padding: '8px 12px', borderRadius: 8, border: '1.5px solid #D6DCE5', fontSize: 14,
    background: '#fff', color: '#1F2937',
  };

  const isAdmin = (state.admins || ADMINS_INICIAIS).includes(usuario);

  const tabs = [
    { id: 'jogos', label: 'Jogos & Palpites' },
    { id: 'extras', label: 'Palpites Extras' },
    { id: 'chaveamento', label: 'Chaveamento' },
    { id: 'conta', label: 'Minha Conta' },
    ...(isAdmin ? [{ id: 'admin', label: 'Administração' }] : []),
    { id: 'rank', label: 'Classificação' },
    { id: 'regras', label: 'Pontuação' },
  ];

  const effectiveTab = (tab === 'admin' && !isAdmin) ? 'jogos' : tab;

  return (
    <div style={page}>
      <StadiumBackground />
      <div style={{ ...container, position: 'relative', zIndex: 1 }}>
        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: 4 }}>
          <div style={{ fontSize: 32, lineHeight: 1 }}>🏆</div>
          <h1 style={{ margin: '6px 0 2px', fontSize: 24, fontWeight: 800, color: '#FFD600', textShadow: '0 1px 4px rgba(0,0,0,0.35)' }}>Bolão Copa do Mundo 2026</h1>
          <div style={{ color: '#CBD9F7', fontSize: 13 }}>Dados compartilhados em tempo real entre os participantes</div>
        </div>

        {/* SAVE MSG */}
        {saveMsg && (
          <div style={{
            position: 'fixed', top: 14, right: 14, background: '#0E2080', color: '#FFD600',
            padding: '8px 16px', borderRadius: 8, fontSize: 13, fontWeight: 700, zIndex: 50,
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}>{saveMsg}</div>
        )}

        {/* RESUMO PRÓXIMOS JOGOS */}
        {effectiveTab === 'jogos' && proximosResumo.length > 0 && (
          <div style={card}>
            <div style={{ ...h3, marginBottom: 8 }}>Como está a galera nos próximos jogos</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 12 }}>
              Percentual de palpites para vitória, empate ou vitória do visitante (entre quem já palpitou).
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {proximosResumo.map(r => {
                const bloqueado = isLocked(r.jogo);
                return (
                <div key={r.jogo.id}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, fontSize: 13, fontWeight: 700 }}>
                    <Flag cc={r.jogo.ccA} nome={r.jogo.timeA} />
                    <span>{r.jogo.timeA}</span>
                    <span style={{ color: '#94A3B8', fontWeight: 400, fontSize: 12 }}>x</span>
                    <span>{r.jogo.timeB}</span>
                    <Flag cc={r.jogo.ccB} nome={r.jogo.timeB} />
                    <span style={{ marginLeft: 'auto', fontSize: 11, fontWeight: 600, color: '#94A3B8' }}>
                      {r.total} palpite{r.total === 1 ? '' : 's'}
                    </span>
                  </div>
                  {r.total === 0 ? (
                    <div style={{ fontSize: 12, color: '#CBD5E1', fontStyle: 'italic' }}>Ainda sem palpites</div>
                  ) : (
                    <>
                      <div style={{ display: 'flex', height: 28, borderRadius: 6, overflow: 'hidden', fontSize: 11, fontWeight: 700, color: '#fff', cursor: bloqueado ? 'pointer' : 'default', position: 'relative' }}>
                        {r.pctA > 0 && (
                          <div
                            style={{ width: `${r.pctA}%`, background: '#0E2080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => bloqueado && setTooltip(t => t?.jogoId === r.jogo.id && t?.tipo === 'A' ? null : { jogoId: r.jogo.id, tipo: 'A', nomes: r.nomesA, label: r.jogo.timeA })}
                            onMouseEnter={() => bloqueado && setTooltip({ jogoId: r.jogo.id, tipo: 'A', nomes: r.nomesA, label: r.jogo.timeA })}
                            onMouseLeave={() => bloqueado && setTooltip(null)}
                            title={bloqueado ? r.nomesA.join(', ') : ''}
                          >{r.pctA}%</div>
                        )}
                        {r.pctEmpate > 0 && (
                          <div
                            style={{ width: `${r.pctEmpate}%`, background: '#94A3B8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => bloqueado && setTooltip(t => t?.jogoId === r.jogo.id && t?.tipo === 'E' ? null : { jogoId: r.jogo.id, tipo: 'E', nomes: r.nomesEmpate, label: 'Empate' })}
                            onMouseEnter={() => bloqueado && setTooltip({ jogoId: r.jogo.id, tipo: 'E', nomes: r.nomesEmpate, label: 'Empate' })}
                            onMouseLeave={() => bloqueado && setTooltip(null)}
                            title={bloqueado ? r.nomesEmpate.join(', ') : ''}
                          >{r.pctEmpate}%</div>
                        )}
                        {r.pctB > 0 && (
                          <div
                            style={{ width: `${r.pctB}%`, background: '#FFC400', color: '#0E2080', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            onClick={() => bloqueado && setTooltip(t => t?.jogoId === r.jogo.id && t?.tipo === 'B' ? null : { jogoId: r.jogo.id, tipo: 'B', nomes: r.nomesB, label: r.jogo.timeB })}
                            onMouseEnter={() => bloqueado && setTooltip({ jogoId: r.jogo.id, tipo: 'B', nomes: r.nomesB, label: r.jogo.timeB })}
                            onMouseLeave={() => bloqueado && setTooltip(null)}
                            title={bloqueado ? r.nomesB.join(', ') : ''}
                          >{r.pctB}%</div>
                        )}
                      </div>
                      {bloqueado && tooltip && tooltip.jogoId === r.jogo.id && (
                        <div style={{
                          background: '#1E293B', color: '#fff', borderRadius: 8, padding: '6px 12px',
                          fontSize: 12, fontWeight: 600, marginTop: 4,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                        }}>
                          <span style={{ color: '#FFD600' }}>{tooltip.label}:</span> {tooltip.nomes.join(', ')}
                        </div>
                      )}
                    </>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10.5, color: '#94A3B8', marginTop: 2 }}>
                    <span>🔵 {r.jogo.timeA}</span>
                    <span>⚪ Empate</span>
                    <span>🟡 {r.jogo.timeB}</span>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TABS */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: '8px 16px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700,
              cursor: 'pointer', background: tab === t.id ? '#FFC400' : 'rgba(255,255,255,0.15)',
              color: tab === t.id ? '#0E2080' : '#fff', transition: 'all 0.15s',
            }}>{t.label}</button>
          ))}
        </div>

        {/* TAB: JOGOS */}
        {effectiveTab === 'jogos' && (
          <>
            <div style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                <div>
                  <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Logado como</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: '#0E2080' }}>{usuario}</div>
                </div>
                <PrimaryButton small onClick={fazerLogout}>Sair</PrimaryButton>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Jogos e palpites</div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap', alignItems: 'center' }}>
                <button onClick={() => setMostrarProximos(m => !m)} style={{
                  padding: '8px 14px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 700,
                  cursor: 'pointer', background: mostrarProximos ? '#FFC400' : '#EEF2FF',
                  color: mostrarProximos ? '#0E2080' : '#475569',
                }}>{mostrarProximos ? '📋 Todos os jogos' : '📅 Próximos jogos'}</button>
                <select style={select} value={filtroFase} onChange={e => { setFiltroFase(e.target.value); setMostrarProximos(false); }}>
                  <option value="todas">Todas as fases</option>
                  {Object.entries(FASES).map(([k, v]) => <option key={k} value={k}>{v.nome}</option>)}
                </select>
                <select style={select} value={filtroGrupo} onChange={e => { setFiltroGrupo(e.target.value); setMostrarProximos(false); }}>
                  <option value="todos">Todos os grupos</option>
                  {grupos.map(g => <option key={g} value={g}>Grupo {g}</option>)}
                </select>
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#475569' }}>Ver palpites de:</label>
                  <select style={select} value={verUsuario} onChange={e => setVerUsuario(e.target.value)}>
                    {state.usuarios.map(u => <option key={u} value={u}>{u === usuario ? `${u} (você)` : u}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

                {jogosFiltrados.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '24px 0', color: '#94A3B8', fontSize: 13.5 }}>
                    Nenhum jogo encontrado para hoje ou amanhã.
                  </div>
                )}
                {jogosFiltrados.map(jogo => {
                  const key = `${jogo.id}_${verUsuario}`;
                  const palpite = state.palpites[key];
                  const locked = isLocked(jogo);
                  const editavel = verUsuario === usuario && !locked;
                  const ocultoDeTerceiro = verUsuario !== usuario && !locked;
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
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#0E2080', marginRight: 4 }}>
                            Final: {jogo.placarOficialA} x {jogo.placarOficialB}
                          </span>
                        )}
                        {editavel ? (
                          <>
                            <ScoreInput value={valA} onChange={(v) => setPendingScores(s => ({ ...s, [key]: { a: v, b: s[key]?.b !== undefined ? s[key].b : valB } }))} />
                            <span style={{ color: '#94A3B8' }}>x</span>
                            <ScoreInput value={valB} onChange={(v) => setPendingScores(s => ({ ...s, [key]: { a: s[key]?.a !== undefined ? s[key].a : valA, b: v } }))} />
                            <PrimaryButton small onClick={() => salvarPalpite(jogo.id)} disabled={valA === '' || valB === ''}>Salvar</PrimaryButton>
                          </>
                        ) : ocultoDeTerceiro ? (
                          <span style={{ fontSize: 12.5, fontWeight: 600, color: '#94A3B8', fontStyle: 'italic' }} title="Os palpites ficam visíveis após o bloqueio do jogo, para evitar cópia">
                            🔒 oculto até o bloqueio
                          </span>
                        ) : (
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1F2937' }}>
                            {palpite ? `${palpite.a} x ${palpite.b}` : <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>sem palpite</span>}
                          </span>
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

        {/* TAB: CHAVEAMENTO */}
        {effectiveTab === 'chaveamento' && (
          <div style={card}>
            <div style={{ ...h3, marginBottom: 4 }}>Chaveamento — Fase Eliminatória</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16 }}>
              Times em itálico ainda não definidos. Serão preenchidos automaticamente conforme os grupos e fases anteriores forem concluídos.
            </div>
            <BracketFull
              jogos={state.jogos}
              palpites={state.palpites}
              usuario={verUsuario}
            />
          </div>
        )}

        {/* TAB: EXTRAS */}
        {effectiveTab === 'extras' && (
          <div style={card}>
            <div style={h3}>Palpites extras — {usuario}</div>
            {state.extrasBloqueados ? (
              <div style={{ fontSize: 13, color: '#B91C1C', background: '#FEF2F2', borderRadius: 8, padding: '10px 12px', marginBottom: 14, fontWeight: 600 }}>
                O prazo para palpites de pódio e artilheiro já encerrou. Esses palpites estão bloqueados para edição.
              </div>
            ) : (
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Esses palpites podem ser editados livremente até que o administrador bloqueie ou lance os resultados finais.
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: 12 }}>
              {[
                { key: 'campeao', label: '🥇 Campeão (1º lugar)' },
                { key: 'vice', label: '🥈 Vice-campeão (2º lugar)' },
                { key: 'terceiro', label: '🥉 3º lugar' },
                { key: 'artilheiro', label: '👟 Artilheiro' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>{f.label}</label>
                  {state.extrasBloqueados ? (
                    <div style={{ padding: '8px 12px', borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 14, color: '#475569', minHeight: 38, boxSizing: 'border-box' }}>
                      {extraDraft[f.key] || <span style={{ color: '#CBD5E1', fontStyle: 'italic' }}>sem palpite</span>}
                    </div>
                  ) : (
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={extraDraft[f.key]}
                      onChange={e => setExtraDraft(d => ({ ...d, [f.key]: e.target.value }))} />
                  )}
                </div>
              ))}
            </div>
            {!state.extrasBloqueados && (
              <div style={{ marginTop: 16 }}>
                <PrimaryButton onClick={salvarExtras}>Salvar palpites extras</PrimaryButton>
              </div>
            )}
          </div>
        )}

        {/* TAB: MINHA CONTA */}
        {effectiveTab === 'conta' && (
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
            {senhaMsg && <div style={{ marginTop: 10, fontSize: 13, color: senhaMsg.includes('sucesso') ? '#047857' : '#B91C1C', fontWeight: 600 }}>{senhaMsg}</div>}
            <div style={{ marginTop: 16 }}>
              <PrimaryButton onClick={trocarSenha}>Salvar senha</PrimaryButton>
            </div>
          </div>
        )}

        {/* TAB: ADMIN */}
        {effectiveTab === 'admin' && (
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

              <div style={{ marginTop: 18, borderTop: '1px solid #F1F5F9', paddingTop: 14 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 8 }}>Administradores</div>
                <div style={{ fontSize: 12.5, color: '#64748B', marginBottom: 10 }}>
                  Administradores podem lançar resultados dos jogos, definir o pódio/artilheiro oficial e gerenciar usuários.
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {state.usuarios.map(u => {
                    const ehAdmin = (state.admins || ADMINS_INICIAIS).includes(u);
                    return (
                      <button key={u} onClick={() => toggleAdmin(u)} style={{
                        padding: '6px 12px', borderRadius: 999, border: ehAdmin ? 'none' : '1.5px solid #D6DCE5',
                        background: ehAdmin ? '#0E2080' : '#fff', color: ehAdmin ? '#FFD600' : '#475569',
                        fontSize: 12.5, fontWeight: 700, cursor: 'pointer',
                      }}>{u}{ehAdmin ? ' ★ admin' : ''}</button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Palpites de pódio e artilheiro</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                {state.extrasBloqueados
                  ? 'Os palpites de pódio (campeão/vice/3º) e artilheiro estão BLOQUEADOS para todos os participantes.'
                  : 'Os palpites de pódio e artilheiro ainda estão abertos para edição pelos participantes.'}
              </div>
              <PrimaryButton onClick={toggleExtrasBloqueados}>
                {state.extrasBloqueados ? 'Desbloquear palpites de pódio/artilheiro' : 'Bloquear palpites de pódio/artilheiro'}
              </PrimaryButton>
            </div>

            <div style={card}>
              <div style={h3}>Importar planilha de palpites atualizada</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Atualiza os palpites de todos os participantes com os valores da última planilha enviada
                ({Object.keys(NOVOS_PALPITES_IMPORT).length} palpites), incluindo jogos já bloqueados.
                Palpites não presentes na planilha são mantidos como estão.
              </div>
              <PrimaryButton onClick={importarPalpitesAtualizados}>Importar palpites da planilha</PrimaryButton>
            </div>

            <div style={card}>
              <div style={h3}>Sincronizar datas e horários dos jogos</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Atualiza as datas/horários dos jogos no banco de dados compartilhado com os valores
                corrigidos do código. Placares já lançados são preservados.
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <PrimaryButton onClick={sincronizarDatasJogos}>Sincronizar datas dos jogos</PrimaryButton>
                <PrimaryButton onClick={sincronizarJogosFaltantes}>Adicionar jogos faltantes ao banco</PrimaryButton>
                <PrimaryButton onClick={forcarConfrontosR32}>🔧 Forçar confrontos corretos R32</PrimaryButton>
              </div>
            </div>

            <div style={card}>
              <div style={h3}>Ajustar confronto de jogo</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Use para corrigir manualmente o nome de um time em qualquer jogo do chaveamento,
                caso o preenchimento automático esteja errado (ex: desempate por critério especial).
                O código do país (bandeira) é preenchido automaticamente se o nome for reconhecido,
                ou você pode informar manualmente (ex: "br", "fr", "gb-eng").
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'flex-end', marginBottom: 12 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Selecionar jogo</label>
                  <select style={select} value={editJogoId} onChange={e => selecionarJogoParaEditar(e.target.value)}>
                    <option value="">Selecione o jogo...</option>
                    {state.jogos
                      .filter(j => j.fase !== 'grupos')
                      .sort((a, b) => a.id - b.id)
                      .map(j => (
                        <option key={j.id} value={j.id}>
                          Jogo {j.id} ({j.fase}) — {j.timeA} x {j.timeB}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              {editJogoId && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: 10 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Time A (mandante)</label>
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={editTimeA} onChange={e => setEditTimeA(e.target.value)}
                      placeholder="Nome do time A" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Código bandeira A (opcional)</label>
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={editCcA} onChange={e => setEditCcA(e.target.value)}
                      placeholder="ex: br, fr, gb-eng" />
                    {editTimeA && (NOME_PARA_CC[editTimeA] || editCcA) && (
                      <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Flag cc={editCcA || NOME_PARA_CC[editTimeA] || 'un'} nome={editTimeA} />
                        <span style={{ fontSize: 11, color: '#64748B' }}>{editTimeA}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Time B (visitante)</label>
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={editTimeB} onChange={e => setEditTimeB(e.target.value)}
                      placeholder="Nome do time B" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 4 }}>Código bandeira B (opcional)</label>
                    <input style={{ ...textInput, width: '100%', boxSizing: 'border-box' }}
                      value={editCcB} onChange={e => setEditCcB(e.target.value)}
                      placeholder="ex: br, fr, gb-eng" />
                    {editTimeB && (NOME_PARA_CC[editTimeB] || editCcB) && (
                      <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Flag cc={editCcB || NOME_PARA_CC[editTimeB] || 'un'} nome={editTimeB} />
                        <span style={{ fontSize: 11, color: '#64748B' }}>{editTimeB}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {editJogoId && (
                <div style={{ marginTop: 14 }}>
                  <PrimaryButton onClick={salvarConfrontoEditado}>Salvar confronto</PrimaryButton>
                </div>
              )}
            </div>

            <div style={card}>
              <div style={h3}>🤖 Palpites do Claude</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Adiciona o Claude como participante (se ainda não estiver) e atualiza seus palpites
                para os próximos jogos analisados ({Object.keys(PALPITES_CLAUDE).length} jogos nesta atualização).
              </div>
              <PrimaryButton onClick={atualizarPalpitesClaude}>Atualizar palpites do Claude</PrimaryButton>
            </div>

            <div style={card}>
              <div style={h3}>Avisar quem está sem palpite (WhatsApp)</div>
              <div style={{ fontSize: 13, color: '#64748B', marginBottom: 14 }}>
                Monta uma mensagem com a lista de participantes que ainda não palpitaram nos jogos
                de hoje e de amanhã (ainda abertos), e abre o WhatsApp pronto para enviar no grupo.
              </div>
              <PrimaryButton onClick={gerarAvisoWhatsapp}>📲 Gerar aviso no WhatsApp</PrimaryButton>
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
        {effectiveTab === 'rank' && (
          <div style={card}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginBottom: 4 }}>
              <div style={h3}>Classificação geral</div>
              <PrimaryButton small onClick={gerarRankingWhatsapp}>📲 Enviar classificação no WhatsApp</PrimaryButton>
            </div>
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
                  {ranking.map((r, i) => {
                    const isExpanded = rankExpanded === r.usuario;
                    const jogosEncerrados = state.jogos
                      .filter(j => j.placarOficialA !== null && j.placarOficialA !== undefined)
                      .sort((a, b) => new Date(a.dataJogo) - new Date(b.dataJogo));

                    return (
                      <React.Fragment key={r.usuario}>
                        <tr
                          style={{ borderTop: '1px solid #F1F5F9', background: r.usuario === usuario ? '#EEF2FF' : 'transparent', cursor: 'pointer' }}
                          onClick={() => setRankExpanded(isExpanded ? null : r.usuario)}
                        >
                          <td style={{ padding: '10px 10px', fontWeight: 800, color: i < 3 ? '#0E2080' : '#94A3B8' }}>
                            {i + 1}º{i === 0 ? ' 🏆' : ''}
                          </td>
                          <td style={{ padding: '10px 10px', fontWeight: 700 }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ fontSize: 11, color: '#94A3B8' }}>{isExpanded ? '▲' : '▼'}</span>
                              {r.usuario}
                            </span>
                          </td>
                          <td style={{ padding: '10px 10px', textAlign: 'right', color: '#475569' }}>{r.ptsJogos}</td>
                          <td style={{ padding: '10px 10px', textAlign: 'right', color: '#475569' }}>{r.ptsExtras}</td>
                          <td style={{ padding: '10px 10px', textAlign: 'right', fontWeight: 800, fontSize: 15 }}>{r.total}</td>
                        </tr>

                        {isExpanded && (
                          <tr style={{ background: '#F8FAFC' }}>
                            <td colSpan={5} style={{ padding: '0 8px 12px' }}>
                              <div style={{ fontSize: 12, fontWeight: 700, color: '#0E2080', padding: '10px 4px 6px' }}>
                                Detalhamento de {r.usuario} — {jogosEncerrados.length} jogos encerrados
                              </div>
                              <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                                  <thead>
                                    <tr style={{ background: '#EEF2FF', color: '#475569', fontSize: 11, fontWeight: 700, textTransform: 'uppercase' }}>
                                      <th style={{ padding: '6px 8px', textAlign: 'left' }}>Jogo</th>
                                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>Palpite</th>
                                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>Resultado</th>
                                      <th style={{ padding: '6px 8px', textAlign: 'center' }}>Pontos</th>
                                      <th style={{ padding: '6px 8px', textAlign: 'left' }}>Situação</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {jogosEncerrados.map(jogo => {
                                      const palpite = state.palpites[`${jogo.id}_${r.usuario}`];
                                      const pts = calcPontosJogo(palpite, jogo);
                                      const faseInfo = FASES[jogo.fase] || FASES.grupos;

                                      let situacao = '—';
                                      let corPts = '#94A3B8';
                                      let bgRow = 'transparent';

                                      if (!palpite) {
                                        situacao = 'Sem palpite';
                                        corPts = '#CBD5E1';
                                      } else if (pts === faseInfo.exato) {
                                        situacao = '🎯 Placar exato!';
                                        corPts = '#16A34A';
                                        bgRow = '#F0FDF4';
                                      } else if (pts === faseInfo.vencedor) {
                                        situacao = '✅ Acertou vencedor';
                                        corPts = '#2563EB';
                                        bgRow = '#EFF6FF';
                                      } else if (pts === 0) {
                                        situacao = '❌ Errou';
                                        corPts = '#DC2626';
                                        bgRow = '#FFF5F5';
                                      }

                                      return (
                                        <tr key={jogo.id} style={{ borderTop: '1px solid #F1F5F9', background: bgRow }}>
                                          <td style={{ padding: '5px 8px', fontWeight: 600 }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                              <Flag cc={jogo.ccA} nome={jogo.timeA} />
                                              <span>{jogo.timeA}</span>
                                              <span style={{ color: '#94A3B8', margin: '0 2px' }}>x</span>
                                              <span>{jogo.timeB}</span>
                                              <Flag cc={jogo.ccB} nome={jogo.timeB} />
                                            </div>
                                          </td>
                                          <td style={{ padding: '5px 8px', textAlign: 'center', fontWeight: 700, color: '#475569' }}>
                                            {palpite ? `${palpite.a} x ${palpite.b}` : <span style={{ color: '#CBD5E1' }}>—</span>}
                                          </td>
                                          <td style={{ padding: '5px 8px', textAlign: 'center', fontWeight: 700, color: '#0E2080' }}>
                                            {jogo.placarOficialA} x {jogo.placarOficialB}
                                          </td>
                                          <td style={{ padding: '5px 8px', textAlign: 'center', fontWeight: 800, color: corPts, fontSize: 14 }}>
                                            {pts !== null ? `+${pts}` : '—'}
                                          </td>
                                          <td style={{ padding: '5px 8px', color: corPts, fontWeight: 600 }}>
                                            {situacao}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                  <tfoot>
                                    <tr style={{ borderTop: '2px solid #E2E8F0', background: '#EEF2FF' }}>
                                      <td colSpan={3} style={{ padding: '8px 8px', fontWeight: 700, color: '#0E2080' }}>Total de pontos em jogos</td>
                                      <td style={{ padding: '8px 8px', textAlign: 'center', fontWeight: 800, fontSize: 15, color: '#0E2080' }}>+{r.ptsJogos}</td>
                                      <td />
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: PONTUAÇÃO */}
        {effectiveTab === 'regras' && (
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
                    <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#0E2080' }}>{exato}</td>
                    <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#0E2080' }}>{venc}</td>
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
                    <td style={{ padding: '6px 10px', textAlign: 'center', fontWeight: 700, color: '#0E2080' }}>{pts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: 8, fontStyle: 'italic', color: '#94A3B8' }}>Palpites de jogos bloqueiam automaticamente 1 hora antes do início.</div>
          </div>
        )}

        <div style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.55)', marginTop: 24 }}>
          Dados sincronizados automaticamente entre todos os participantes a cada 15s.
        </div>
      </div>
    </div>
  );
}
