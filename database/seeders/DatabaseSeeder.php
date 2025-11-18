<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Module;
use App\Models\Panel\Main\Group;
use App\Models\Panel\Main\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(EnvironmentsAndModulesTablesSeeder::class);

        $this->configAdmin();
    }

    protected function configAdmin()
    {
        $group = Group::firstOrCreate([
            'name' => 'Administrador',
        ]);

        if ($group->wasRecentlyCreated) {
            $modules = Module::get()
                ->mapWithKeys(function ($module) {
                    return [
                        $module->id => [
                            'create' => true,
                            'read' => true,
                            'update' => true,
                            'delete' => true,
                        ],
                    ];
                });

            $group->modules()->attach($modules);
        }

        if (!$user = User::first()) {
            $user = User::create([
                'name' => 'Default',
                'email' => 'default@email.com',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]);
        }

        if ($user->wasRecentlyCreated) {
            $user->groups()->attach($group->id);
        }
    }
}
