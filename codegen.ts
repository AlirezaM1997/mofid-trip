import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://api.hamafza-startup.ir/graphql/",
  documents: "./src/gql/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
