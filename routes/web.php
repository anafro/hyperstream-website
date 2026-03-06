<?php

use App\Http\Controllers\StatusController;
use App\Support\Inertia\InertiaRoute;
use Illuminate\Support\Facades\Route;

InertiaRoute::view('/', 'Landing')->name('landing');
InertiaRoute::view('/favorites', 'Favorites')->name('favorites');
Route::get("/status", StatusController::class);
