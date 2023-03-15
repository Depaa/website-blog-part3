import { S3Client, PutObjectCommand, PutObjectCommandInput } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import logger from '@libs/logger';

const client = new S3Client({ region: process.env.REGION });

const createSignedUrl = async (key: string, type: string, bucketName: string): Promise<string> => {
	const params: PutObjectCommandInput = {
		Bucket: bucketName,
		Key: key,
		ContentType: type,
	};
	logger.debug(params);

	const pubObjectCommand = new PutObjectCommand(params);
	const res = await getSignedUrl(client, pubObjectCommand, { expiresIn: 60 * 5 });
	logger.info(`Done getting signed url for put object to ${bucketName}`);
	logger.debug(res);
	return res;
};

export { createSignedUrl };
