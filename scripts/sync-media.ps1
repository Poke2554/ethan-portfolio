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

  New-Item -ItemType Directory -Force -Path $Destination | Out-Null

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

# Sous-dossiers dans Projet test (ex: projet-test, mon-projet...)
$projetTestRoot = Join-Path $portfolioRoot "Projet test"
if (Test-Path $projetTestRoot) {
  Get-ChildItem $projetTestRoot -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = Join-Path $projectsRoot $_.Name
    Copy-MediaFiles -Source $_.FullName -Destination $dest
  }

  # Fichiers à la racine de Projet test -> projet-test
  $flatFiles = Get-ChildItem $projetTestRoot -File | Where-Object {
    $_.Extension -match '\.(jpg|jpeg|png|webp|mp4)$'
  }
  if ($flatFiles.Count -gt 0) {
    Copy-MediaFiles -Source $projetTestRoot -Destination (Join-Path $projectsRoot "projet-test")
  }
}

# Dossier Projets générique (optionnel)
$projetsRoot = Join-Path $portfolioRoot "Projets"
if (Test-Path $projetsRoot) {
  Get-ChildItem $projetsRoot -Directory -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = Join-Path $projectsRoot $_.Name
    Copy-MediaFiles -Source $_.FullName -Destination $dest
  }
}

Write-Host "Terminé."
