# 🖼️ Splash Screens iOS

Este diretório deve conter as splash screens para dispositivos iOS.

## 📋 Arquivos Necessários

Splash screens para iPhones e iPads em diferentes tamanhos:

### iPhones Modernos
- `iPhone_15_Pro_Max__iPhone_15_Plus__iPhone_14_Pro_Max_portrait.png`
- `iPhone_15_Pro__iPhone_15__iPhone_14_Pro_portrait.png`
- `iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png`
- `iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png`
- `iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png`

### iPhones Antigos
- `iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png`
- `iPhone_11__iPhone_XR_portrait.png`
- `iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png`
- `iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png`
- `4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png`

### iPads
- `12.9__iPad_Pro_portrait.png`
- `11__iPad_Pro__10.5__iPad_Pro_portrait.png`
- `10.9__iPad_Air_portrait.png`
- `10.5__iPad_Air_portrait.png`
- `10.2__iPad_portrait.png`
- `9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png`
- `8.3__iPad_Mini_portrait.png`

## 🚀 Como Gerar

### Opção 1: PWA Asset Generator (Recomendado)

```bash
# Instale globalmente
npm install -g pwa-asset-generator

# Gere os splash screens
pwa-asset-generator seu-icone.png public/splash \
  --background "#667eea" \
  --splash-only true \
  --padding "20%" \
  --quality 100
```

### Opção 2: App Scope

1. Acesse: https://appsco.pe/developer/splash-screens
2. Faça upload do seu ícone
3. Escolha cor de fundo (#667eea)
4. Baixe o ZIP com todos os tamanhos
5. Extraia neste diretório

### Opção 3: Figma/Photoshop Manual

Use as dimensões exatas de cada dispositivo:
- Consulte: https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/

## 🎨 Design do Splash Screen

### Recomendações

1. **Centralizar o ícone**
   - Ícone no centro
   - Padding de 20-30% ao redor

2. **Cor de fundo**
   - Use a mesma cor do `theme_color` do manifest
   - Ou cor neutra (branco/preto)

3. **Simplicidade**
   - Apenas logo ou ícone
   - Sem texto ou elementos complexos
   - Evite bordas ou cantos

### Exemplo de Composição

```
┌────────────────────────┐
│                        │
│                        │
│                        │
│         [LOGO]         │
│                        │
│                        │
│                        │
└────────────────────────┘
```

## ⚠️ Importante

- Splash screens são exibidos APENAS em PWA instalado
- Não aparecem no navegador
- iOS requer exatamente as dimensões especificadas
- Teste em dispositivo real, não no simulador

## 🧪 Testando

### No iPhone Real

1. Instale o PWA: Safari → Compartilhar → "Adicionar à Tela de Início"
2. Feche completamente o Safari
3. Abra o app instalado
4. Observe o splash screen por 1-2 segundos

### Validação

- [ ] Ícone centralizado
- [ ] Cor de fundo correta
- [ ] Sem distorção da imagem
- [ ] Testado em iPhone real
- [ ] Testado em iPad (opcional)

## 📚 Mais Informações

Consulte:
- `PWA_SETUP.md` na raiz do projeto
- [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/)
