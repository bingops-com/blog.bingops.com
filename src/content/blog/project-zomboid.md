---
title: "Deploying a Project Zomboid Server with Terraform & Ansible"
description: "Deploy your own Project Zomboid multiplayer server effortlessly using Terraform and Ansible on your Proxmox, with full customization"
date: 2025-02-12
tags: ["project-zomboid", "ansible", "terraform", "gaming", "infra"]
---

![Project Zomboid article illustration](images/project-zomboid1.png)

# Deploying a Project Zomboid Server with Terraform & Ansible
If you love Project Zomboid and want to host your own dedicated multiplayer server, look no further! This guide introduces an automated deployment system using Terraform and Ansible, allowing you to spin up a server on Proxmox or any remote Linux machine. The project is fully open-source and available on GitHub.

🚀 GitHub Repository: https://github.com/0xBingo/pz-server

## Why would I use this Project ?

**Automated Deployment**: Quickly set up a dedicated Project Zomboid server.

**Scalable**: Easily add mods, tweak settings, and manage security.

**Runs on Proxmox or Bare Metal**: Use Terraform for Proxmox VM provisioning or run Ansible independently.

**Integrated with Playit.gg**: Expose your server without port forwarding.

---

## 🔥 Getting Started
### 1️⃣ Clone the Repository
```
git clone https://github.com/0xBingo/pz-server
cd pz-server
git checkout base  # Use the 'base' branch for a minimal config
```
### 2️⃣ Proxmox Setup (Optional)
If you want to deploy it on Proxmox, create an API token with credentials.auto.tfvars:
```
proxmox_api_url   = "https://ip:port"  # Your Proxmox IP Address
proxmox_api_token = "PVEAPIToken=USER@REALM!TOKENID=UUID"  # API Token ID
ssh_key = "ssh-rsa YOUR_PUBLIC_SSH_KEY"
```
Then, initialize and apply the Terraform configuration:
```
terraform init
terraform apply
```
## 3️⃣ Running Ansible Playbooks
Ansible is used for configuration, and should be run in two steps:
### ✅ Step 1: Bootstrap System
This ensures SSH and firewall settings are properly configured.
```
ansible-playbook bootstrap.yml -i inventories/main/hosts
```

### ✅ Step 2: Deploy Server
Once bootstrap is complete, install and configure the server.
```
ansible-playbook site.yml -i inventories/main/hosts
```

---

## ⚙️ Customizing the Server
All configurations can be adjusted in roles/server/defaults/main.yml.
- Modify `server_name`,`max_players` and `server_password` (commented defaults should be uncommented for customization).
- To add mods, list them under `server_mods` field like so:
```
server_mods:
    - name: "modoptions"
      id: "2169435993"
    - name: "KillCount"
      id: "2553809727"
```
- Restart the server after changes:
```
sudo systemctl restart zomboid
```
---

## 🛠️ Troubleshooting
If the server does not start:
1. Check the zomboid.service:
```
sudo systemctl status zomboid.service
```
2. If the service is inactive, restart the socket:
```
sudo systemctl restart zomboid.socket
```
3. Verify logs for errors:
```
sudo journalctl -u zomboid --no-pager -n 50
```

---

## 🌍 Exposing the Server with Playit.gg
To make your homeserver publicly accessible without port forwarding, Playit.gg is included:
1. Download the Playit.gg Agent and Service
   Executing the site.yml playbook will automatically install the Playit agent and setup the service. The service will be restarted once the next parts are done.
2. Create a New Tunnel
   Run the Playit agent on your server:
```
sudo -u playit /usr/local/bin/playit
```
2. Follow the instructions to link your machine with your Playit.gg account. Once linked, you'll have an auto-generated configuration file set up in ~/.config/playit/.
3. Use the Playit dashboard to create a tunnel:
   Go to All Agents and select your agent.
   Select Add Tunnel.
   Choose UDP protocol.
   Enter the port number your Project Zomboid server uses (default: 16261).
   Assign a subdomain or custom domain to your tunnel.

---

## 🎮 Join the Community !
With this setup, you're ready to host a fully customized Project Zomboid server for friends or a public community. Check out the GitHub repo, contribute, and enjoy your apocalypse survival !
🔗 GitHub Repository: https://github.com/bingops-com/pz-server
