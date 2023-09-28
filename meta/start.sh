#!/usr/bin/env bash

npx concurrently --names serve,build,types 'meta/serve.sh' 'meta/build-watch.js' 'meta/typecheck-watch.sh'
