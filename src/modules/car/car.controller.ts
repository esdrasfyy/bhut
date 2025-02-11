import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CarService } from './car.service';
import * as docs from 'src/docs/car.doc';
import { CreateCarDto } from 'src/dto/car.dto';

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

  @Post('car')
  @ApiOperation({
    summary: 'Cadastrar um novo carro',
    description:
      'Cria um novo carro na API externa e retorna os dados cadastrados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Carro cadastrado com sucesso.',
    type: docs.CarCreateResponseSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos no corpo da requisição.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro interno no servidor.',
  })
  @ApiBody({
    type: docs.CarCreateBodySwagger,
    description: 'Dados do carro a ser cadastrado',
  })
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateCarDto) {
    return this.carService.create(dto);
  }
}
