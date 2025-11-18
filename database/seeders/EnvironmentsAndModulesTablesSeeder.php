<?php

namespace Database\Seeders;

use App\Models\Environment;
use App\Models\Module;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class EnvironmentsAndModulesTablesSeeder extends Seeder
{
    protected $environments = [];

    protected $modules = [];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect(require('EnvironmentsAndModulesMap.php'))
            ->each(function (array $environments, string $root) {
                collect($environments)->each(function (array $environment, string $slug) use ($root) {
                    $modules = collect($environment['modules'] ?? []);
                    unset($environment['modules']);

                    $environment = Environment::updateOrCreate([
                        'slug' => $slug,
                    ], $environment);

                    $modules->each(function (array $module, string $slug) use ($environment) {
                        $children = collect($module['children'] ?? []);
                        unset($module['children']);

                        $module = Module::updateOrCreate([
                            'environment_id' => $environment->id,
                            'slug' => $slug,
                        ], $module);

                        $this->handleChildren($children, $module);

                        $this->modules[$module->id] = true;
                    });

                    $this->environments[$environment->id] = true;
                });
            });

        Environment::whereNotIn('id', array_keys($this->environments))->delete();

        Module::whereNotIn('id', array_keys($this->modules))->delete();
    }

    public function handleChildren(Collection $children, Module $module)
    {
        $children->each(function (array $child, string $slug) use ($module) {
            $children = collect($child['children'] ?? []);
            unset($child['children']);

            $child = Module::updateOrCreate([
                'environment_id' => $module->environment_id,
                'module_id' => $module->id,
                'slug' => $slug,
            ], $child);

            if ($children->isNotEmpty()) {
                $this->handleChildren($children, $child);
            }

            $this->modules[$child->id] = true;
        });
    }
}
