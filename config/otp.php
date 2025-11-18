<?php

return [

    /*
     * Enable / disable Google2FA.
     */
    'enabled' => env('OTP_ENABLED', true),

    /*
     * One Time Password Window.
     * Each window is equals to 30s. (10 = 5min)
     */
    'window' => env('OTP_WINDOW', 10),
];
