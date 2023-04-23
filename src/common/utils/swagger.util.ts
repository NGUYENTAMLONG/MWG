import { ApiResponseOptions, getSchemaPath } from '@nestjs/swagger';

type SwaggerSchemaParams = {
  example: object;
  description: string;
};

export function swaggerSchemaExample(
  params: SwaggerSchemaParams,
): ApiResponseOptions {
  return {
    schema: {
      example: params.example,
    },
    description: params.description,
  };
}

export function swaggerSchemaObject(entity: any): ApiResponseOptions {
  return {
    schema: {
      allOf: [
        {
          properties: {
            data: {
              $ref: getSchemaPath(entity),
            },
          },
        },
      ],
    },
  };
}

export function swaggerSchemaArr(entity: any): ApiResponseOptions {
  return {
    schema: {
      allOf: [
        {
          properties: {
            data: {
              items: {
                $ref: getSchemaPath(entity),
              },
            },
            totalItem: {
              type: 'number',
            },
            page: {
              type: 'number',
            },
            pageSize: {
              type: 'number',
            },
            totalPage: {
              type: 'number',
            },
          },
        },
      ],
    },
  };
}

export function swaggerSchemaRef(entity: any): ApiResponseOptions {
  return {
    schema: {
      $ref: getSchemaPath(entity),
    },
  };
}
