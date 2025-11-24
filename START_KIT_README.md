# 🚀 Start Kit - Sistema de Gerenciamento Moderno

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)
![Mobile](https://img.shields.io/badge/mobile-first-green.svg)

**Start Kit** é um sistema de gerenciamento moderno, construído como PWA (Progressive Web App) com foco em mobile-first e experiência de usuário excepcional.

---

## ✨ Características Principais

### 🎨 Interface Moderna
- **Material Design** com Material-UI v5
- **Dark Mode** automático
- **Animações suaves** 60 FPS
- **Gradientes modernos** roxo/azul
- **Ícones** Unicons premium

### 📱 Mobile-First
- **PWA instalável** Android/iOS/Desktop
- **Sidebar com gestos** swipe intuitivo
- **Tabelas responsivas** cards expansíveis
- **Touch-optimized** área mínima 44px
- **Offline-ready** funciona sem internet

### ⚡ Performance
- **Service Worker** cache inteligente
- **Lazy loading** componentes sob demanda
- **Code splitting** otimizado
- **GPU acceleration** animações
- **Lighthouse score** 90+

### 🔒 Segurança
- **Laravel 10** framework PHP robusto
- **Autenticação** built-in
- **CSRF Protection** ativo
- **SQL Injection** prevenção
- **XSS Protection** sanitização

---

## 🛠️ Stack Tecnológica

### Backend
- **Laravel 10** - PHP Framework
- **MySQL** - Banco de dados
- **Inertia.js** - SPA sem API

### Frontend
- **React 18** - UI Library
- **Material-UI v5** - Component Library
- **Vite** - Build tool
- **SASS** - CSS preprocessor

### PWA
- **Manifest** - App configuration
- **Service Worker** - Offline & cache
- **Workbox** - SW strategies

---

## 📦 Instalação Rápida

### Requisitos
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8.0+

### Passo a Passo

```bash
# 1. Clone o repositório
git clone seu-repositorio.git
cd boilerplate-backend-master

# 2. Instale dependências PHP
composer install

# 3. Instale dependências Node
npm install

# 4. Configure o ambiente
cp .env.example .env
php artisan key:generate

# 5. Configure o banco de dados
# Edite .env com suas credenciais MySQL

# 6. Execute as migrations
php artisan migrate

# 7. Build dos assets
npm run build

# 8. Inicie o servidor
php artisan serve
```

**Acesse:** http://localhost:8000

---

## 🎯 Guias Rápidos

### Para Começar
1. ⚡ **[QUICK_START_PWA.md](QUICK_START_PWA.md)** - 5 minutos para PWA funcionando
2. 🎨 **[FAVICON_GUIDE.md](FAVICON_GUIDE.md)** - Configurar favicon
3. 📱 **[MOBILE_IMPROVEMENTS.md](MOBILE_IMPROVEMENTS.md)** - Recursos mobile

### Documentação Completa
- 📚 **[PWA_SETUP.md](PWA_SETUP.md)** - Setup completo PWA
- ✅ **[PWA_CHECKLIST.md](PWA_CHECKLIST.md)** - Checklist de produção
- 📖 **[.env.pwa.example](.env.pwa.example)** - Configurações PWA

---

## 🚀 Desenvolvimento

### Comandos Úteis

```bash
# Desenvolvimento (hot reload)
npm run dev

# Build de produção
npm run build

# Limpar caches Laravel
php artisan optimize:clear

# Otimizar para produção
php artisan optimize

# Executar testes
php artisan test
```

### Estrutura de Diretórios

```
boilerplate-backend-master/
├── app/                    # Código PHP (Controllers, Models)
├── resources/
│   ├── js/                # Componentes React
│   │   ├── Components/    # Componentes reutilizáveis
│   │   ├── Layouts/       # Layouts (Authenticated, Guest)
│   │   └── Pages/         # Páginas Inertia
│   ├── sass/              # Estilos SCSS
│   └── views/             # Views Blade (apenas shell)
├── public/                # Assets públicos
│   ├── icons/            # Ícones PWA
│   ├── splash/           # Splash screens iOS
│   └── manifest.json     # PWA manifest
├── routes/               # Rotas Laravel
└── database/             # Migrations, Seeders
```

---

## 📱 Recursos Mobile

### Gestos Touch
- **Swipe →** da borda esquerda - Abre sidebar
- **Swipe ←** - Fecha sidebar
- **Tap** no backdrop - Fecha sidebar
- **Tap** no card - Expande detalhes

### PWA Features
- ✅ Instalável no home screen
- ✅ Funciona offline
- ✅ Splash screens iOS/Android
- ✅ Push notifications ready
- ✅ Add to home screen
- ✅ Standalone mode

### Responsividade
- **Mobile:** < 677px
- **Tablet:** 677px - 1024px
- **Desktop:** > 1024px

---

## 🎨 Personalização

### Alterar Nome

**Arquivo:** `.env`
```env
APP_NAME="Seu Nome Aqui"
```

### Alterar Cores

**Arquivo:** `public/manifest.json`
```json
{
  "theme_color": "#SUA_COR",
  "background_color": "#SUA_COR"
}
```

**Arquivo:** `resources/views/panel.blade.php`
```html
<meta name="theme-color" content="#SUA_COR">
```

### Alterar Logo

**Arquivo:** `resources/js/Layouts/Components/Sidebar/Sidebar.jsx`
```jsx
// Linha ~113
<Unicons.UilRocket size={26} color="#fff" />
// Troque por outro ícone Unicons
```

### Criar Favicon Personalizado

Veja o guia completo: **[FAVICON_GUIDE.md](FAVICON_GUIDE.md)**

---

## 🧪 Testando PWA

### Lighthouse (Chrome)

```bash
# 1. Build de produção
npm run build

# 2. Inicie o servidor
php artisan serve

# 3. Abra DevTools (F12)
# 4. Aba "Lighthouse"
# 5. Selecione "Progressive Web App"
# 6. Clique "Analyze"
```

**Meta:** Score 90+ em todas as categorias

### Teste em Mobile

**Android (Chrome):**
1. Acesse o site
2. Menu → "Adicionar à tela inicial"
3. Abra o app instalado

**iOS (Safari):**
1. Acesse o site
2. Compartilhar → "Adicionar à Tela de Início"
3. Abra o app instalado

---

## 📊 Performance

### Métricas Atuais

```
✅ First Contentful Paint:  < 1.8s
✅ Largest Contentful Paint: < 2.5s
✅ Time to Interactive:     < 3.8s
✅ Cumulative Layout Shift: < 0.1
✅ First Input Delay:       < 100ms
```

### Otimizações Ativas

- ✅ Service Worker caching
- ✅ Lazy loading React
- ✅ Code splitting Vite
- ✅ GPU acceleration CSS
- ✅ Image optimization
- ✅ Minification (JS/CSS)
- ✅ Tree shaking
- ✅ Gzip compression

---

## 🔐 Segurança

### Proteções Ativas

- ✅ CSRF tokens
- ✅ SQL injection prevention
- ✅ XSS sanitization
- ✅ Password hashing (bcrypt)
- ✅ HTTPS ready
- ✅ Secure cookies
- ✅ Rate limiting

### Recomendações Produção

```env
# .env production
APP_ENV=production
APP_DEBUG=false
APP_URL=https://seu-dominio.com
```

---

## 🚀 Deploy

### Checklist Pré-Deploy

- [ ] Ícones PWA gerados
- [ ] Splash screens criados
- [ ] .env production configurado
- [ ] npm run build executado
- [ ] Migrations executadas
- [ ] HTTPS configurado
- [ ] Lighthouse score verificado

### Comandos Deploy

```bash
# 1. Pull código
git pull origin main

# 2. Dependências
composer install --optimize-autoloader --no-dev
npm ci

# 3. Build
npm run build

# 4. Cache
php artisan config:cache
php artisan route:cache
php artisan view:cache

# 5. Migrations
php artisan migrate --force

# 6. Permissions
chmod -R 755 storage bootstrap/cache
```

---

## 📚 Recursos Úteis

### Documentação
- [Laravel](https://laravel.com/docs)
- [React](https://react.dev/)
- [Material-UI](https://mui.com/)
- [Inertia.js](https://inertiajs.com/)
- [PWA](https://web.dev/progressive-web-apps/)

### Ferramentas
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [PWA Builder](https://www.pwabuilder.com/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)

---

## 🐛 Troubleshooting

### PWA não instala
- Verifique HTTPS (obrigatório)
- Confirme Service Worker registrado
- Veja console para erros

### Erro ao compilar
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erro de permissão
```bash
sudo chmod -R 755 storage
sudo chmod -R 755 bootstrap/cache
```

---

## 📝 Licença

Este projeto é licenciado sob [MIT License](LICENSE).

---

## 👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie sua feature branch
3. Commit suas mudanças
4. Push para o branch
5. Abra um Pull Request

---

## 🙏 Agradecimentos

Construído com:
- Laravel Framework
- React
- Material-UI
- Inertia.js
- Vite

---

## 📞 Suporte

Para dúvidas e suporte:
- 📚 Consulte a documentação
- 🐛 Reporte bugs via Issues
- 💬 Discussões no GitHub

---

## 🎉 Começando

```bash
# Quick Start
npm run dev
php artisan serve

# Acesse: http://localhost:8000
```

**🚀 Pronto para começar? Veja [QUICK_START_PWA.md](QUICK_START_PWA.md)!**

---

**Desenvolvido com ❤️ - Start Kit v1.0**

*Sistema moderno, PWA-ready, mobile-first*
