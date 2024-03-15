#!/bin/bash

if [ -d "node_modules" ]; then
    rm -rf node_modules
fi

pnpm

pnpm install --only=production

pnpm start

tail -f /dev/null