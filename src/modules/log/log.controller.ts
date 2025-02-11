import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as docs from 'src/docs/car.doc';
import { LogService } from './log.service';

@ApiTags('Logs')
@Controller('api')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Get('logs')
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
  async getLogs() {
    return await this.logService.getLogs();
  }
}
