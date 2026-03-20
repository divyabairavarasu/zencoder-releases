#!/usr/bin/env bash
#
# install.sh — ZenCoder installer
#
# Installs: zencoder, zencoderd, zencoder-secrets
# Auto-starts zencoderd as a background service on login.
#
# No GitHub account or authentication required.
#
# Usage:
#   curl -fsSL https://raw.githubusercontent.com/divyabairavarasu/zencoder-releases/main/install.sh | bash
#
# Options (via environment):
#   ZENCODER_VERSION=5.1.0     install a specific version (default: latest)
#   INSTALL_DIR=/usr/local/bin override install directory

set -euo pipefail

# ─────────────────────────── constants ──────────────────────────

PUBLIC_REPO="divyabairavarasu/zencoder-releases"
BINARIES=(zencoder zencoderd zencoder-secrets)
INSTALL_DIR="${INSTALL_DIR:-/usr/local/bin}"

# ─────────────────────────── helpers ────────────────────────────

red()    { printf "\033[1;31m%s\033[0m\n" "$*" >&2; }
green()  { printf "\033[1;32m%s\033[0m\n" "$*"; }
yellow() { printf "\033[1;33m%s\033[0m\n" "$*"; }
blue()   { printf "\033[1;34m%s\033[0m\n" "$*"; }
fail()   { red "ERROR: $*"; exit 1; }

# ─────────────────────────── detect platform ────────────────────

detect_platform() {
  local os arch

  case "$(uname -s)" in
    Darwin) os="darwin" ;;
    Linux)  os="linux"  ;;
    *)      fail "Unsupported OS: $(uname -s). Only macOS and Linux are supported." ;;
  esac

  case "$(uname -m)" in
    arm64|aarch64) arch="arm64" ;;
    x86_64|amd64)  arch="amd64" ;;
    *)             fail "Unsupported architecture: $(uname -m)." ;;
  esac

  echo "${os}_${arch}"
}

# ─────────────────────────── check prerequisites ────────────────

check_prereqs() {
  for cmd in curl tar; do
    command -v "${cmd}" >/dev/null 2>&1 || fail "'${cmd}' is required but not found in PATH."
  done
}

# ─────────────────────────── resolve version ────────────────────

resolve_version() {
  if [[ -n "${ZENCODER_VERSION:-}" ]]; then
    echo "${ZENCODER_VERSION#v}"
    return
  fi

  local latest
  latest="$(curl -fsSL "https://api.github.com/repos/${PUBLIC_REPO}/releases/latest" \
    | grep '"tag_name"' | head -1 | sed 's/.*"tag_name": *"v\?\([^"]*\)".*/\1/')" \
    || fail "Could not fetch latest release from ${PUBLIC_REPO}."
  [[ -n "${latest}" ]] || fail "Could not parse latest release tag."
  echo "${latest}"
}

# ─────────────────────────── download & install ─────────────────

install_binaries() {
  local version="$1"
  local platform="$2"
  local tag="v${version}"
  local archive="zencoder_${version}_${platform}.tar.gz"
  local url="https://github.com/${PUBLIC_REPO}/releases/download/${tag}/${archive}"

  blue "ZenCoder Installer"
  echo "  Version  : ${version}"
  echo "  Platform : ${platform}"
  echo "  Install  : ${INSTALL_DIR}"
  echo ""

  if [[ ! -d "${INSTALL_DIR}" ]]; then
    echo "  Creating ${INSTALL_DIR}..."
    sudo mkdir -p "${INSTALL_DIR}"
  fi

  local tmp_dir
  tmp_dir="$(mktemp -d)"

  echo "  Downloading ${archive}..."
  curl -fsSL --progress-bar "${url}" -o "${tmp_dir}/${archive}" \
    || fail "Download failed. Check that version ${version} exists at https://github.com/${PUBLIC_REPO}/releases"

  echo "  Extracting..."
  tar -xzf "${tmp_dir}/${archive}" -C "${tmp_dir}"

  local bin_dir="${tmp_dir}/zencoder_${version}_${platform}"

  for bin in "${BINARIES[@]}"; do
    local src="${bin_dir}/${bin}"
    [[ -f "${src}" ]] || fail "Binary '${bin}' not found in archive."
    echo "  Installing ${bin} → ${INSTALL_DIR}/${bin}"
    if [[ -w "${INSTALL_DIR}" ]]; then
      install -m 755 "${src}" "${INSTALL_DIR}/${bin}"
    else
      sudo install -m 755 "${src}" "${INSTALL_DIR}/${bin}"
    fi
  done

  rm -rf "${tmp_dir}"
  green "Binaries installed ✓"
}

