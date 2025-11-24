#!/bin/bash

# Script para gerar ícones PWA
# Requer ImageMagick instalado

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║   Gerador de Ícones PWA - Sistema      ║"
echo "╔════════════════════════════════════════╗"
echo -e "${NC}"

# Verifica se ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick não está instalado!${NC}"
    echo ""
    echo "Instale com:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    echo "  Windows: choco install imagemagick"
    exit 1
fi

# Verifica se o arquivo fonte existe
SOURCE_ICON="$1"

if [ -z "$SOURCE_ICON" ]; then
    echo -e "${YELLOW}ℹ️  Uso: ./generate-pwa-icons.sh <caminho-para-icone-fonte>${NC}"
    echo ""
    echo "Exemplo: ./generate-pwa-icons.sh icon-source.png"
    echo ""
    echo "O ícone fonte deve ser quadrado e idealmente 512x512px ou maior"
    exit 1
fi

if [ ! -f "$SOURCE_ICON" ]; then
    echo -e "${RED}❌ Arquivo não encontrado: $SOURCE_ICON${NC}"
    exit 1
fi

# Cria diretório de ícones se não existir
ICONS_DIR="public/icons"
mkdir -p "$ICONS_DIR"

echo -e "${GREEN}✓ Iniciando geração de ícones...${NC}"
echo ""

# Define os tamanhos necessários
declare -a SIZES=(72 96 128 144 152 192 384 512)

# Gera cada tamanho
for size in "${SIZES[@]}"; do
    OUTPUT_FILE="$ICONS_DIR/icon-${size}x${size}.png"

    echo -e "${BLUE}→ Gerando ícone ${size}x${size}...${NC}"

    convert "$SOURCE_ICON" \
        -resize "${size}x${size}" \
        -background transparent \
        -gravity center \
        -extent "${size}x${size}" \
        "$OUTPUT_FILE"

    if [ -f "$OUTPUT_FILE" ]; then
        FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
        echo -e "${GREEN}  ✓ Criado: $OUTPUT_FILE ($FILE_SIZE)${NC}"
    else
        echo -e "${RED}  ✗ Falha ao criar: $OUTPUT_FILE${NC}"
    fi
done

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║     ✓ Ícones gerados com sucesso!     ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📁 Ícones salvos em: $ICONS_DIR${NC}"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "1. Gere os splash screens para iOS"
echo "2. Personalize o manifest.json"
echo "3. Teste o PWA em dispositivos móveis"
echo ""
echo -e "${BLUE}📖 Veja PWA_SETUP.md para instruções completas${NC}"
