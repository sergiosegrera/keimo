#!/bin/bash

set -e

printf "  _           _ _                 _       _       
 | |         (_) |               | |     | |      
 | |__   ___  _| | ___ _ __ _ __ | | __ _| |_ ___ 
 | '_ \ / _ \| | |/ _ \ '__| '_ \| |/ _\` | __/ _ \\
 | |_) | (_) | | |  __/ |  | |_) | | (_| | ||  __/
 |_.__/ \___/|_|_|\___|_|  | .__/|_|\__,_|\__\___|
                           | |                    
                           |_|                    \n"

printf "\n--- What are we building? ---\n"

git remote remove origin

read -p "Enter the id of your app (lowercase, no spaces): " APPLICATION_ID
read -p "Enter the name of your app: " APP_NAME
read -p "Enter the contact email: " APP_CONTACT_EMAIL
read -p "Enter the URL of your app: " APP_URL

sed -i '' "s|export const APPLICATION_ID = \".*\";|export const APPLICATION_ID = \"$APPLICATION_ID\";|" lib/constants.ts
sed -i '' "s|export const APP_NAME = \".*\";|export const APP_NAME = \"$APP_NAME\";|" lib/constants.ts
sed -i '' "s|export const APP_CONTACT_EMAIL = \".*\";|export const APP_CONTACT_EMAIL = \"$APP_CONTACT_EMAIL\";|" lib/constants.ts
sed -i '' "s|export const APP_URL = \".*\";|export const APP_URL = \"$APP_URL\";|" lib/constants.ts

printf "\n--- Creating .env.local ---\n"
touch .env.local

echo "DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres" >> .env.local

echo "NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth/sign-in" >> .env.local
echo "NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth/sign-up" >> .env.local

echo "NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/app" >> .env.local
echo "NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/app" >> .env.local

echo "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=" >> .env.local
echo "CLERK_SECRET_KEY=" >> .env.local

printf "\n--- Installing dependencies ---\n"
pnpm install

printf "\n--- Starting the db ---\n"
printf "\nby the way, it can be stopped with pnpm db-stop\n"
pnpm db-start

printf "\n--- Generating migrations ---\n"
pnpm db-generate

printf "\n--- Running migrations ---\n"
pnpm db-migrate

printf "\n--- Clerk Environment Setup ---\n"
# Ask the user if they want to set up Clerk right now
read -p "Do you want to set up Clerk right now? (Y/n): " SET_UP_CLERK

if [ "$SET_UP_CLERK" == "Y" ] || [ "$SET_UP_CLERK" == "y" ] || [ -z "$SET_UP_CLERK" ]; then
    read -p "Enter your NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: " CLERK_PUB_KEY
    read -p "Enter your CLERK_SECRET_KEY: " CLERK_SECRET_KEY

    sed -i '' "s|^NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=.*|NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$CLERK_PUB_KEY|" .env.local
    sed -i '' "s|^CLERK_SECRET_KEY=.*|CLERK_SECRET_KEY=$CLERK_SECRET_KEY|" .env.local

    printf "\n--- Clerk keys set! ---\n"
else
    printf "\n--- Clerk keys not set. You can set them later in .env.local ---\n"
fi

printf "\n--- Set up complete! ---\n" 

printf "\n--- Starting the development server ---\n"
pnpm dev