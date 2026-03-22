#Requires -Version 5.1
<#
.SYNOPSIS
    ZenCoder installer for Windows.

.DESCRIPTION
    Installs: zencoder.exe, zencoderd.exe, zencoder-secrets.exe
    Registers zencoderd as a Windows scheduled task that starts on login.

    No GitHub account or authentication required.

.EXAMPLE
    # Default — latest version
    irm https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.ps1 | iex

    # Specific version
    $env:ZENCODER_VERSION = "5.1.0"; irm https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.ps1 | iex

.NOTES
    Options (via environment variables):
      ZENCODER_VERSION   install a specific version (default: latest)
      INSTALL_DIR        override install directory (default: %LOCALAPPDATA%\ZenCoder\bin)
#>

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

# ─────────────────────────── constants ──────────────────────────

$PublicRepo = "divyabairavarasu/zencoder-releases"
$Binaries   = @("zencoder.exe", "zencoderd.exe", "zencoder-secrets.exe")
$TaskName   = "ZenCoderDaemon"

$DefaultInstallDir = Join-Path $env:LOCALAPPDATA "ZenCoder\bin"
$InstallDir = if ($env:INSTALL_DIR) { $env:INSTALL_DIR } else { $DefaultInstallDir }

# ─────────────────────────── helpers ────────────────────────────

function Write-Status  { param([string]$Msg) Write-Host "  $Msg" }
function Write-Success { param([string]$Msg) Write-Host "  $Msg" -ForegroundColor Green }
function Write-Warn    { param([string]$Msg) Write-Host "  $Msg" -ForegroundColor Yellow }
function Write-Header  { param([string]$Msg) Write-Host "`n  $Msg" -ForegroundColor Cyan }
function Stop-WithError {
    param([string]$Msg)
    Write-Host "  ERROR: $Msg" -ForegroundColor Red
    exit 1
}

# ─────────────────────────── detect platform ────────────────────

function Get-Platform {
    if ($env:OS -ne "Windows_NT") {
        Stop-WithError "This script is for Windows only. Use install.sh on macOS/Linux."
    }

    $arch = if ([Environment]::Is64BitOperatingSystem) { "amd64" } else {
        Stop-WithError "Only 64-bit Windows (amd64) is supported."
    }

    return "windows_$arch"
}

# ─────────────────────────── resolve version ────────────────────

function Get-LatestVersion {
    if ($env:ZENCODER_VERSION) {
        return $env:ZENCODER_VERSION -replace "^v", ""
    }

    try {
        $release = Invoke-RestMethod -Uri "https://api.github.com/repos/$PublicRepo/releases/latest" -UseBasicParsing
        $tag = $release.tag_name -replace "^v", ""
        if (-not $tag) { Stop-WithError "Could not parse latest release tag." }
        return $tag
    }
    catch {
        Stop-WithError "Could not fetch latest release from $PublicRepo. $_"
    }
}

# ─────────────────────────── download & install ─────────────────

function Install-Binaries {
    param([string]$Version, [string]$Platform)

    $tag     = "v$Version"
    $archive = "zencoder_${Version}_${Platform}.zip"
    $url     = "https://github.com/$PublicRepo/releases/download/$tag/$archive"

    Write-Header "ZenCoder Installer"
    Write-Status "Version  : $Version"
    Write-Status "Platform : $Platform"
    Write-Status "Install  : $InstallDir"
    Write-Host ""

    # Create install directory
    if (-not (Test-Path $InstallDir)) {
        New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
    }

    # Download
    $tmpDir  = Join-Path ([System.IO.Path]::GetTempPath()) "zencoder-install-$(Get-Random)"
    New-Item -ItemType Directory -Path $tmpDir -Force | Out-Null
    $zipPath = Join-Path $tmpDir $archive

    Write-Status "Downloading $archive..."
    try {
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing
    }
    catch {
        Stop-WithError "Download failed. Check that version $Version exists at https://github.com/$PublicRepo/releases"
    }

    # Extract
    Write-Status "Extracting..."
    Expand-Archive -Path $zipPath -DestinationPath $tmpDir -Force

    # Copy binaries
    foreach ($bin in $Binaries) {
        $src = Get-ChildItem -Path $tmpDir -Recurse -Filter $bin | Select-Object -First 1
        if (-not $src) { Stop-WithError "Binary '$bin' not found in archive." }
        Write-Status "Installing $bin -> $InstallDir\$bin"
        Copy-Item -Path $src.FullName -Destination (Join-Path $InstallDir $bin) -Force
    }

    # Cleanup
    Remove-Item -Recurse -Force $tmpDir -ErrorAction SilentlyContinue

    Write-Success "Binaries installed."
}

