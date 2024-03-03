import { CodegenConfig } from "@graphql-codegen/cli";
import { API_URL } from "@src/settings";

const config: CodegenConfig = {
  overwrite: true,
  schema: API_URL,
  documents: "./src/gql/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
