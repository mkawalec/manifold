#!/bin/bash
export $(cat .env|xargs)
mariner migrate up
