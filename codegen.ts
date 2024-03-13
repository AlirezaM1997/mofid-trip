import { CodegenConfig } from "@graphql-codegen/cli";
import { API_URL } from "@src/settings";

const config: CodegenConfig = {
  overwrite: true,
  schema: `https://api.hamafza-startup.ir/graphql/`,
  documents: "./src/gql/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
