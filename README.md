# split-order-be


Command generate migrations
```
npx typeorm-ts-node-commonjs migration:create src/database/migrations/CreateCourierCharge
```

Command run migrations
```
npx typeorm-ts-node-commonjs -d src/config/ormconfig.ts migration:run
```

Command run Seed
```
npm run seed
```