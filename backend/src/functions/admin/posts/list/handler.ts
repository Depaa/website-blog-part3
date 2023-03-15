import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { scanItems } from '@libs/services/dynamodb';

const processHandler = async (event: any) => {
	const nextToken = event.queryStringParameters?.nextToken;
	const limit = event.queryStringParameters?.limit;

	const res = await scanItems(
		process.env.POSTS_TABLE_NAME!,
		limit,
		nextToken,
	);

	return res;
};

export const handler: Handler = middleware(processHandler, 200);
