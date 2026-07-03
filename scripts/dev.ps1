$ports = 3000, 3001, 3002
foreach ($port in $ports) {
  Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue |
    ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
}

if (Test-Path ".next") {
  Remove-Item -Recurse -Force ".next"
}

npm.cmd run dev:fast
