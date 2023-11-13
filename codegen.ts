import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://192.168.127.245:8000/graphql/",
  documents: "./src/gql/**/*.gql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/generated.ts": {
      plugins: ["typescript", "typescript-operations", "typescript-react-apollo"],
    },
  },
};

export default config;
