#!/usr/bin/env bash

npx concurrently --names serve,build,types 'meta/serve.sh' 'meta/build-watch.ts' 'meta/typecheck-watch.sh'
