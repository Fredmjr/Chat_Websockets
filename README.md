This repo contains a simple chat websocket setup,for single user communications only.

!!!!read this before running app!!!

INSTRUCTIONS
create a .env file with folowing contents:

- WS_PORT = 8000
- WS_1PORT = 8101
- APP_PORT = 8100
  Make sure all these ports are open and avaliable!

CURRENT FEATURES:

- Userlogin (create, authentications, & profile build).
- Two user end to chat and encyption.
- CRUD user and messages.

NOTE: More features to be added soon, like groups. repo also uses esbuild as a client file compressor (buildapp in package.json does the script building & nodemon). Exculte for application to start running: npm run buildapp

NOTE: Project uses a lot of mutation observers(changes in page or element), delegations (tracking child by its parent element) & esbuild's rule sets(e.g no function names)
