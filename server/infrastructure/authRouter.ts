import express from 'express'
import passport from 'passport'
import passportTwitter from 'passport-twitter'

const router: express.Router = express.Router()

/* 
  passport.use(new passportTwitter.Strategy())によって認証成功時reqにデータがセットされる。
  認証が成功した後はブラウザ上のクッキーを利用することでセッションを確立・維持する。(都度認証は行わない)
  passport.serializerUser()によってセッションIDとreqにセットされたデータが紐づく。
  クライアントからリクエストが飛んできた場合はpassport.deserializerUser()によって、
  クッキーに紐づくセッションIDに紐づくデータが返るようになる。
  ここではreqにアクセストークンを保存する。
  アクセストークンは一ユーザ対して一意的に与えられるので、この値をデータベースなどに格納しておけば、
  既存のユーザであるのかを判定することができる。
*/
passport.use(
    new passportTwitter.Strategy(
        {
            consumerKey: `${process.env.TWITTER_API_KEY}`,
            consumerSecret: `${process.env.TWITTER_API_KEY_SECRET}`,
            callbackURL: `${process.env.SERVER_URL}` + ':' + `${process.env.SERVER_PORT}` + '/auth/twitter/callback'
        },
        (
            accessToken: string,
            refreshToken: string,
            profile: passportTwitter.Profile,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            done: (error: any, user?: any) => void
        ): void => {
            // 認証成功後に走る処理：要求引数(req)に渡したい値をdoneの第2引数に入れる。
            return done(null, { accessToken })
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})

router.get('/:provider', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const provider: string = req.params.provider
    // TwitterやGoogle認証には2つのルーティングが必要。最初のルーティングで許可しますか？の画面に飛ばす。
    // 許可後/callbackにリダイレクトさせる。
    passport.authenticate(provider)(req, res, next)
})

router.get('/:provider/callback', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const provider: string = req.params.provider
    // ユーザーが許可すると、TwitterはユーザーをこのURLにリダイレクトさせる。
    // この認証プロセスの最後にアクセストークンの取得が行われる。
    // 取得が成功すればユーザーはログインしたことになる。失敗したときは認証失敗とみなされる。
    passport.authenticate(provider, {
        successRedirect: '/',
        failureRedirect: '/',
        failureFlash: true,
        successFlash: true,
        session: true
    })(req, res, next)
})

router.get('/:provider/logout', async (req: express.Request, res: express.Response) => {
    // await authorizationController.logout()
})

export default router
