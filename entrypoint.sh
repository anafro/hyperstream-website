#!/usr/bin/env bash
set -xe

if ! grep -q "APP_KEY" .env 2>/dev/null; then
    echo "App key missing, generating..."
    php artisan key:generate
fi

if [ "$VITE_DEV" = "true" ]; then
    echo "Running Vite development server..."
    npm run dev >/proc/1/fd/1 2>/proc/1/fd/2 &
    disown
fi

if [ "$MIGRATE" = "true" ]; then
    echo "Running migrations..."
    php artisan migrate --force
fi

exec "$@"
