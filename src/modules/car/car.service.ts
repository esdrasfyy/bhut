import { HttpException, Injectable } from '@nestjs/common';
import { api } from 'src/libs/axios.lib';
@Injectable()
export class CarService {
  private token: string;
  private refresh_token: string;

  constructor() {}

  async onModuleInit() {
    await this.authenticate();
  }

  async authenticate() {
    try {
      const response = await api.post<BHUT.Authenticate>(
        '/autenticacao/token',
        {
          login: process.env.BHUT_LOGIN,
          senha: process.env.BHUT_PASSWORD,
        },
      );

      if (response.data.errors) {
        throw new HttpException(response.data.errors[0].message, 403);
      }

      this.token = response.data.accessToken;
      this.refresh_token = response.data.refreshToken;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Internal Error',
        error.status ?? 500,
      );
    }
  }

  async refreshToken() {
    try {
      const response = await api.post<BHUT.Authenticate>(
        'http://api-test.bhut.com.br:3000/api/v1/autenticacao/refresh',
        { tokenRenovado: this.refresh_token },
      );

      if (response.data.errors) {
        throw new HttpException(response.data.errors[0].message, 403);
      }

      this.token = response.data.accessToken;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Internal Error',
        error.status ?? 500,
      );
    }
  }

  async get(queries: BHUT.GetQueries) {
    try {
      const response = await api.get<BHUT.Get>('/carro', {
        headers: { Authorization: `Bearer ${this.token}` },
        params: queries,
      });
      console.log(response.data);

      if (response.data.paginacao.total === 0) {
        throw new HttpException('Nenhum Carro encontrado', 404);
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        error.message ?? 'Internal Error',
        error.status ?? 500,
      );
    }
  }
}
