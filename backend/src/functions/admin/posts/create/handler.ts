import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { randomUUID } from 'crypto';
import { putItem } from '@libs/services/dynamodb';
import { calculateReadingTime } from '@libs/utils/readingTime';

const processHandler = async (event: any) => {
	const body = event.body!;
	body.id = randomUUID();
	body.slug =
		body.slug ||
		body.title
			.replace(/([^\w ]|_)/g, '')
			.replace(/ /g, '-')
			.toLowerCase();
	body.title = body.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	body.content = body.content.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	body.description = body.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	body.readingTime = calculateReadingTime(body.content);
	body.createdBy = event.requestContext.authorizer.claims.sub;
	body.featured = body.featured || 'false';
	body.state = 'PRIVATE';
	body.image = `${process.env.POSTS_IMAGES_CDN}/images/${body.id}`;

	await putItem(process.env.POSTS_TABLE_NAME!, body);

	return {
		id: body.id,
		slug: body.slug,
	};
};

export const handler: Handler = middleware(processHandler, 201);
