<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover">

        <title inertia>{{ config('app.name', 'Start Kit') }}</title>
	    @vite(['resources/sass/app.scss'])

        <!-- Favicons -->
        <link rel="icon" type="image/svg+xml" href="/favicon.svg">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="shortcut icon" href="/favicon.ico">
        <link rel="apple-touch-icon" href="/apple-touch-icon.png">

        <!-- PWA Meta Tags -->
        <meta name="application-name" content="{{ config('app.name', 'Sistema') }}">
        <meta name="mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="apple-mobile-web-app-title" content="{{ config('app.name', 'Sistema') }}">
        <meta name="theme-color" content="#667eea">
        <meta name="msapplication-TileColor" content="#667eea">
        <meta name="msapplication-tap-highlight" content="no">

        <!-- PWA Manifest -->
        <link rel="manifest" href="/manifest.json">

        <!-- Apple Touch Icons -->
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.png">
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-192x192.png">

        <!-- Favicon -->
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-72x72.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-72x72.png">

        <!-- Splash Screens for iOS -->
        <link rel="apple-touch-startup-image" media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/iPhone_11__iPhone_XR_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" href="/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/12.9__iPad_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/11__iPad_Pro__10.5__iPad_Pro_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/10.9__iPad_Air_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/10.5__iPad_Air_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/10.2__iPad_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png">
        <link rel="apple-touch-startup-image" media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" href="/splash/8.3__iPad_Mini_portrait.png">

        <!-- Fonts -->
	    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <!-- Scripts -->
        @routes('panel')
        @viteReactRefresh
        @vite(['resources/js/panel.jsx', "resources/js/Pages/Panel/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased" style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
        @inertia

        <!-- PWA Service Worker Registration - TEMPORARIAMENTE DESABILITADO -->
        <script>
            // Service Worker desabilitado temporariamente - problemas com cache
            // Desregistra qualquer service worker existente
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                        registration.unregister();
                        console.log('Service Worker desregistrado:', registration.scope);
                    }
                });
            }

            // Previne comportamento de zoom em iOS
            document.addEventListener('gesturestart', (e) => {
                e.preventDefault();
            });

            // Detecta se está instalado como PWA
            window.addEventListener('DOMContentLoaded', () => {
                const isPWA = window.matchMedia('(display-mode: standalone)').matches
                    || window.navigator.standalone
                    || document.referrer.includes('android-app://');

                if (isPWA) {
                    document.body.classList.add('pwa-mode');
                }
            });

            // Previne pull-to-refresh no Chrome Android
            let lastTouchY = 0;
            let preventPullToRefresh = false;

            document.addEventListener('touchstart', (e) => {
                if (e.touches.length !== 1) return;
                lastTouchY = e.touches[0].clientY;
                preventPullToRefresh = window.pageYOffset === 0;
            }, { passive: false });

            document.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const touchYDelta = touchY - lastTouchY;
                lastTouchY = touchY;

                if (preventPullToRefresh && touchYDelta > 0) {
                    e.preventDefault();
                }
            }, { passive: false });
        </script>
    </body>
</html>
