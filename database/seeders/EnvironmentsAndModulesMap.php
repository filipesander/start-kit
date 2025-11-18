<?php

return [
    'panel' => [
        'main' => [
            'label' => 'Configurações',
            'slug' => 'main',
            'icon' => 'UilSetting',
            'order' => 0,
            'modules' => [
                'groups' => [
                    'label' => 'Grupos',
                    'slug' => 'groups',
                    'icon' => 'UilLayerGroup',
                    'route' => 'panel.main.groups.index',
                    'order' => 2,
                ],
                'users' => [
                    'label' => 'Usuários',
                    'slug' => 'users',
                    'icon' => 'UilUsersAlt',
                    'route' => 'panel.main.users.index',
                    'order' => 3,
                ],
            ],
        ],
        'profile' => [
            'label' => 'Perfil',
            'slug' => 'profile',
            'icon' => 'UilUserSquare',
            'order' => 9999,
            'modules' => [
                'me' => [
                    'label' => 'Meus Dados',
                    'slug' => 'me',
                    'icon' => 'UilUserCircle',
                    'route' => 'panel.profile.me.edit',
                    'order' => 9998,
                ],
                'otp' => [
                    'label' => '2FA',
                    'slug' => 'otp',
                    'icon' => 'UilShieldPlus',
                    'route' => 'panel.profile.otp.edit',
                    'order' => 9999,
                ],
            ],
        ],
    ],
];
