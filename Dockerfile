FROM dunglas/frankenphp:1-php8.5.2
RUN install-php-extensions \
    pcntl
WORKDIR /app
COPY . .
EXPOSE 80
RUN ["php", "artisan", "migrate"]
ENTRYPOINT ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
