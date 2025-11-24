# 📱 Ícones PWA

Este diretório deve conter os ícones do PWA em diferentes tamanhos.

## 📋 Ícones Necessários

Você precisa gerar os seguintes ícones:

```
icon-72x72.png      (Android)
icon-96x96.png      (Android)
icon-128x128.png    (Android)
icon-144x144.png    (Android, Windows)
icon-152x152.png    (iOS)
icon-192x192.png    (Android, iOS)
icon-384x384.png    (Android)
icon-512x512.png    (Android, splash)
```

## 🚀 Como Gerar

### Opção 1: Script Automatizado (Recomendado)

```bash
# Da raiz do projeto, execute:
./generate-pwa-icons.sh seu-icone-fonte.png
```

### Opção 2: PWA Builder

1. Acesse: https://www.pwabuilder.com/imageGenerator
2. Faça upload de um ícone quadrado (512x512 ou maior)
3. Baixe o ZIP gerado
4. Extraia os arquivos neste diretório

### Opção 3: Manual com ImageMagick

```bash
convert icon-fonte.png -resize 72x72 icon-72x72.png
convert icon-fonte.png -resize 96x96 icon-96x96.png
convert icon-fonte.png -resize 128x128 icon-128x128.png
convert icon-fonte.png -resize 144x144 icon-144x144.png
convert icon-fonte.png -resize 152x152 icon-152x152.png
convert icon-fonte.png -resize 192x192 icon-192x192.png
convert icon-fonte.png -resize 384x384 icon-384x384.png
convert icon-fonte.png -resize 512x512 icon-512x512.png
```

## ✅ Checklist

- [ ] Ícone fonte criado/obtido (512x512 ou maior)
- [ ] Ícone é quadrado
- [ ] Fundo é transparente ou cor sólida
- [ ] Design é simples e reconhecível
- [ ] Todos os 8 tamanhos gerados
- [ ] Ícones testados em dispositivos

## 🎨 Dicas de Design

- Use design simples e legível
- Evite textos pequenos
- Prefira ícones com fundo transparente
- Teste em fundo claro e escuro
- Considere usar "maskable icon" para Android

## 📚 Mais Informações

Consulte o arquivo `PWA_SETUP.md` na raiz do projeto para instruções detalhadas.
