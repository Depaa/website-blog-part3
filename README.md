Link to the article:


To release it follow these steps:

1. update parameters in infra/cdk.json and cdk.context.json. Parameters that needs to be changed are written like so {ACCOUNT_ID}

2. npm install in infra/

3. npm run deploy in infra/

4. npm install in backend/

5. npm run deploy in backend/

6. npm install in backoffice/

7. update parameters in backoffice/package.json, only in you want to deploy to test out the static adapter. Change these:
- {BACKOFFICE_BUCKET_NAME} with the bucket name where you want to host your backoffice, il probabily be something like this s3://dev-blog-website-devblogwebsitebucket. Just keep in mind you will get CORS error because only "localhost" is allowed
- {DISTRIBUTION_ID} with the backoffice distribution id

8. update environment variabiles in backoffice/.env
- {CDN_API_URL} with the distribution url used on top of api gateway

9. update variables in backoffice/src/aws-exports.ts with the variables from cognito
- {REGION}
- {USERPOOL_ID}
- {USERPOOL_CLIENT_ID}
- {USERPOOL_DOMAIN_URL}

10. npm run dev in backoffice

11. you are probably missing your user, just create one from the cognito aws console or cli and assign it to "admin" user group

12. 🎉

<i>Disclaimer: this is a WIP project, it's actually a series of blogpost starting from stratch where I document the process of creating my own blog and releasing it open source for everyone. Hope you are not in a hurry, the project will be completed in a few month from when you read, if not please read this paragraph again :)</i>