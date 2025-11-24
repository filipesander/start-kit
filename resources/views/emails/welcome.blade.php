<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Bem-vindo ao {{ $appName }}</title>
    <style>
        /* Reset */
        body, table, td, a {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        table, td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        /* Base */
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f4f7;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px 20px;
            text-align: center;
        }

        .logo {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
        }

        .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            letter-spacing: -0.5px;
        }

        /* Content */
        .content {
            background: #ffffff;
            padding: 40px 30px;
        }

        .greeting {
            color: #1a1a1a;
            font-size: 24px;
            font-weight: 600;
            margin: 0 0 20px 0;
        }

        .message {
            color: #4a5568;
            font-size: 16px;
            line-height: 1.6;
            margin: 0 0 20px 0;
        }

        .highlight-box {
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
            border-left: 4px solid #667eea;
            padding: 20px;
            margin: 30px 0;
            border-radius: 8px;
        }

        .highlight-text {
            color: #2d3748;
            font-size: 15px;
            line-height: 1.6;
            margin: 0;
        }

        /* Button */
        .button-container {
            text-align: center;
            margin: 30px 0;
        }

        .button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #ffffff !important;
            text-decoration: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.3s ease;
        }

        .button:hover {
            box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
            transform: translateY(-2px);
        }

        /* Features */
        .features {
            margin: 30px 0;
        }

        .feature-item {
            padding: 15px 0;
            border-bottom: 1px solid #e2e8f0;
        }

        .feature-item:last-child {
            border-bottom: none;
        }

        .feature-icon {
            display: inline-block;
            width: 24px;
            height: 24px;
            margin-right: 12px;
            vertical-align: middle;
        }

        .feature-text {
            display: inline-block;
            color: #4a5568;
            font-size: 15px;
            vertical-align: middle;
        }

        /* Footer */
        .footer {
            background: #2d3748;
            padding: 30px 20px;
            text-align: center;
        }

        .footer-text {
            color: #cbd5e0;
            font-size: 14px;
            line-height: 1.6;
            margin: 0 0 15px 0;
        }

        .footer-link {
            color: #667eea;
            text-decoration: none;
        }

        .footer-link:hover {
            text-decoration: underline;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            display: inline-block;
            margin: 0 10px;
            color: #cbd5e0;
            text-decoration: none;
            font-size: 14px;
        }

        /* Responsive */
        @media only screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
            }

            .content {
                padding: 30px 20px !important;
            }

            .header {
                padding: 30px 15px !important;
            }

            .header-title {
                font-size: 24px !important;
            }

            .greeting {
                font-size: 20px !important;
            }

            .message {
                font-size: 15px !important;
            }

            .button {
                padding: 14px 30px !important;
                font-size: 15px !important;
            }
        }
    </style>
</head>
<body>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
        <tr>
            <td style="padding: 40px 10px;">
                <table role="presentation" class="email-container" cellspacing="0" cellpadding="0" border="0" width="600" align="center">

                    <!-- Header -->
                    <tr>
                        <td class="header">
                            <div class="logo">🚀</div>
                            <h1 class="header-title">{{ $appName }}</h1>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td class="content">
                            <h2 class="greeting">Olá, {{ $userName }}! 👋</h2>

                            <p class="message">
                                Seja muito bem-vindo(a) ao <strong>{{ $appName }}</strong>! Estamos muito felizes em tê-lo(a) conosco.
                            </p>

                            <p class="message">
                                Sua conta foi criada com sucesso e você já pode começar a aproveitar todos os recursos do nosso sistema.
                            </p>

                            <div class="highlight-box">
                                <p class="highlight-text">
                                    <strong>💡 Dica:</strong> Explore todas as funcionalidades disponíveis e configure seu perfil para ter a melhor experiência possível!
                                </p>
                            </div>

                            <div class="button-container">
                                <a href="{{ $appUrl }}" class="button">
                                    Acessar Minha Conta
                                </a>
                            </div>

                            <div class="features">
                                <div class="feature-item">
                                    <span class="feature-icon">✨</span>
                                    <span class="feature-text">Interface moderna e intuitiva</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-icon">📱</span>
                                    <span class="feature-text">Acesse de qualquer dispositivo</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-icon">🔒</span>
                                    <span class="feature-text">Seus dados seguros e protegidos</span>
                                </div>
                                <div class="feature-item">
                                    <span class="feature-icon">⚡</span>
                                    <span class="feature-text">Performance rápida e confiável</span>
                                </div>
                            </div>

                            <p class="message" style="margin-top: 30px;">
                                Se tiver alguma dúvida ou precisar de ajuda, não hesite em nos contatar. Estamos sempre à disposição!
                            </p>

                            <p class="message">
                                Obrigado por escolher o <strong>{{ $appName }}</strong>!
                            </p>

                            <p class="message" style="color: #718096; font-size: 14px; margin-top: 30px;">
                                Atenciosamente,<br>
                                <strong>Equipe {{ $appName }}</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td class="footer">
                            <p class="footer-text">
                                Este é um email automático. Por favor, não responda.
                            </p>

                            <p class="footer-text">
                                <a href="{{ $appUrl }}" class="footer-link">Visite nosso site</a>
                            </p>

                            <p class="footer-text" style="font-size: 12px; color: #a0aec0; margin-top: 20px;">
                                © {{ date('Y') }} {{ $appName }}. Todos os direitos reservados.
                            </p>

                            <p class="footer-text" style="font-size: 12px; color: #a0aec0;">
                                Você recebeu este email porque criou uma conta em {{ $appName }}.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
