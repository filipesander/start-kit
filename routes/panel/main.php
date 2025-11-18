<?php

use App\Http\Controllers\Panel\Main\UsersController;
use Illuminate\Support\Facades\Route;

Route::resource('users', 'UsersController');
Route::put('/users/{user}/reset-2fa', [UsersController::class, 'reset2Fa'])->name('users.reset-2fa');

Route::resource('groups', 'GroupsController');
