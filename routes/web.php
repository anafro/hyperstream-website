<?php

use App\Http\Controllers\StatusController;
use App\Support\Inertia\InertiaRoute;
use Illuminate\Support\Facades\Route;

InertiaRoute::view('/', 'Landing')->name('landing');
InertiaRoute::view('/favorites', 'Favorites')->name('favorites');
InertiaRoute::view('/song/{songId}', 'Song')->name('song');
InertiaRoute::view('/remix/{songId}', 'Remix')->name('remix');

Route::get("/status", StatusController::class);
