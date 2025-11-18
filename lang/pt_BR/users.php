<?php

use App\Models\Panel\Main\User;

return [
    'roles' => [
        User::ROLE_NORMAL => 'Normal',
        User::ROLE_DIRECTOR => 'Diretor',
        User::ROLE_ADMINISTRATOR => 'Administrador',
        User::ROLE_MANAGER => 'Gestor',
    ],
];
