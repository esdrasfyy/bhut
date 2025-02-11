import { ApiProperty } from '@nestjs/swagger';

export class CarCreateBodySwagger {
  @ApiProperty({ description: 'Preço do carro.', example: 10000 })
  preco: number;

  @ApiProperty({ description: 'Ano de fabricação do carro.', example: 2020 })
  anoFabricacao: number;

  @ApiProperty({ description: 'Nome do carro.', example: 'Fusca' })
  nome: string;

  @ApiProperty({ description: 'Marca do carro.', example: 'Volkswagen' })
  marca: string;
}

export class CarCreateResponseSwagger {
  @ApiProperty({
    description: 'O ID único do carro.',
    example: '0e8352d9-467a-4cb8-aabf-cc6436df41ea',
  })
  id: string;
}
class PaginacaoSwagger {
  @ApiProperty({ description: 'Número da página atual.', example: 1 })
  pagina: number;

  @ApiProperty({ description: 'Quantidade de itens por página.', example: 10 })
  tamanhoPagina: number;

  @ApiProperty({ description: 'Total de itens disponíveis.', example: 200 })
  total: number;
}

class CarSwagger {
  @ApiProperty({
    description: 'O ID único do carro.',
    example: '0e8352d9-467a-4cb8-aabf-cc6436df41ea',
  })
  id: string;

  @ApiProperty({ description: 'Nome do carro.', example: 'Etios' })
  nome: string;

  @ApiProperty({ description: 'Marca do carro.', example: 'Toyota' })
  marca: string;

  @ApiProperty({ description: 'Preço do carro.', example: 49999.99 })
  preco: number;

  @ApiProperty({ description: 'Ano de fabricação do carro.', example: 2016 })
  anoFabricacao: number;

  @ApiProperty({ description: 'Indica se o carro está ativo.', example: true })
  ativo: boolean;

  @ApiProperty({
    description: 'Data de criação do registro.',
    example: '2022-04-05 14:00:43',
  })
  criadoEm: string;

  @ApiProperty({
    description: 'Data da última atualização do registro.',
    example: '2022-04-05 14:00:43',
  })
  atualizadoEm: string;
}

export class CarResponseSwagger {
  @ApiProperty({
    description: 'Informações de paginação.',
    type: PaginacaoSwagger,
  })
  paginacao: PaginacaoSwagger;

  @ApiProperty({ description: 'Lista de carros.', type: [CarSwagger] })
  itens: CarSwagger[];
}
