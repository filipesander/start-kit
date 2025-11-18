<?php

use App\Http\Controllers\Panel\Profile\MeController;
use App\Http\Controllers\Panel\Profile\OneTimePasswordController;
use Illuminate\Support\Facades\Route;

Route::get('otp', [OneTimePasswordController::class, 'edit'])->name('otp.edit');
Route::patch('otp', [OneTimePasswordController::class, 'update'])->name('otp.update');

Route::get('me', [MeController::class, 'edit'])->name('me.edit');
Route::patch('me', [MeController::class, 'update'])->name('me.update');