# ─────────────────────────── service setup ──────────────────────

setup_service_macos() {
  local plist_dir="${HOME}/Library/LaunchAgents"
  local plist_file="${plist_dir}/com.zencoder.zencoderd.plist"
  local log_dir="${HOME}/Library/Logs/zencoder"
  local daemon_bin="${INSTALL_DIR}/zencoderd"

  mkdir -p "${plist_dir}" "${log_dir}"

  cat > "${plist_file}" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.zencoder.zencoderd</string>
    <key>ProgramArguments</key>
    <array>
        <string>${daemon_bin}</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>${log_dir}/zencoderd.log</string>
    <key>StandardErrorPath</key>
    <string>${log_dir}/zencoderd.err.log</string>
</dict>
</plist>
PLIST

  launchctl unload "${plist_file}" 2>/dev/null || true
  launchctl load -w "${plist_file}"

  green "zencoderd service registered and started ✓"
  echo "  Logs: ${log_dir}/zencoderd.log"
}

setup_service_linux() {
  local service_file="/etc/systemd/system/zencoderd.service"
  local daemon_bin="${INSTALL_DIR}/zencoderd"

  sudo tee "${service_file}" > /dev/null <<SYSTEMD
[Unit]
Description=ZenCoder daemon
After=network.target

[Service]
ExecStart=${daemon_bin}
Restart=always
RestartSec=5
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
SYSTEMD

  sudo systemctl daemon-reload
  sudo systemctl enable --now zencoderd

  green "zencoderd systemd service enabled and started ✓"
  echo "  Logs: journalctl -u zencoderd -f"
}

setup_service() {
  echo ""
  blue "Setting up zencoderd auto-start service..."
  case "$(uname -s)" in
    Darwin) setup_service_macos ;;
    Linux)  setup_service_linux ;;
  esac
}

# ─────────────────────────── verify ─────────────────────────────

verify_install() {
  echo ""
  echo "  Verifying installation..."
  for bin in "${BINARIES[@]}"; do
    if command -v "${bin}" >/dev/null 2>&1 || [[ -x "${INSTALL_DIR}/${bin}" ]]; then
      green "  ${bin} ✓"
    else
      yellow "  ${bin} not found in PATH (installed to ${INSTALL_DIR})"
    fi
  done
  local version_out
  version_out="$("${INSTALL_DIR}/zencoder" version 2>&1 | head -1 || true)"
  [[ -n "${version_out}" ]] && echo "  ${version_out}"
}

# ─────────────────────────── main ───────────────────────────────

main() {
  echo ""
  check_prereqs

  local platform version
  platform="$(detect_platform)"
  version="$(resolve_version)"

  install_binaries "${version}" "${platform}"
  setup_service
  verify_install

  echo ""
  green "ZenCoder v${version} installed successfully!"
  echo ""
  blue "Quick start:"
  echo ""
  echo "  zencoder version          # verify CLI"
  echo "  zencoder-secrets --help   # manage API keys"
  echo ""
  blue "zencoderd is running as a background service."
  if [[ "$(uname -s)" == "Darwin" ]]; then
    echo "  Stop:    launchctl unload ~/Library/LaunchAgents/com.zencoder.zencoderd.plist"
    echo "  Restart: launchctl kickstart -k gui/\$(id -u)/com.zencoder.zencoderd"
  else
    echo "  Stop:    sudo systemctl stop zencoderd"
    echo "  Restart: sudo systemctl restart zencoderd"
  fi
  echo ""
}

main "$@"
