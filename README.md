# Boilerplate Backend Master

Starter kit para acelerar o desenvolvimento de painéis administrativos B2B e SaaS. O projeto entrega autenticação completa para o painel, gestão multi-empresa, grupos de acesso baseados em módulos, suporte a 2FA/OTP e uma base front-end com Inertia + React + Material UI pronta para personalização.

## Principais recursos

- **Multi-tenant orientado a empresas**: usuários podem pertencer a várias empresas, trocar de contexto e assumir companhias dentro do mesmo grupo.
- **Sistema de permissões granular**: grupos controlam módulos com capacidades `create/read/update/delete` e alimentam automaticamente o menu e o middleware de autorização.
- **Fluxos de autenticação do painel**: login, registro interno, confirmação de senha, recuperação/redefinição, verificação de e-mail e logout utilizando guard `panel`.
- **Proteções adicionais**: integração opcional com Google Authenticator/OTP, geração de menus dependentes de permissão e camada Middleware que congraga o contexto de ambiente/módulo correntes.
- **Stack moderna**: Laravel 10, Inertia.js, React 18, Vite e Material UI com suporte a Ziggy para rotas no front-end.

## Arquitetura em alto nível

| Área | Descrição |
| --- | --- |
| `app/Http/Controllers/Panel/*` | Controladores do painel por domínio (Auth, Profile, Main). Todos usam middleware `panel` com rota dedicada. |
| `app/Http/Middleware/Authenticated/*` | Ajusta contexto de ambiente/módulo, gera menu e permissões e aplica políticas adicionais (OTP, SuperAdmin, sessões por empresa). |
| `app/Models` | Modelos principais (`User`, `Company`, `Group`, `Module`, `Environment`) com relacionamentos para multi-tenancy. |
| `routes/panel/*.php` | Conjunto de rotas segmentadas por “ambiente” que são montadas dinamicamente (`main`, `auth`, `profile`, etc.). |
| `resources/js` | Front-end Inertia/React baseado em Material UI, pronto para criação de páginas e componentes compartilhados. |
| `config/otp.php` | Centraliza o comportamento do mecanismo 2FA (habilitado por padrão). |

## Requisitos

- PHP 8.2+
- Composer 2
- Node.js 18+ e npm/yarn
- Banco de dados suportado pelo Laravel (MySQL/PostgreSQL/MariaDB, etc.)
- Redis ou outro cache se desejar melhorar invalidação de permissões/menus

## Primeiros passos

1. **Clonar e instalar dependências**
   ```bash
   git clone <seu-repo> boilerplate-backend-master
   cd boilerplate-backend-master
   composer install
   npm install
   ```
2. **Configurar ambiente**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```
   - Ajuste `APP_URL`, `APP_PANEL_URL`, credenciais de banco de dados, cache e e-mail.
   - Configure `OTP_ENABLED`/`OTP_WINDOW` se quiser exigir 2FA.
   - Defina `APP_FORCE_SECURE_PROTOCOL` quando o painel rodar atrás de HTTPS.
3. **Migrar e popular dados**
   ```bash
   php artisan migrate --seed
   ```
   Adapte os seeders para criar empresas, grupos, módulos e usuários iniciais conforme sua necessidade.
4. **Rodar back-end e front-end**
   ```bash
   php artisan serve          # ou use Valet/Sail
   npm run dev                # ambiente de desenvolvimento
   # npm run build            # build para produção
   ```
5. **Acessar o painel**
   - Painel local padrão: `http://localhost:8000/panel` (ou `APP_PANEL_URL`).
   - Utilize o usuário seedado ou crie um novo via interface de registro do painel.

## Scripts úteis

| Comando | Descrição |
| --- | --- |
| `php artisan test` | Executa a suíte de testes PHP (amplie com testes de integração do painel). |
| `php artisan migrate:fresh --seed` | Recria o banco para ambientes locais. |
| `npm run dev` / `npm run build` | Build incremental ou compilação otimizada do front-end. |
| `php artisan route:list` | Inspeção rápida das rotas do painel (útil após criar novos ambientes). |

## Qualidade e segurança

- Middleware `GeneratePermissions` e `GenerateMenu` populam o usuário com todos os dados necessários por requisição; avalie estratégia de cache/bust se personalizar as permissões.
- `OneTimePassword` já valida se o usuário está no fluxo de configuração e permite future toggles para exigir configuração/verificação de OTP.
- Registre qualquer modificação crítica (novo guard, módulo, política) com testes Feature para manter o kit confiável entre projetos.

## Próximos passos sugeridos

1. Criar seeders e testes cobrindo fluxo de permissão, troca de empresa e 2FA.
2. Ajustar o layout/tema em `resources/js` para o branding do novo SaaS.
3. Automatizar deploy (CI/CD) e definir como a versão do código será preenchida (substituir `setCodeVersion` com variável de ambiente no build).
4. Mapear os ambientes/módulos que cada novo projeto exigirá e gerar scaffolds com base no `routes/panel/*.php`.

Com esse kit você inicia novos painéis B2B com autenticação, autorização e estrutura front/back padronizadas, focando apenas nas regras específicas de cada produto. Bons projetos!
