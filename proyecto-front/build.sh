#!/bin/bash
# build.sh - Script de build para Render

echo "🚀 Building Angular app for production..."
npm install
npm run build -- --configuration production

echo "Build completed!"