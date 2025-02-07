import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CarService } from './car.service';
import * as docs from 'src/docs/car.doc';

@ApiTags('Carros')
@Controller('api')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('car')
  @ApiOperation({
    summary: 'Obter todos os carros.',
    description:
      'Retorna uma lista de todos os carros disponíveis no banco de dados.',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de carros retornada com sucesso.',
    type: docs.CarResponseSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Nenhum carro encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno no servidor.',
  })
  @ApiQuery({
    name: 'ativo',
    required: false,
    type: Boolean,
    description: 'Filtrar apenas carros ativos (true ou false)',
  })
  @ApiQuery({
    name: 'pagina',
    required: false,
    type: Number,
    description: 'Número da página para paginação',
    example: 1,
  })
  @ApiQuery({
    name: 'tamanhoPagina',
    required: false,
    type: Number,
    description: 'Quantidade de itens por página',
    example: 10,
  })
  async getCars(@Query() queries: BHUT.GetQueries) {
    return await this.carService.get(queries);
  }
}
