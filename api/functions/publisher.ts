import * as awsSdk3SmithyClient from "@aws-sdk/smithy-client";
const thundra = require("@thundra/core");
thundra.instrumentModule("@aws-sdk/smithy-client", awsSdk3SmithyClient);

import { PublishCommand, SNSClient } from "@aws-sdk/client-sns";
import { Topic } from "@serverless-stack/node/topic";

const sns = new SNSClient({ region: "us-east-1" });

export const handler = async () => {
  await sns.send(
    new PublishCommand({
      TopicArn: Topic.topic.topicArn,
      Message: "Message sent to SNS",
    })
  );

  return {
    statusCode: 200,
    body: "Sent message to SNS",
  };
};
