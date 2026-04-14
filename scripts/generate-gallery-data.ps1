param(
  [string]$PortfolioRoot = "portfolio",
  [string]$OutputFile = "js/gallery-data.js"
)

$imageExtensions = @(".jpg", ".jpeg", ".png", ".webp", ".gif")

if (-not (Test-Path $PortfolioRoot)) {
  throw "Portfolio root '$PortfolioRoot' was not found."
}

$categories = Get-ChildItem -Path $PortfolioRoot -Directory | Sort-Object Name | ForEach-Object {
  $categoryDir = $_
  $images = Get-ChildItem -Path $categoryDir.FullName -File | Where-Object {
    $imageExtensions -contains $_.Extension.ToLowerInvariant()
  } | Sort-Object Name | ForEach-Object {
    [PSCustomObject]@{
      src = ($_.FullName.Substring($PWD.Path.Length + 1) -replace "\\", "/")
      alt = (($_.BaseName -replace "[-_]+", " ") -replace "\s+", " ").Trim()
      name = $_.Name
    }
  }

  [PSCustomObject]@{
    slug = ($categoryDir.Name.ToLowerInvariant() -replace "[^a-z0-9]+", "-").Trim("-")
    name = $categoryDir.Name
    label = (($categoryDir.Name -replace "[-_]+", " ") -replace "\s+", " ").Trim()
    imageCount = $images.Count
    images = @($images)
  }
}

$payload = [PSCustomObject]@{
  generatedAt = (Get-Date).ToString("s")
  categories = @($categories)
} | ConvertTo-Json -Depth 8

$output = @"
window.GALLERY_DATA = $payload;
"@

Set-Content -Path $OutputFile -Value $output -Encoding UTF8
Write-Output "Generated $OutputFile with $($categories.Count) categories."
