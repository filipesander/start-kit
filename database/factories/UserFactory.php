<?php

namespace Database\Factories;

use App\Models\Panel\Main\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Panel\Main\User>
 */
class UserFactory extends Factory
{
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'), // password
            'remember_token' => Str::random(10),
            'role' => User::ROLE_NORMAL,
            'company_id' => null, // Será definido no seeder
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     *
     * @return static
     */
    public function unverified()
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Create a super admin user.
     *
     * @return static
     */
    public function superAdmin()
    {
        return $this->state(fn (array $attributes) => [
            'role' => User::ROLE_SUPERADMIN,
            'company_id' => null,
        ]);
    }

    /**
     * Create an administrator user.
     *
     * @return static
     */
    public function administrator()
    {
        return $this->state(fn (array $attributes) => [
            'role' => User::ROLE_ADMINISTRATOR,
        ]);
    }

    /**
     * Create a manager user.
     *
     * @return static
     */
    public function manager()
    {
        return $this->state(fn (array $attributes) => [
            'role' => User::ROLE_MANAGER,
        ]);
    }

    /**
     * Create a director user.
     *
     * @return static
     */
    public function director()
    {
        return $this->state(fn (array $attributes) => [
            'role' => User::ROLE_DIRECTOR,
        ]);
    }
}
