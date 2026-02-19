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

echo "Script Directory: $SCRIPT_DIR"
echo "Solution Directory: $SOLUTION_DIR"
echo "API Project Directory: $API_DIR"

# -------------------------------
# Remove old generated files for server controllers and models
# -------------------------------
echo "==============================================================="
echo "----------Cleaning Server API Controllers and Models----------"
echo "==============================================================="

rm -rf "$API_DIR/Controllers"/*
rm -rf "$API_DIR/Models"/*

echo "==============================================================="
echo "------Cleaning Server API Controllers and Models Complete------"
echo "==============================================================="

# -------------------------------
# Generate Server (C#) controllers/models
# -------------------------------
echo "==============================================================="
echo "--------Generating New C# server controllers and models--------"
echo "==============================================================="

openapi-generator generate \
  -g aspnetcore \
  -i "$SCRIPT_DIR/openapi.yaml" \
  -o "$SOLUTION_DIR" \
  -t "$SCRIPT_DIR/CustomTemplate" \
  -c "$SCRIPT_DIR/openapi-generator-config.yaml" \
  --openapi-generator-ignore-list **/*.*,*.*,!**/Controllers/*.*,!**/Models/*.* \
  
echo "==============================================================="
echo "-----C# server controllers and models generation complete-----"
echo "==============================================================="