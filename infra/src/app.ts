import { App, Environment, StackProps } from 'aws-cdk-lib';
import { getConfig } from './lib/common/build-config';
import { BuildConfig } from './lib/common/config.interface';
import { Tags } from 'aws-cdk-lib';
import { PostsTableStack } from './stacks/posts-table';
import { BlogApiGatewayStack } from './stacks/api-gateway';
import { BlogApiCdnStack } from './stacks/api-cdn';
import { BlogAuthorizerStack } from './stacks/cognito-auth';
import { StaticWebsiteStack } from './stacks/static-website';
import { ContentBucketStack } from './stacks/content-storage';

const app = new App();

const buildConfig: BuildConfig = getConfig(app);
Tags.of(app).add('Environment', buildConfig.environment);
Tags.of(app).add('Project', buildConfig.project);
Tags.of(app).add('Cdk', 'true');

const env: Environment = { account: buildConfig.account, region: buildConfig.region };
const stackId = `${buildConfig.environment}-${buildConfig.project}`;
const baseProps: StackProps = { env };

const blogAuthorizerStackId = `${stackId}-auth`;
const blogApiGatewayStackId = `${stackId}-api`;
const blogApiCdnStackId = `${stackId}-api-cdn`;
const blogContentBucketStackId = `${stackId}-content`;
const postsTableStackId = `${stackId}-posts-table`;
const blogDomainsStackId = `${stackId}-domains`;
const apiCdnInvalidationStackId = `${stackId}-api-cdn-cache`;
const blogStaticWebsiteStackId = `${stackId}-website`;

const postsTableStack = new PostsTableStack(
	app,
	postsTableStackId,
	{
		...baseProps,
		stackName: postsTableStackId,
	},
	buildConfig
);
const contentBucketStack = new ContentBucketStack(
	app,
	blogContentBucketStackId,
	{
		...baseProps,
		stackName: blogContentBucketStackId,
	},
	buildConfig
);

const blogAuthorizerStack = new BlogAuthorizerStack(
	app,
	blogAuthorizerStackId,
	{
		...baseProps,
		stackName: blogAuthorizerStackId,
	},
	buildConfig
);

const blogApiGatewayStack = new BlogApiGatewayStack(
	app,
	blogApiGatewayStackId,
	{
		...baseProps,
		stackName: blogApiGatewayStackId,
		postsTableArn: postsTableStack.postsTable.tableArn,
		postsTableName: postsTableStack.postsTable.tableName,
		blogUserPool: blogAuthorizerStack.userPool,
		blogUserPoolClient: blogAuthorizerStack.userPoolClient,
	},
	buildConfig
);

const blogApiCdnStack = new BlogApiCdnStack(
	app,
	blogApiCdnStackId,
	{
		...baseProps,
		stackName: blogApiCdnStackId,
		blogApiId: blogApiGatewayStack.blogApiGateway.restApiId,
		blogApiUrl: blogApiGatewayStack.blogApiGateway.url,
	},
	buildConfig
);

const blogStaticWebsiteStack = new StaticWebsiteStack(
	app,
	blogStaticWebsiteStackId,
	{
		...baseProps,
		stackName: blogStaticWebsiteStackId,
	},
	buildConfig
);
