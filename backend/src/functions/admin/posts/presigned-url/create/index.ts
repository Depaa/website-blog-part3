import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'admin/posts/{id}/presigned-url',
        request: {
          schemas: {
            'application/json': schema,
          },
        },
        cors: {
          origin: '${self:custom.blogDomainUrl}',
          headers: [
            '*'
          ]
        },
        authorizer: {
          arn: '${self:custom.cognitoUserPoolArn}',
        },
        private: true,
      },
    },
  ],
};
