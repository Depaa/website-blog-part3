import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { createSignedUrl } from '@libs/services/s3';

const processHandler = async (event: any) => {
	const id = event.pathParameters.id;
	const { type } = event.body;

	const key = `images/${id}`;
	const signedUrl = await createSignedUrl(key, type, process.env.CONTENT_BUCKET_NAME);

	return {
		signedUrl,
	};
};

export const handler: Handler = middleware(processHandler, 200);
