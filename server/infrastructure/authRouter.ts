import express from 'express'
import passport from 'passport'
import passportTwitter from 'passport-twitter'
import UserController from '../interfaces/controllers/UserController'
import UserRepository from './database/repositories/UserRepository'
import User from '../domain/models/User'

const router: express.Router = express.Router()
const userController = new UserController(new UserRepository())

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
            // TODO saltでぐちゃっとする。
            return done(null, { accessToken })
        }
    )
)

passport.serializeUser((accessToken, done) => {
    done(null, accessToken)
})

passport.deserializeUser(async (sesUser: { accessToken: string }, done) => {
    const userId: string = sesUser.accessToken
    let user: User | undefined = await userController.findOneUser({ userId: userId })
    if (!user) {
        const newUser: User = new User()
        newUser.userId = userId
        newUser.userName = '${initName}'
        newUser.location = 'TOKYO'
        newUser.lang = 'ja'
        await userController.insertUser(newUser)
        user = newUser
    }
    done(null, user)
})

router.get('/logout', async (req: express.Request, res: express.Response) => {
    req.logout() // セッション削除
    res.redirect('/')
})

router.get('/:provider', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const provider: string = req.params.provider
    // TODO providerがtwitterかgoogleかどうかの判定を入れる。
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

export default router
