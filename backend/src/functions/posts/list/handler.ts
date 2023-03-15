import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { listItems } from '@libs/services/dynamodb';

const processHandler = async (event: any) => {
  const nextToken = event.queryStringParameters?.nextToken;
  const limit = event.queryStringParameters?.limit;
  const exclude = event.queryStringParameters?.exclude;

  const res = await listItems(
    process.env.POSTS_TABLE_NAME!,
    '#state = :state',
    { state: 'PUBLIC' },
    `${process.env.ENV}-blog-posts-table-state-index`,
    limit,
    nextToken,
    false,
    undefined,
    'slug, title, description, image, tags, readingTime, featured, seo',
  );

  if (!exclude) return res;

  const relatedItems = [];
  for (const item of res.items) {
    if (item.id !== exclude) {
      relatedItems.push(item);
    }
  }
  return relatedItems;
}

export const handler: Handler = middleware(processHandler, 200);
