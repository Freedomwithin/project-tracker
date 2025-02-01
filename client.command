#!/bin/bash

cd /Users/jonathon/MyCodingProjects/project-tracker/client
if [ ! -d "/Users/jonathon/MyCodingProjects/project-tracker/client" ]; then
    echo "Error: Client directory not found!"
    exit 1
fi

source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "Error: Could not activate client virtual environment!"
    exit 1
fi

pnpm start
