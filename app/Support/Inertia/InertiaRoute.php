<?php

namespace App\Support\Inertia;

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

class InertiaRoute
{
    /**
     * Defines a new GET route that renders an Inertia page component.
     *
     * @param string $uri The URL of the route
     * @param string $component The component name
     * @return Route
     */
    public static function view(string $uri, string $component): \Illuminate\Routing\Route
    {
        return Route::get(uri: $uri, action: function () use ($component): \Inertia\Response {
            return Inertia::render($component);
        });
    }
}
