{
  pkgs,
  lib,
  NEXT_PUBLIC_URL,
}:
pkgs.buildNpmPackage {
  pname = "xnode-miniapp-template";
  version = "1.0.0";
  src = ../mini-app;
  NEXT_PUBLIC_URL = NEXT_PUBLIC_URL;

  npmDeps = pkgs.importNpmLock {
    npmRoot = ../mini-app;
  };
  npmConfigHook = pkgs.importNpmLock.npmConfigHook;

  postBuild = ''
    # Add a shebang to the server js file, then patch the shebang to use a
    # nixpkgs nodes binary
    sed -i '1s|^|#!/usr/bin/env node\n|' .next/standalone/server.js
    patchShebangs .next/standalone/server.js
  '';

  installPhase = ''
    runHook preInstall

    mkdir -p $out/{share,bin}

    cp -r .next/standalone $out/share/homepage/
    # cp -r .env $out/share/homepage/
    cp -r public $out/share/homepage/public

    mkdir -p $out/share/homepage/.next
    cp -r .next/static $out/share/homepage/.next/static

    # https://github.com/vercel/next.js/discussions/58864
    ln -s /var/cache/mini-app $out/share/homepage/.next/cache

    chmod +x $out/share/homepage/server.js

    # we set a default port to support "nix run ..."
    makeWrapper $out/share/homepage/server.js $out/bin/xnode-miniapp-template \
      --set-default PORT 3000 \
      --set-default HOSTNAME 0.0.0.0

    runHook postInstall
  '';

  doDist = false;

  meta = {
    mainProgram = "xnode-miniapp-template";
  };
}
