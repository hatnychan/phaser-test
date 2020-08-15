# phaser-test

## how to build
Server certification to localhost for development under https.

### macOS
install mkcert.
```
brew update
brew install mkcert
```
create local CA.
```
mkcert -install.
```
create server certificate.
```
mkcert -cert-file {dockerDir}/server_certificate/localhost.crt.pem -key-file {dockerDir}/server_certificate/localhost.key.pem 0.0.0.0 localhost 127.0.0.1 ::1;
```