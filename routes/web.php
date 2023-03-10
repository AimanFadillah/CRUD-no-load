<?php

use App\Http\Controllers\PendudukController;
use Illuminate\Support\Facades\Route;

Route::get("/",[PendudukController::class,"index"]);
Route::get("/penduduk",[PendudukController::class,"index"]);
Route::get("/penduduk/data",[PendudukController::class,"data"]);
Route::post("/penduduk",[PendudukController::class,"createPenduduk"]);
Route::delete("/penduduk/{Penduduk:id}/",[PendudukController::class,"hapusPenduduk"]);
Route::put("/penduduk/{Penduduk:id}/",[PendudukController::class,"updatePenduduk"]);