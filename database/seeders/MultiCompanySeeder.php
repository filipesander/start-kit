<?php

namespace Database\Seeders;

use App\Models\Panel\Main\Company;
use App\Models\Panel\Main\Group;
use App\Models\Panel\Main\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MultiCompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->command->info('🚀 Iniciando seed de múltiplas empresas...');

        // Desabilitar temporariamente o scope global
        User::withoutGlobalScope(\App\Models\Scopes\CompanyScope::class, function () {
            Group::withoutGlobalScope(\App\Models\Scopes\CompanyScope::class, function () {
                $this->createCompaniesWithUsersAndGroups();
            });
        });

        $this->command->info('✅ Seed concluído com sucesso!');
    }

    private function createCompaniesWithUsersAndGroups(): void
    {
        // Criar super admin (sem empresa)
        $superAdmin = User::factory()->superAdmin()->create([
            'name' => 'Super Admin',
            'email' => 'admin@system.com',
        ]);
        $this->command->info("✓ Super Admin criado: {$superAdmin->email}");

        // Criar 3 empresas de teste
        $companiesData = [
            ['name' => 'Tech Solutions LTDA', 'cnpj' => '12.345.678/0001-90'],
            ['name' => 'Marketing Pro LTDA', 'cnpj' => '98.765.432/0001-10'],
            ['name' => 'Consultoria ABC LTDA', 'cnpj' => '11.222.333/0001-44'],
        ];

        foreach ($companiesData as $index => $companyData) {
            $company = Company::factory()->create($companyData);
            $this->command->info("\n📦 Empresa criada: {$company->name}");

            // Criar grupos para esta empresa
            $groups = [
                Group::factory()->create([
                    'name' => 'Administradores',
                    'company_id' => $company->id,
                ]),
                Group::factory()->create([
                    'name' => 'Gerentes',
                    'company_id' => $company->id,
                ]),
                Group::factory()->create([
                    'name' => 'Colaboradores',
                    'company_id' => $company->id,
                ]),
            ];

            $this->command->info("  ✓ {$groups->count()} grupos criados");

            // Criar administrador da empresa
            $admin = User::factory()->administrator()->create([
                'name' => "Admin {$company->name}",
                'email' => "admin@empresa" . ($index + 1) . ".com",
                'company_id' => $company->id,
                'original_company_id' => $company->id,
            ]);

            // Vincular admin aos grupos
            $admin->groups()->attach($groups->pluck('id'));
            $this->command->info("  ✓ Administrador: {$admin->email} (senha: password)");

            // Criar gerentes (2 por empresa)
            $managers = User::factory()->manager()->count(2)->create([
                'company_id' => $company->id,
                'original_company_id' => $company->id,
            ]);

            foreach ($managers as $manager) {
                // Vincular aos grupos de gerentes e colaboradores
                $manager->groups()->attach([
                    $groups[1]->id, // Gerentes
                    $groups[2]->id, // Colaboradores
                ]);
            }
            $this->command->info("  ✓ {$managers->count()} gerentes criados");

            // Criar usuários normais (5-8 por empresa)
            $usersCount = rand(5, 8);
            $normalUsers = User::factory()->count($usersCount)->create([
                'company_id' => $company->id,
                'original_company_id' => $company->id,
            ]);

            foreach ($normalUsers as $user) {
                // Vincular apenas ao grupo de colaboradores
                $user->groups()->attach($groups[2]->id);
            }
            $this->command->info("  ✓ {$usersCount} usuários normais criados");

            // Vincular empresa ao admin como proprietário
            DB::table('company_user')->insert([
                'company_id' => $company->id,
                'user_id' => $admin->id,
                'is_owner' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // Resumo final
        $this->command->info("\n" . str_repeat('=', 50));
        $this->command->info('📊 RESUMO:');
        $this->command->info("   Empresas criadas: " . Company::count());
        $this->command->info("   Usuários criados: " . User::count());
        $this->command->info("   Grupos criados: " . Group::count());
        $this->command->info("\n🔑 CREDENCIAIS:");
        $this->command->info("   Super Admin: admin@system.com / password");
        $this->command->info("   Admin Empresa 1: admin@empresa1.com / password");
        $this->command->info("   Admin Empresa 2: admin@empresa2.com / password");
        $this->command->info("   Admin Empresa 3: admin@empresa3.com / password");
        $this->command->info(str_repeat('=', 50));
    }
}
