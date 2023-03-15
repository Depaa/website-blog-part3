import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      http: {
        method: 'post',
        path: 'admin/posts/{id}/publish',
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
