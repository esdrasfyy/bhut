declare namespace BHUT {
  interface Authenticate {
    accessToken?: string;
    refreshToken?: string;
    tokenType?: 'Bearer';
    expiresIn?: number;
    errors?: [
      {
        code: string;
        message: string;
      },
    ];
  }
  
  interface GetQueries {
    ativo: boolean;
    pagina: number;
    tamanhoPagina: number;
  }

  interface Get {
    paginacao?: {
      pagina: number;
      tamanhoPagina: number;
      total: number;
    };
    itens?: [
      {
        id: string;
        nome: string;
        marca: string;
        preco: Decimal;
        anoFabricacao: number;
        ativo: boolean;
        criadoEm: Date;
        atualizadoEm: Date;
      },
    ];
    errors?: [
      {
        code: string;
        message: string;
      },
    ];
  }
}
