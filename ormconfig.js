module.exports = {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST, // 接続するDBホスト名
    port: process.env.DB_PORT,
    username: process.env.DB_USER, // DBユーザ名
    password: process.env.DB_PASS, // DBパスワード
    database: process.env.DB_NAME, // DB名
    // 注意" これがtrueだと、モデル定義を変更すると即DB反映されて危険。普通はmigrationファイルで世代管理すると思うのでfalseにします。
    synchronize: false,
    logging: false,
    cache: true,
    entities: ['server/domain/models/**/*.ts'],
    migrations: ['migrations/**/*.ts'],
    cli: {
        entitiesDir: 'server/domain/models',
        migrationsDir: 'migrations'
    }
}
