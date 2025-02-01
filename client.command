#!/bin/bash

# Start the client
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

pnpm start &

# Start the server
cd /Users/jonathon/MyCodingProjects/project-tracker/server
if [ ! -d "/Users/jonathon/MyCodingProjects/project-tracker/server" ]; then
    echo "Error: Server directory not found!"
    exit 1
fi

source venv/bin/activate
if [ $? -ne 0 ]; then
    echo "Error: Could not activate server virtual environment!"
    exit 1
fi

npm start &

# Wait for both processes to finish
wait

# This script will now keep running until you manually terminate it with Ctrl+C
