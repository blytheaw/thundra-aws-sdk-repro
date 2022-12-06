import { MyStack } from "./MyStack";
import { App, Stack } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "api",
    bundle: {
      externalModules: ["@thundra/core"],
      format: "esm",
    },
    tracing: "disabled",
  });

  app.stack(MyStack);
}
