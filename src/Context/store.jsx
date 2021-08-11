import React, { useState, createContext } from "react";

export const StoreContext = createContext({});

export const StoreContextProvider = ({ children }) => {
  const [information, setInformation] = useState({
    nome: "Nome Sobrenome",
    email: "email@email.com",
    telefone: "33330000",
    valor: "10000",
    numero_prestacao: undefined,
    profissao: undefined
  });
  const [account, setAccount] = useState({
    data_nascimento: undefined,
    cpf: undefined,
    cargo: "Auxiliar",
    data_admissao: undefined,
    sal_bruto: "1400",
    sal_liq: "1052",
    goal: undefined
  });

  const [cadastro, setCadastro] = useState({
    empresa: "empresa X",
    cnpj: undefined
  });

  const [nova, setNova] = useState({
    quantidade_funcionarios: undefined,
    nome_rh: undefined,
    email_rh: undefined,
    telefone_rh: undefined
  });

  const [conveniada, setConveniada] = useState({
    cheque: undefined,
    rg: undefined
  });

  const store = {
    information: [information, setInformation],
    account: [account, setAccount],
    cadastro: [cadastro, setCadastro],
    nova: [nova, setNova],
    conveniada: [conveniada, setConveniada]
  };
  console.log(store);
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
