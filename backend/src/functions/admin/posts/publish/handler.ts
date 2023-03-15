import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { updateItem } from '@libs/services/dynamodb';

const processHandler = async (event: any) => {
	const id = event.pathParameters.id;
	const body = {
		state: 'PUBLIC',
		publishedAt: new Date().getTime(),
	};

	await updateItem(process.env.POSTS_TABLE_NAME!, body, 'id', id);
};

export const handler: Handler = middleware(processHandler, 204);
