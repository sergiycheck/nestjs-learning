import { ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Controller, Get, Res } from '@nestjs/common';
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

  @Get('users-observable')
  findAllObservable(@Res() response: Response) {
    this.httpService.get<DataResponse<User>>(`${this.url}/users`).subscribe((observer) => {
      return response.json(observer.data);
    });
  }

  @Get('users-promise')
  async findAllPromise(): Promise<DataResponse<User>> {
    const res = await this.httpService.axiosRef.get<DataResponse<User>>(`${this.url}/users`);
    return res.data;
  }
}
