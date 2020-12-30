import "reflect-metadata";
import * as Koa from "koa";
import * as Router from "koa-router";
const app = new Koa();
const router: Router = new Router();
import { ApolloServer } from "apollo-server-koa";
import * as path from "path";

import { connect } from "./database/database";
import { UserModel } from "./models/user";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/user-resolver";
import { ObjectId } from "mongodb";
import { ObjectIdScalar } from "./scalars/object-id.scalar";
import * as bodyParser from "koa-bodyparser";
import { RoleModel } from "./models/role";
import { setLogLevel, LogLevels } from "@typegoose/typegoose";

async function bootstrap() {
  //typegoose日志
  setLogLevel(LogLevels.DEBUG);
  //连接Mongo数据库
  connect();

  // build TypeGraphQL executable schema
  const schema = await buildSchema({
    resolvers: [UserResolver],
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
    // use document converting middleware
    // globalMiddlewares: [TypegooseMiddleware],
    // use ObjectId scalar mapping
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
  });

  router.get("/healthy", async (ctx: Router.RouterContext) => {
    console.log("in this healthy router");
    const role = await RoleModel.create({
      roleName: "admin",
      roleCode: "Admin",
    });

    console.log(role);

    const user = await UserModel.create({
      username: "admin",
      password: "password",
      roles: [role],
    });
    console.log(user);
    ctx.body = "hello";
  });

  const server = new ApolloServer({ schema: schema });
  server.applyMiddleware({ app });
  app.use(bodyParser());
  app.use(router.routes());
  app.on("error", (error) => {
    console.log(error);
  });
  app.listen(3000, () => {
    console.log(`The server is running at port 3000${server.graphqlPath}`);
  });
}

bootstrap();
