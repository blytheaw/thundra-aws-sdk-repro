# thundra-aws-sdk-repro
Repro for Thundra AWS SDK v3 Issues

1. Add THUNDRA_APIKEY to .env.local
2. Run `npm install` and `npx sst deploy` to install deps and deploy the stack
3. Hit GET / on the ApiUrl to produce traffic

Expected result: End-to-end trace from APIGW -> Lambda -> SNS -> SQS ->  Lambda

Actual result: `TypeError: o.config.endpoint is not a function`, but Thundra reports APIGW -> Lambda -> SNS in the trace

Related GH issue: https://github.com/aws/aws-sdk-js-v3/issues/4105
