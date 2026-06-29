#!/bin/bash
# Download news/lifestyle articles from gnldcontent.com
# Run from your repo root: bash download-news.sh

BASE="https://www.gnldcontent.com/ArthurFurst/articles"
DEST="assets/news"

mkdir -p "$DEST"

download() {
  local filename="$1"
  local encoded=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$filename'))")
  curl -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36" \
    -L --retry 3 --retry-delay 2 \
    -o "$DEST/$filename" \
    "$BASE/$encoded"
  local size=$(stat -f%z "$DEST/$filename" 2>/dev/null || stat -c%s "$DEST/$filename" 2>/dev/null)
  if [ "$size" -gt 1000 ]; then
    echo "✓ $filename ($size bytes)"
  else
    echo "✗ FAILED: $filename"
  fi
}

download "1975 Counselor Dr Furst- More honors.pdf"
download "1978 Counselor article Dr. Furst at special symposium.pdf"
download "1978 Counselor Neo-Lifes Director of Research wins award.pdf"
download "1978 Neo-Life Magazine about AF.pdf"
download "1979 Counselor SAB article.pdf"
download "1980 Counselor Dec Toxgard returns--with brand-new and improved formula.pdf"
download "1980 Counselor July Dr. Furst honored.pdf"
download "1980 Counselor Mar As I See It.pdf"
download "1980 Counselor Nov Technical Notes by Dr AF.pdf"
download "1980 Counselor Oct Editorial.pdf"
download "1981 Counselor Jan NL research- meeting todays nutritional needs with tomorrows products.pdf"
download "1981 Counselor (June) Keynote Addresses by AF.pdf"
download "1982 Counselor AF article.pdf"
download "1984 Counselor - intro to mag by AF.pdf"
download "1985 Counselor - Distributor Training flyer.pdf"
download "1985 Counselor SAB articles by AF K Hirsch F Hooper.pdf"
download "1985 Founders Rallies flyer.pdf"
download "1986 Counselor - article AF receives Klaus Schwarz Commemorative Medal.pdf"
download "1986 Counselor Free Radicals and Oxidants--The Damaging Effects by AF.pdf"
download "1986 Professional Nurses Quarterly - Betagard flyer & Nutritional Protection of the Immune System.pdf"
download "1987 Counselor July Know Your Enemy Cancer by AF.pdf"
download "1988 Counselor - AF on Air Filtration Sept Oct.pdf"
download "1988 Counselor May June Problems With Water by AF.pdf"
download "1989 Counselor - Beta Carotene by AF July Aug.pdf"
download "1989 Counselor article AF receiving lifelong contribution to the betterment of mankind from Bob.pdf"
download "1989 Counselor article by AF.pdf"
download "1990 Counselor Sept Oct AF quote from convention.pdf"
download "1990 Jan-Feb Counselor AF article & SAB.pdf"
download "1994 Neo-Life Mag AF SAB profile Spring.pdf"
download "1995 Neo-Life Magazine The Experts Discuss Immune Function - AF article.pdf"
download "1996 Lifestyle Cancer Growth Inhibited 90 by GNLD Flavonoids.pdf"
download "1996 Lifestyle AF Phytonutrients Spring.pdf"
download "1998 Lifestyle AF speaks at an event July Aug Sept.pdf"
download "2000 Lifestyle AF Apr May Jun.pdf"
download "2000 Lifestyle AF Farewell Letter Apr May Jun.pdf"
download "2002 Lifestyle - AF GNLD & SAB work together Jul Aug Sept.pdf"
download "2002 Lifestyle Winter Jan Feb Mar SAB.pdf"
download "2004 Lifestyle Summer SAB & Stanford.pdf"
download "2005 Lifestyle Summer SAB & Stanford.pdf"
download "Lifestyle What the Experts are Saying about Vitality Aloe Vera Plus.pdf"

echo ""
echo "Done! Check assets/news/ for downloaded files."