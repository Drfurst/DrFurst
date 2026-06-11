#!/bin/bash

# ============================================================
# download-awards.sh — FIXED (spaces URL-encoded automatically)
# Run from the ROOT of your dr-arthur-furst project
# ============================================================

BASE="https://www.gnldcontent.com/ArthurFurst/images/Awards_l"
DEST="assets/awards"
mkdir -p "$DEST"
echo "📁 Saving to: $DEST"
echo ""

PASS=0
FAIL=0

download() {
  local filename="$1"
  local encoded="${filename// /%20}"
  echo "⬇️  $filename"
  curl -L --retry 2 -s -o "$DEST/$filename" "$BASE/$encoded"
  local size
  size=$(stat -f%z "$DEST/$filename" 2>/dev/null || stat -c%s "$DEST/$filename" 2>/dev/null)
  if [ "$size" -gt 1000 ] 2>/dev/null; then
    echo "   ✅ done ($size bytes)"
    ((PASS++))
  else
    echo "   ❌ FAILED (got $size bytes — likely 403 or not found)"
    rm -f "$DEST/$filename"
    ((FAIL++))
  fi
}

# ── Degrees, Certificates & Awards ──────────────────────────
download "1937 Regents of University of CA Bachelor of Arts.jpg"
download "1940 Regents of University of CA Masters in Chemistry degree.jpg"
download "1944 Phi Lambda Upsilon Member.jpg"
download "1944 Sigma Xi Stanford Associate.jpg"
download "1948 Leland Stanford Junior University Dr of Philosophy degree.jpg"
download "1954 American Association for the Advancement of Science Fellow.jpg"
download "1955 American Association for the Advancement of Science Fellow.jpg"
download "1960 NY Academy of Sciences Fellow.jpg"
download "1966 NY Academy of Sciences Fellow.jpg"
download "1969 American Association for the Advancement of Science Life Member award. LowRes.jpg"
download "1972-73 Who's Who in America page1.jpg"
download "1972-73 Who's Who in America page2 different version.jpg"
download "1973 USF Distinguished Teaching Award.jpg"
download "1975 book - American Men and Women of Science, Medical Sciences. LowRes.jpg"
download "1975 Who's Who in US.jpg"
download "1977 Who's Who in Health Care - bookcover. LowRes.jpg"
download "1978 CA Senate Resolution.jpg"
download "1978 US Dept of Labor member of Advisory Committee.jpg"
download "1978-79 Who's Who in Science - AF 1.jpg"
download "1978-79 Who's Who in Science - AF 2.jpg"
download "1978-79 Who's Who in the World 4th Edition Certificate.jpg"
download "1983 Trustees of USF Dr of Science. LowRes.jpg"
download "1983 USF Dr of Science award.jpg"
download "1984 Academy of Toxicology of Sciences Dimplomate General Toxicology award. LowRes.jpg"
download "1984-85 Who's Who in the World. LowRes.jpg"
download "1986 American Institute of Chemists Fellow.jpg"
download "1986 Klaus Schwarz Commemorative Medal.jpg"
download "1986 Pacific Graduate School of Psychology Member of Board.jpg"
download "1986 Pacific Graduate School of Psychology President's Round Table.jpg"
download "1987 American College of Nutrition Fellow.jpg"
download "1989 American Men and Women of Science for Outstanding Contributions.jpg"
download "1989-1990 Who's Who in the World.jpg"
download "1990 15 Years of Service at GNLD.jpg"
download "1990s Edward J Whelan, S.J. Society Member.jpg"
download "1992 UCLA Alumni Award for Excellence. Professional Achievement Award.jpg"
download "1993-1994 Who's Who in the World.jpg"
download "1994 Academy of Toxological Sciences Fellow award.jpg"
download "1994 American Chemical Society - 50 Years of Membership.jpg"
download "1995 20 Years of Service with GNLD.jpg"
download "1995 Who's Who in the World.jpg"
download "1996-1998 Academy of Toxological Sciences appreciation for service on Board of Directors.jpg"
download "1999 Academy of Toxological Sciences Fellow.jpg"
download "2000 GNLD Founding Member Emeritus.jpg"
download "2000 Who's Who in the World.jpg"
download "2001 American College of Toxicology Lifetime Contribution plaque.jpg"
download "2001 American College of Toxicology Lifetime Contribution ribbon.jpg"
download "2004 Lifetime Recognition Award Presented AF.jpg"
download "2005 Who's Who in the World.jpg"
download "USF Diamond Circle Member.jpg"

# ── In the Media ─────────────────────────────────────────────
download "1977 SF Examiner article The Scientist who became a dancer--or vice versa.jpg"
download "1978 Folklore Magazine Viltis Who's Who in Folk Dance article.jpg"
download "1986 Article from Palo Alto Weekly - Professor honored for work.jpg"
download "1989 American College of Toxicology pamphlet.pdf"
download "1989 USF Alumnus Furst Refuses to be Slowed by Retirement.pdf"
download "1995 Palo Alto Weekly AF- the dance of life.pdf"
download "2001 ACT Lifetime Contribution Award.pdf"
download "2002phoenix.pdf"
download "2003 San Jose Mercury News article Toxicology pioneers achievements sluted.jpg"
download "2003 UCLA Fall Newsletter.pdf"
download "2013 USF Ten Most Important Innovators in history of USF.pdf"
download "Article (SF Progress) - Furst to head cancer group.jpg"
download "In Honor of Dr. Arthur Furst program.pdf"

# ── Publications About Dr. Furst ─────────────────────────────
download "1986 Article on AF in Biological Trace Elemnts Research Vol 11 1st page.jpg"

echo ""
echo "============================================"
echo "✅ Succeeded: $PASS"
echo "❌ Failed:    $FAIL"
echo "============================================"
if [ "$FAIL" -gt 0 ]; then
  echo "⚠️  Some files failed. The source server may be"
  echo "   blocking certain files. You may need to save"
  echo "   those manually from the browser."
fi