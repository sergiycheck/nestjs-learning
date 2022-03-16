import { HttpStatus, HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message) {
    super(message, HttpStatus.FORBIDDEN);
  }
}

// build-in exceptions
//BadRequestException
//UnauthorizedException
//NotFoundException
//ForbiddenException
//NotAcceptableException
//RequestTimeoutException
//ConflictException
//GoneException
//HttpVersionnotSupportedException
//PayloadTooLargeException
//UnsupportedMediaTypeException
//UnprocessableEntityException
//InternalServerErrorException
//NotImplementedException
//ImATeapotException
//MethodNotAllowedException
//BadGatewayException
//ServiceUnavailableException
//GatewayTimeoutException
//PreconditionFailedException
