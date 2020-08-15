import express from 'express'
import http from 'http'
import https from 'https'
import { createConnection } from 'typeorm'
import apiRouter from './apiRouter'
import authRouter from './authRouter'
import passport from 'passport'
import session from 'express-session'
import fs from 'fs'
import 'reflect-metadata'

const server = async (): Promise<void> => {
    const app: express.Express = express()

    // http server
    /*
      実はhttpモジュールを使わなくてもapp.listen(port)でサーバーを起動することができる。
      ただ、socket.ioやHTTPS(実際はhttpsを使う)を利用を考えると、結局httpモジュールを使うことになる。
      httpsで接続するための方法は調べた限り２つある。
      ・https.createServerにサーバーの証明書を食わせる。他サーバーは要らないがプログラムの修正が必要。
      ・nginxなどのリバースプロキシサーバーを用意してそちらにサーバーの証明書を食わせる。プログラムの修正は要らない。
      (参考：https://www.codementor.io/@marcoscasagrande/installing-express-nginx-app-on-ubuntu-18-04-with-ssl-using-certbot-pdt44g5gs)
      herokuなどは内部で複数のサーバが連携しているので、
      https.portの設定や証明書がなくても、普通にアプリをpushすればhttpsのURLが使えるようになる。
    */
    if (app.get('env') === 'development') {
        const options = {
            cert: fs.readFileSync('/home/user/server_certificate/localhost.crt.pem'),
            key: fs.readFileSync('/home/user/server_certificate/localhost.key.pem')
        }
        https.createServer(options, app).listen(process.env.SERVER_PORT)
    } else if (app.get('env') === 'staging') {
        http.createServer(app).listen(process.env.SERVER_PORT)
    } else if (app.get('env') === 'production') {
        http.createServer(app).listen(process.env.SERVER_PORT)
    }

    // --- TypeORMの設定
    await createConnection()

    // Body-Parser
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    // セッションの設定
    app.use(
        session({
            secret: 'secret', // secret属性は指定した文字列を使ってクッキーIDを暗号化しクッキーIDが書き換えらているかを判断する。
            resave: false, // resaveはセッションにアクセスすると上書きされるオプションらしい。今回はfalse.
            saveUninitialized: false, // saveUninitializedは未初期化状態のセッションも保存するようなオプション。今回はfalse.
            cookie: {
                httpOnly: false, // httpOnlyはクライアント側でクッキー値を見れない、書きかえれないようにするオプション
                secure: true, // secureオプションはhttpsで使用する場合はtrueにする。
                maxAge: 1000 * 60 * 10 // maxageはセッションの消滅時間。単位はミリ秒。ミリ秒は千分の一秒なので1000 * 60 * 30で30分と指定。
            }
        })
    )

    // Passportの初期化
    // 正しい順番でログインセッションを処理できるようにpassport.session()の前にexpress.session()を行うこと
    app.use(passport.initialize())
    app.use(passport.session())

    // 静的ファイルのホスティング。express.staticの指定のフォルダが公開される
    app.use('/', express.static('phaser/dist'))

    // APIRouter
    app.use('/api', apiRouter)

    // 認証Router
    app.use('/auth', authRouter)
}
server()
