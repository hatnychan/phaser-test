# phaser-test

## how to build
Server certification to localhost for development under https.

### macOS
```
brew update
brew install mkcert
```

create local CA
```
mkcert -install
```
create server certificate
```
mkcert -cert-file {dockerFileDir}/server_certificate/localhost.crt.pem -key-file {dockerFileDir}/server_certificate/localhost.key.pem 0.0.0.0 localhost 127.0.0.1 ::1;
```
After creating the server authentication file, run docker-compose up -d.