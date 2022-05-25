import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Param, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Response } from 'express';

export interface DataResponse<T> {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
}

export interface User {
  avatar: string;
  email: string;
  first_name: string;
  id: number;
  last_name: string;
}

@ApiTags('RemoteUsersWithHttpController')
@Controller('remote-users-with-http')
export class RemoteUsersWithHttpController {
  url = 'https://reqres.in/api';
  constructor(private httpService: HttpService) {}

  @Get('users-observable-express-specific')
  findAllObservableExpressSpecific(@Res() response: Response) {
    this.httpService.get<DataResponse<User>>(`${this.url}/users`).subscribe((observer) => {
      return response.json(observer.data);
    });
  }

  @Get('get-observable-response-from-req-res/:reqKey')
  getObservableResponse(@Param('reqKey') reqKey: string) {
    //TODO: can not serialize axios response
    return this.httpService.get<DataResponse<User>>(`${this.url}/${reqKey}`);
  }

  @Get('users-promise')
  async findAllPromise(): Promise<DataResponse<User>> {
    const res = await this.httpService.axiosRef.get<DataResponse<User>>(`${this.url}/users`);
    return res.data;
  }
}
