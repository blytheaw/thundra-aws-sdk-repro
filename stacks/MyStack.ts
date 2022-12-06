import { StackContext, Api, Queue, Topic } from "@serverless-stack/resources";
import { LayerVersion } from "aws-cdk-lib/aws-lambda";

export function MyStack({ app, stack }: StackContext) {
  if (!app.local) {
    const thundraAWSAccountNo = 269863060030;
    const thundraNodeLayerVersion = 131;
    const thundraLayer = LayerVersion.fromLayerVersionArn(
      stack,
      "ThundraLayer",
      `arn:aws:lambda:${stack.region}:${thundraAWSAccountNo}:layer:thundra-lambda-node-layer:${thundraNodeLayerVersion}`
    );
    stack.addDefaultFunctionLayers([thundraLayer]);

    stack.addDefaultFunctionEnv({
      THUNDRA_APIKEY: process.env.THUNDRA_APIKEY ?? "",
      NODE_OPTIONS: "-r @thundra/core/dist/bootstrap/lambda",
      THUNDRA_AGENT_LAMBDA_ES_ENABLE: "true",
      THUNDRA_AGENT_LAMBDA_DEBUG_ENABLE: "true",
    });
  }

  const queue = new Queue(stack, "queue", {
    consumer: "functions/consumer.handler",
  });

  const topic = new Topic(stack, "topic", {
    subscribers: {
      queue,
    },
  });

  const api = new Api(stack, "api", {
    routes: {
      "GET /": "functions/publisher.handler",
    },
    defaults: {
      function: {
        bind: [topic],
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
