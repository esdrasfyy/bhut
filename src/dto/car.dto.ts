import {
  IsString,
  IsInt,
  Min,
  Max,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsNumber()
  @IsNotEmpty()
  preco: number;

  @IsInt()
  @Min(1886)
  @Max(new Date().getFullYear())
  anoFabricacao: number;
}
