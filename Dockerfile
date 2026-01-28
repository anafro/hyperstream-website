FROM jkaninda/laravel-php-fpm:8.4-alpine

WORKDIR /var/www/html
COPY . .
RUN composer install --no-interaction --prefer-dist
RUN wget -O /usr/local/bin/php-fpm-healthcheck \
    https://raw.githubusercontent.com/renatomefi/php-fpm-healthcheck/master/php-fpm-healthcheck \
    && chmod +x /usr/local/bin/php-fpm-healthcheck

