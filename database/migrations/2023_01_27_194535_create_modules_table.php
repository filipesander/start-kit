<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('environment_id');
            $table->unsignedBigInteger('module_id')->nullable();
            $table->string('label');
            $table->string('slug')->index();
            $table->string('icon');
            $table->string('route');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();

            $table->foreign('environment_id')
                ->references('id')
                ->on('environments')
                ->onDelete('cascade');

            $table->foreign('module_id')
                ->references('id')
                ->on('modules')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modules');
    }
};
