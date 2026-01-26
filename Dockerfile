FROM jkaninda/laravel-php-fpm:8.4-alpine

WORKDIR /var/www/html
COPY . .
RUN composer install --no-interaction --prefer-dist

