#!/bin/bash

# Script para gerar favicon em múltiplos formatos
# Requer ImageMagick instalado

set -e

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}"
echo "╔════════════════════════════════════════╗"
echo "║      Gerador de Favicon - Sistema      ║"
echo "╚════════════════════════════════════════╝"
echo -e "${NC}"

# Verifica se ImageMagick está instalado
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick não está instalado!${NC}"
    echo ""
    echo "Para instalar:"
    echo "  Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "  macOS: brew install imagemagick"
    exit 1
fi

SOURCE="public/favicon.svg"

if [ ! -f "$SOURCE" ]; then
    echo -e "${RED}❌ Arquivo favicon.svg não encontrado em public/${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Gerando favicons...${NC}"
echo ""

# Gera favicon.ico (múltiplas resoluções em um arquivo)
echo -e "${BLUE}→ Gerando favicon.ico...${NC}"
convert "$SOURCE" -resize 16x16 /tmp/favicon-16.png
convert "$SOURCE" -resize 32x32 /tmp/favicon-32.png
convert "$SOURCE" -resize 48x48 /tmp/favicon-48.png
convert /tmp/favicon-16.png /tmp/favicon-32.png /tmp/favicon-48.png public/favicon.ico
rm /tmp/favicon-*.png
echo -e "${GREEN}  ✓ favicon.ico criado${NC}"

# Gera PNG em vários tamanhos
echo -e "${BLUE}→ Gerando PNGs...${NC}"
convert "$SOURCE" -resize 16x16 public/favicon-16x16.png
echo -e "${GREEN}  ✓ favicon-16x16.png${NC}"

convert "$SOURCE" -resize 32x32 public/favicon-32x32.png
echo -e "${GREEN}  ✓ favicon-32x32.png${NC}"

convert "$SOURCE" -resize 180x180 public/apple-touch-icon.png
echo -e "${GREEN}  ✓ apple-touch-icon.png${NC}"

echo ""
echo -e "${GREEN}╔════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║    ✓ Favicons gerados com sucesso!    ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}Arquivos criados:${NC}"
echo "  • public/favicon.ico"
echo "  • public/favicon-16x16.png"
echo "  • public/favicon-32x32.png"
echo "  • public/apple-touch-icon.png"
echo "  • public/favicon.svg (já existente)"
