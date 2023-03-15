import { App, CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Distribution, HttpVersion, PriceClass } from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { BlockPublicAccess, Bucket, BucketAccessControl, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { BuildConfig } from '../lib/common/config.interface';

export class ContentBucketStack extends Stack {
	public readonly contentBucket: Bucket;

	constructor(scope: App, id: string, props: StackProps, buildConfig: BuildConfig) {
		super(scope, id, props);

		this.contentBucket = this.createBucket(id, buildConfig);
		const contentDistribution = this.createDistribution(`${id}-cdn`);

		new CfnOutput(this, `ExportsOutputContentBucketName`, {
			value: this.contentBucket.bucketName,
			exportName: `${id}-name`,
		});

		new CfnOutput(this, `ExportsOutputContentBucketArn`, {
			value: this.contentBucket.bucketArn,
			exportName: `${id}-arn`,
		});

		new CfnOutput(this, `ExportsOutputContentCdnId`, {
			value: contentDistribution.distributionId,
			exportName: `${id}-cdn-id`,
		});

		new CfnOutput(this, `ExportsOutputContentCdnUrl`, {
			value: contentDistribution.distributionDomainName,
			exportName: `${id}-cdn-url`,
		});
	}

	private createBucket = (id: string, buildConfig: BuildConfig): Bucket => {
		return new Bucket(this, id, {
			accessControl: BucketAccessControl.PRIVATE,
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			publicReadAccess: false,
			cors: [
				{
					allowedMethods: [HttpMethods.PUT],
					allowedOrigins: ['http://localhost:5173'],
					allowedHeaders: ['*'],
				},
			],
		});
	};

	private createDistribution = (id: string): Distribution => {
		return new Distribution(this, id, {
			comment: 'CDN for blog content',
			defaultBehavior: { origin: new S3Origin(this.contentBucket) },
			defaultRootObject: 'index.html',
			httpVersion: HttpVersion.HTTP3,
			priceClass: PriceClass.PRICE_CLASS_ALL,
		});
	};
}
