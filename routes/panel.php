<?php

use App\Http\Controllers\Panel\Controller;
use Illuminate\Support\Facades\Route;

Route::get('/', [Controller::class, '__invoke'])->name('index');
