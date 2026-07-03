$portfolioRoot = "E:\Dossier\Portfolio"
$projectRoot = Join-Path $PSScriptRoot ".."
$homeDest = Join-Path $projectRoot "public\media\home"
$projectsRoot = Join-Path $projectRoot "public\media\projects"

New-Item -ItemType Directory -Force -Path $homeDest, $projectsRoot | Out-Null

function Copy-MediaFiles {
  param(
    [string]$Source,
    [string]$Destination
  )

  if (-not (Test-Path $Source)) {
    Write-Host "Dossier introuvable : $Source"
    return
  }

  Get-ChildItem $Source -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|webp|mp4)$'
  } | ForEach-Object {
    Copy-Item $_.FullName -Destination (Join-Path $Destination $_.Name) -Force
    Write-Host "Copié : $($_.Name) -> $Destination"
  }
}

Write-Host "Sync accueil..."
Copy-MediaFiles -Source (Join-Path $portfolioRoot "Photo accueil") -Destination $homeDest

Write-Host "Sync projets..."
Get-ChildItem (Join-Path $portfolioRoot "Projet test") -Directory -ErrorAction SilentlyContinue | ForEach-Object {
  $dest = Join-Path $projectsRoot $_.Name
  New-Item -ItemType Directory -Force -Path $dest | Out-Null
  Copy-MediaFiles -Source $_.FullName -Destination $dest
}

$flatProject = Join-Path $portfolioRoot "Projet test"
if (Test-Path $flatProject) {
  $flatFiles = Get-ChildItem $flatProject -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|webp|mp4)$'
  }
  if ($flatFiles.Count -gt 0) {
    $dest = Join-Path $projectsRoot "projet-test"
    New-Item -ItemType Directory -Force -Path $dest | Out-Null
    Copy-MediaFiles -Source $flatProject -Destination $dest
  }
}

Write-Host "Terminé."
