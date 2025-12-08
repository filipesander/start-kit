<?php

namespace Database\Factories\Panel\Main;

use App\Models\Panel\Main\Group;
use Illuminate\Database\Eloquent\Factories\Factory;

class GroupFactory extends Factory
{
    protected $model = Group::class;

    public function definition(): array
    {
        return [
            'name' => fake()->randomElement([
                'Administradores',
                'Gerentes',
                'Vendedores',
                'Suporte',
                'Financeiro',
                'Marketing',
                'RH',
                'TI',
            ]) . ' - ' . fake()->word(),
            'company_id' => null, // Será definido no seeder
        ];
    }
}
