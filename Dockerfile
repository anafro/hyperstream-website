FROM dunglas/frankenphp:1-php8.5.2
RUN install-php-extensions \
    pcntl

WORKDIR /app
COPY . .
COPY --from=composer:2.9.5 /usr/bin/composer /usr/bin/composer
RUN ["composer", "install", "--no-dev", "--optimize-autoloader"]
RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
