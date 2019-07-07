#!/usr/bin/env bash

# start app (no debugging)
echo "Starting app..."

if [ $NODE_ENV == "dev" ]; then
  pm2-dev start "$PROJECT_ROOT/index.js"
else
  pm2 start "$PROJECT_ROOT/index.js" --no-daemon
fi