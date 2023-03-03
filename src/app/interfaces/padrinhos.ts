export interface Padrinhos {
      code:string;
      curso: string,
      foto: string,
      frase: string,
      hobbie: string,
      idade: string,
      nome: string,
      periodo: string,
      telefone: string,
      limit: number
  }

  export interface Bixos {
      nomeBixo: string,
      acesso: string,
      telefoneBixo: string,
  }

  export interface Escolha extends Bixos, Padrinhos {   
    code: string,
    padrinho: string,
    telefone: string
    bixo: Bixos [],
}


