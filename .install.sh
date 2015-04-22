#!/bin/bash
export $(cat .env|xargs)
npm install --python=${PYTHON} --ignore-scripts
