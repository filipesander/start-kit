<?php

use App\Http\Controllers\Panel\Main\UsersController;
use App\Http\Controllers\Panel\Main\CompaniesController;
use Illuminate\Support\Facades\Route;

Route::resource('users', 'UsersController');
Route::put('/users/{user}/reset-2fa', [UsersController::class, 'reset2Fa'])->name('users.reset-2fa');

Route::resource('groups', 'GroupsController');

Route::resource('companies', 'CompaniesController');
Route::get('/companies-available', [CompaniesController::class, 'getAvailableCompanies'])->name('companies.available');
Route::post('/companies/switch', [CompaniesController::class, 'switchCompany'])->name('companies.switch');
Route::post('/companies/{company}/users', [CompaniesController::class, 'addUser'])->name('companies.users.add');
Route::delete('/companies/{company}/users/{user}', [CompaniesController::class, 'removeUser'])->name('companies.users.remove');
