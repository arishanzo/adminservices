<?php

use App\Http\Controllers\Auth\AuthProsesController;
use App\Http\Controllers\Auth\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Gateway\ServiceCommunicationController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\PromoController;
use App\Http\Controllers\saldo\SaldoKeluarController;
use App\Http\Controllers\saldo\SaldoMasukController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::get('/auth/google/redirect', [GoogleController::class, 'redirectToGoogle']);
// Route::post('/auth/google/callback', [GoogleController::class, 'handleGoogleCallback']);

Route::middleware(['auth:sanctum', 'throttle:1000,1'])->get('/user', [AuthProsesController::class, 'user']);


Route::get('/sanctum/csrf-cookie', function () {
    return response()->json(['csrf' => csrf_token()]);
});

Route::get('/check-session', function () {
    return response()->json([
        'authenticated' => Auth::check()
    ]);
});


Route::post('/logout', function (Request $request) {
    Auth::guard('web')->logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return response()->json(['message' => 'Logout berhasil']);
});



Route::post('/login', [AuthProsesController::class, 'login'])->name('login');

Route::post('/logout', [AuthProsesController::class, 'logout'])->middleware('auth:sanctum');


Route::post('/password/send-code', [PasswordResetController::class, 'requestCode']);
Route::post('/password/verify-code', [PasswordResetController::class, 'checkCode']);
Route::post('/password/reset', [PasswordResetController::class, 'updatePassword']);



Route::get('/hello', function () {
    return ['message' => 'Hello from Laravel API 🚀'];
});


Route::prefix('services')->middleware(['throttle:100,1', 'service.auth'])->group(function () {

    Route::get('booking/{idProfilGuru}', [ServiceCommunicationController::class, 'getBookingKelas']);
    Route::put('bookingupdate/{idBookingPrivate}', [ServiceCommunicationController::class, 'putBookingKelas']);

    
    Route::put('tglbooking/{idtglbooking}', [ServiceCommunicationController::class, 'putTglBooking']);

    Route::get('gurus', [ServiceCommunicationController::class, 'getAllGurus']);
    Route::post('cross-data', [ServiceCommunicationController::class, 'crossServiceData']);
});






Route::middleware('auth:sanctum')->group(function () {

    Route::get('/notifications', function (Request $request) {
        return $request->user()->notifications;
    });

    Route::get('/saldomasuk', [SaldoMasukController::class, 'getAllSaldoMasuk']);
    Route::get('/saldokeluar', [SaldoKeluarController::class, 'getAllSaldoKeluar']);
    Route::get('/promo', [PromoController::class, 'getAllPromo']);
    Route::post('/createpromo', [PromoController::class, 'store']);
    Route::post('/editpromo/{idpromo}', [PromoController::class, 'update']);
    Route::delete('/hapuspromo/{idpromo}', [PromoController::class, 'destroy']);

});

