#!/bin/bash
set -e

# -------------------------------
# build.sh - OpenAPI Generator
# -------------------------------

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SOLUTION_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Server API project directory
API_DIR="$SOLUTION_DIR/Ravi.Web.Api"

# Csharp Client project directory
CSHARP_CLIENT_DIR="$SOLUTION_DIR/Ravi.Web.Client"

# Typescript Client project directory
TYPE_CLIENT_DIR="$SOLUTION_DIR/clientApp/src/api"

echo "=============================================================================================================================="
echo "-----------------------------------------------------Directory Listing--------------------------------------------------------"
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-------------Script Directory: $SCRIPT_DIR"
echo "-----------Solution Directory: $SOLUTION_DIR"
echo "---------Server API Directory: $API_DIR"
echo "------Csharp Client Directory: $CSHARP_CLIENT_DIR"
echo "--Typescript Client Directory: $TYPE_CLIENT_DIR"
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-------------------------------------------------Directory Listing Complete---------------------------------------------------"

# # -------------------------------
# # Remove old generated files for Server, Csharp Client and Typescript Client
# # -------------------------------
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-------------------------------Cleaning Existing Server, Csharp Client and Typescript Client----------------------------------"

rm -rf "$API_DIR/Controllers"/*
rm -rf "$API_DIR/Models"/*
rm -rf "$CSHARP_CLIENT_DIR/Api"/*
rm -rf "$CSHARP_CLIENT_DIR/Model"/*
rm -rf "$CSHARP_CLIENT_DIR/Client"/*
rm -rf "$CSHARP_CLIENT_DIR/Extensions"/*
# rm -rf "$TYPE_CLIENT_DIR"/*

echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-----------------------------Cleaning Existing Server, Csharp Client and Typescript Client Complete---------------------------"

# # -------------------------------
# # Generate Server (C#) controllers/models
# # -------------------------------

echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-----------------------------------------------------Generating Server--------------------------------------------------------"

openapi-generator generate \
  -g aspnetcore \
  -i "$SCRIPT_DIR/openapi.yaml" \
  -o "$SOLUTION_DIR" \
  -t "$SCRIPT_DIR/CustomServerTemplate" \
  -c "$SCRIPT_DIR/openapi-server-config.yaml" \
  --openapi-generator-ignore-list **/*.*,*.*,!**/Controllers/*.*,!**/Models/*.*,Dockerfile \

echo "------------------------------------------------------------------------------------------------------------------------------"
echo "------------------------------------------------Generating Server Complete----------------------------------------------------"
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "---------------------------------------------------Generating Csharp Client---------------------------------------------------"

openapi-generator generate \
  -g csharp \
  --library generichost \
  -i "$SCRIPT_DIR/openapi.yaml" \
  -o "$SOLUTION_DIR/" \
  -c "$SCRIPT_DIR/openapi-csharp-client-config.yaml" \
  --openapi-generator-ignore-list **/*.*,*.*,!*.Client/Model/*.*,!*.Client/Api/*.*,!*.Client/Client/*.*,!*.Client/Extensions/*.* \

  
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-----------------------------------------------Generating Csharp Client Complete----------------------------------------------"
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "-------------------------------------------------Generating TypeScript Client-------------------------------------------------"

openapi-generator generate \
  -g typescript \
  -i "$SCRIPT_DIR/openapi.yaml" \
  -o "$TYPE_CLIENT_DIR" \
  -t "$SCRIPT_DIR/CustomTypeScriptClientTemplate" \
  -c "$SCRIPT_DIR/openapi-typescript-client-config.yaml" \
  --openapi-generator-ignore-list .openapi-generator-ignore,openapitools.json,. \
  
echo "------------------------------------------------------------------------------------------------------------------------------"
echo "---------------------------------------------Generating TypeScript Client Complete--------------------------------------------"
echo "=============================================================================================================================="