# ─────────────────────────── PATH setup ─────────────────────────

function Add-ToPath {
    $userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
    if ($userPath -split ";" | Where-Object { $_ -eq $InstallDir }) {
        Write-Status "PATH already contains $InstallDir"
        return
    }

    [Environment]::SetEnvironmentVariable("PATH", "$userPath;$InstallDir", "User")
    # Update current session too
    $env:PATH = "$env:PATH;$InstallDir"
    Write-Success "Added $InstallDir to user PATH."
    Write-Warn "Restart your terminal for PATH changes to take effect in new sessions."
}

# ─────────────────────────── service setup ──────────────────────

function Register-DaemonTask {
    Write-Header "Setting up zencoderd auto-start..."

    $daemonExe = Join-Path $InstallDir "zencoderd.exe"

    # Remove existing task if present
    $existing = Get-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue
    if ($existing) {
        Unregister-ScheduledTask -TaskName $TaskName -Confirm:$false
    }

    $action  = New-ScheduledTaskAction -Execute $daemonExe
    $trigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
    $settings = New-ScheduledTaskSettingsSet `
        -AllowStartIfOnBatteries `
        -DontStopIfGoingOnBatteries `
        -StartWhenAvailable `
        -RestartCount 3 `
        -RestartInterval (New-TimeSpan -Minutes 1)

    Register-ScheduledTask `
        -TaskName $TaskName `
        -Action $action `
        -Trigger $trigger `
        -Settings $settings `
        -Description "ZenCoder AI coding assistant daemon" `
        -RunLevel Limited | Out-Null

    # Start it now
    Start-ScheduledTask -TaskName $TaskName -ErrorAction SilentlyContinue

    Write-Success "zencoderd scheduled task registered and started."
}

# ─────────────────────────── verify ─────────────────────────────

function Test-Installation {
    Write-Header "Verifying installation..."
    foreach ($bin in $Binaries) {
        $binPath = Join-Path $InstallDir $bin
        if (Test-Path $binPath) {
            Write-Success "$bin found."
        }
        else {
            Write-Warn "$bin not found at $InstallDir"
        }
    }

    $zencoderExe = Join-Path $InstallDir "zencoder.exe"
    if (Test-Path $zencoderExe) {
        try {
            $versionOut = & $zencoderExe version 2>&1 | Select-Object -First 1
            if ($versionOut) { Write-Status $versionOut }
        }
        catch { }
    }
}

# ─────────────────────────── main ───────────────────────────────

function Main {
    Write-Host ""

    $platform = Get-Platform
    $version  = Get-LatestVersion

    Install-Binaries -Version $version -Platform $platform
    Add-ToPath
    Register-DaemonTask
    Test-Installation

    Write-Host ""
    Write-Success "ZenCoder v$version installed successfully!"
    Write-Host ""
    Write-Header "Quick start:"
    Write-Host ""
    Write-Status "zencoder version          # verify CLI"
    Write-Status "zencoder-secrets --help   # manage API keys"
    Write-Host ""
    Write-Header "zencoderd is running as a scheduled task."
    Write-Status "Stop:    Stop-ScheduledTask -TaskName '$TaskName'"
    Write-Status "Restart: Start-ScheduledTask -TaskName '$TaskName'"
    Write-Status "Remove:  Unregister-ScheduledTask -TaskName '$TaskName' -Confirm:`$false"
    Write-Host ""
    Write-Success "Done."
    Write-Host ""
    Write-Host "  If this window is still open, press Ctrl+C or close it to exit." -ForegroundColor Yellow
    Write-Host ""
    exit 0
}

Main
exit 0
