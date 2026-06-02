# Generates a static 1200x630 Open Graph image (public/og.png) matching the
# site's editorial warm-paper palette. Pure GDI+, no external deps — re-run
# this if you change the name / role / tagline in src/config/site.ts.
Add-Type -AssemblyName System.Drawing

$W = 1200; $H = 630
$paper   = [System.Drawing.ColorTranslator]::FromHtml('#f6f2ea')
$ink     = [System.Drawing.ColorTranslator]::FromHtml('#1b1916')
$inkSoft = [System.Drawing.ColorTranslator]::FromHtml('#57514a')
$accent  = [System.Drawing.ColorTranslator]::FromHtml('#c2470f')
$line    = [System.Drawing.ColorTranslator]::FromHtml('#cfc6b6')

$name    = 'Sanket Desai'
$role    = 'SENIOR SEO MANAGER @ CAPITAL ONE SHOPPING'
$tagline = '10 years scaling organic traffic for Fortune 500 and crypto media - now building SEO tools and content sites of my own.'
$domain  = 'snketdesai.com'

$bmp = New-Object System.Drawing.Bitmap($W, $H)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic

# background + top accent rule
$g.Clear($paper)
$brushAccent = New-Object System.Drawing.SolidBrush($accent)
$g.FillRectangle($brushAccent, 0, 0, $W, 12)

$pad = 80
$brushInk = New-Object System.Drawing.SolidBrush($ink)
$brushSoft = New-Object System.Drawing.SolidBrush($inkSoft)

# role eyebrow (letter-spaced manually)
$fontRole = New-Object System.Drawing.Font('Segoe UI Semibold', 21, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$thin = [string][char]0x2009
$roleSpaced = ($role.ToCharArray() -join $thin)
$g.DrawString($roleSpaced, $fontRole, $brushSoft, $pad, 96)

# name (serif display)
$fontName = New-Object System.Drawing.Font('Georgia', 128, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString($name, $fontName, $brushInk, ($pad - 6), 180)

# tagline (wrapped)
$fontTag = New-Object System.Drawing.Font('Segoe UI', 31, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$rect = New-Object System.Drawing.RectangleF($pad, 360, 980, 160)
$g.DrawString($tagline, $fontTag, $brushSoft, $rect)

# bottom rule + domain with accent dot
$pen = New-Object System.Drawing.Pen($line, 2)
$g.DrawLine($pen, $pad, ($H - 96), ($W - $pad), ($H - 96))
$g.FillEllipse($brushAccent, $pad, ($H - 70), 16, 16)
$fontDomain = New-Object System.Drawing.Font('Segoe UI Semibold', 26, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$g.DrawString($domain, $fontDomain, $brushInk, ($pad + 28), ($H - 80))

$out = Join-Path (Split-Path $PSScriptRoot -Parent) 'public\og.png'
$bmp.Save($out, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose(); $bmp.Dispose()
"Wrote $out"
