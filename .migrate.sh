#!/bin/bash
export $(cat .env|xargs)
node_modules/mariner/dist/cli.js migrate up
