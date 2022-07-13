#!/bin/bash
FOLDER_DIR="A:\InitTS"
PROTO_DIR="A:\InitTS\proto"

# Generate JavaScript code
yarn run grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:${PROTO_DIR} \
    --grpc_out=${PROTO_DIR} \
    --plugin=${FOLDER_DIR}/node_modules/.bin/grpc_tools_node_protoc_plugin.cmd \
    -I ${PROTO_DIR} \
    ${PROTO_DIR}/*.proto

# Generate TypeScript code (d.ts)
yarn run grpc_tools_node_protoc \
    --plugin=${FOLDER_DIR}/node_modules/.bin/protoc-gen-ts.cmd \
    --ts_out="${PROTO_DIR}" \
    -I ${PROTO_DIR} \
    ${PROTO_DIR}/*.proto