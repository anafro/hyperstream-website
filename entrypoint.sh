#!/usr/bin/env bash
set -xe

if ! grep -q "APP_KEY" .env 2>/dev/null; then
    echo "App key missing, generating..."
    php artisan key:generate
fi

if [ "$MIGRATE" = "true" ]; then
    echo "Running migrations..."
    php artisan migrate --force
fi

exec "$@"
