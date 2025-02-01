#!/bin/bash

# --- Server Start ---
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

pnpm start &

# --- Wait for a fixed amount of time ---
sleep 10 # Adjust this delay as needed

# --- Open client.command ---
open -a Terminal /Users/jonathon/MyCodingProjects/project-tracker/client.command
