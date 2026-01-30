FROM dunglas/frankenphp:1-php8.5.2
RUN install-php-extensions \
    pcntl

WORKDIR /app
COPY . .
RUN ["chmod", "+x", "./entrypoint.sh"]

EXPOSE 80
ENTRYPOINT ["./entrypoint.sh"]
CMD ["php", "artisan", "octane:frankenphp", "--host=0.0.0.0", "--port=80"]
