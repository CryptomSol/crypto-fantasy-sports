{
  inputs = {
    xnode-manager.url = "github:Openmesh-Network/xnode-manager";
    xnode-miniapp-template.url = "github:OpenxAI-Network/xnode-miniapp-template"; # "path:..";
    nixpkgs.follows = "xnode-miniapp-template/nixpkgs";
  };

  outputs = inputs: {
    nixosConfigurations.container = inputs.nixpkgs.lib.nixosSystem {
      specialArgs = {
        inherit inputs;
      };
      modules = [
        inputs.xnode-manager.nixosModules.container
        {
          services.xnode-container.xnode-config = {
            host-platform = ./xnode-config/host-platform;
            state-version = ./xnode-config/state-version;
            hostname = ./xnode-config/hostname;
          };
        }
        inputs.xnode-miniapp-template.nixosModules.default
        {
          services.xnode-miniapp-template.enable = true;
          services.xnode-miniapp-template.url = "http://localhost:3000";
        }
      ];
    };
  };
}
