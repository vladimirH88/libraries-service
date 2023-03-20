import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiOperation,
  ApiParam,
  ApiParamOptions,
  ApiResponse,
} from '@nestjs/swagger';

export function SwaggerApi(
  summary: string,
  type: any,
  params: ApiParamOptions[] = [],
) {
  const apiParams = params.map((param) => ApiParam({ ...param }));

  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: HttpStatus.OK,
      description: 'Success',
      type,
    }),
    ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' }),
    ...apiParams,
  );
}
