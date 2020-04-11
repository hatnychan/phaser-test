module.exports = {
    type: 'postgres',
    host: 'db', // 接続するDBホスト名
    port: 5432,
    username: process.env.POSTGRES_USER, // DBユーザ名
    password: process.env.POSTGRES_PASSWORD, // DBパスワード
    database: process.env.POSTGRES_DB, // DB名
    // 注意" これがtrueだと、モデル定義を変更すると即DB反映される。普通はmigrationファイルで世代管理すると思うのでfalseにします。
    synchronize: false,
    logging: false,
    entities: ['orm/models/**/*.ts'],
    migrations: ['orm/migrations/**/*.ts'],
    subscribers: ['orm/subscribers/**/*.ts'],
    cli: {
        entitiesDir: 'orm/models',
        migrationsDir: 'orm/migrations',
        subscribersDir: 'orm/subscribers'
    }
}
