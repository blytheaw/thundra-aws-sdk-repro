import { SQSEvent } from "aws-lambda";

export const handler = async (event: SQSEvent) => {
  console.log(event);

  return {
    body: "Successfully consumed SQS message",
    statusCode: 200,
  };
};
