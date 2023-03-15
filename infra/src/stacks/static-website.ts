import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Distribution, HttpVersion, PriceClass } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket, BucketAccessControl } from 'aws-cdk-lib/aws-s3';
import { BuildConfig } from '../lib/common/config.interface';

export class StaticWebsiteStack extends Stack {
	private readonly bucket: Bucket;
	// private readonly bucketLogging: Bucket;
	private readonly distribution: Distribution;

	constructor(scope: App, id: string, props: StackProps, buildConfig: BuildConfig) {
		super(scope, id, props);

		this.bucket = this.createS3Bucket(`${id}-bucket`);
		// this.bucketLogging = this.createS3Bucket(`${id}-bucket-logging`);
		this.distribution = this.createDistribution(`${id}`);
	}

	private createS3Bucket = (id: string): Bucket => {
		return new Bucket(this, id, {
			accessControl: BucketAccessControl.PRIVATE,
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			publicReadAccess: false,
		});
	};

	private createDistribution = (id: string): Distribution => {
		return new Distribution(this, id, {
			comment: 'CDN for blog website',
			defaultBehavior: { origin: new S3Origin(this.bucket) },
			defaultRootObject: 'index.html',
			httpVersion: HttpVersion.HTTP3,
			priceClass: PriceClass.PRICE_CLASS_ALL,
			// enableLogging: false,
			// logBucket: this.bucketLogging,
			// logIncludesCookies: true,
			errorResponses: [
				{
					httpStatus: 403,
					responsePagePath: '/index.html',
					responseHttpStatus: 200,
				},
			],
		});
	};
}
