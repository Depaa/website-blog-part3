import { Handler } from 'aws-lambda';
import { middleware } from '@libs/utils/handler';
import { getItem, listItems } from '@libs/services/dynamodb';
import { NotFoundException } from '@libs/errors/not-found';

const processHandler = async (event: any) => {
  const id = event.pathParameters.id;

  // TODO if is not admin we could query for some specific items
  let post;
  post = (await listItems(
    process.env.POSTS_TABLE_NAME!,
    '#slug = :slug',
    { slug: id },
    `${process.env.ENV}-blog-posts-table-slug-index`,
    1,
    undefined,
    false,
    undefined,
    'slug, title, image, tags, readingTime, featured, content, seo',
  )).items[0];

  if (!post) {
    post = await getItem(process.env.POSTS_TABLE_NAME!, 'id', id);
    delete post.pk;
  }
  if (!post || post.state === 'PRIVATE') {
    throw new NotFoundException('Item not found');
  }

  return post;
}

export const handler: Handler = middleware(processHandler, 200);
