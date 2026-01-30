FROM dunglas/frankenphp:1-php8.5.2
RUN install-php-extensions \
    pcntl \
    zip

WORKDIR /app
COPY . .
COPY --from=composer:2.9.5 /usr/bin/composer /usr/bin/composer
RUN apt-get update \
    && apt-get install -y --no-install-recommends unzip git \
    && rm -rf /var/lib/apt/lists/*
RUN ["composer", "install", "--no-dev", "--optimize-autoloader"]
RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
