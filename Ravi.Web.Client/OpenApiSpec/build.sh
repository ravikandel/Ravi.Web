#!/bin/bash
set -e

# -------------------------------
# build.sh - OpenAPI Generator
# -------------------------------

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOLUTION_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# API project directory
API_DIR="$SOLUTION_DIR/Ravi.Web.Api"

# Client project directory
CLIENT_DIR="$SOLUTION_DIR/Ravi.Web.Client"

echo "Solution Directory: $SOLUTION_DIR"
echo "API Project Directory: $API_DIR"
echo "Client Project Directory: $CLIENT_DIR"

# -------------------------------
# Remove old generated files for client
# -------------------------------

echo "==============================================================="
echo "----------Cleaning Client API Controllers and Models----------"
echo "==============================================================="

rm -rf "$CLIENT_DIR/Api"/*
rm -rf "$CLIENT_DIR/Model"/*
rm -rf "$CLIENT_DIR/Client"/*
rm -rf "$CLIENT_DIR/Extensions"/*

echo "==============================================================="
echo "------Cleaning Client API Controllers and Models Complete------"
echo "==============================================================="

# -------------------------------
# Generate Client (C#) Api Client Extensions and Model
# -------------------------------

echo "==============================================================="
echo "----------Generating Client API Controllers and Models---------"
echo "==============================================================="

openapi-generator generate \
  -g csharp \
  --library generichost \
  -i "$API_DIR/OpenApiSpec/openapi.yaml" \
  -o "$SOLUTION_DIR/" \
  -t "$SCRIPT_DIR/CustomTemplate" \
  -c "$SCRIPT_DIR/openapi-generator-config.yaml" \
  --openapi-generator-ignore-list **/*.*,*.*,!*.Client/Model/*.*,!*.Client/Api/*.*,!*.Client/Client/*.*,!*.Client/Extensions/*.* \

echo "==============================================================="
echo "-----Generating Client API Controllers and Models Complete-----"
echo "==============================================================="