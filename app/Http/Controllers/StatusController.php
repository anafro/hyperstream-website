<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StatusController extends Controller
{
    public function __invoke(Request $request): mixed
    {
        return response()->json(['status' => 'up']);
    }
}
