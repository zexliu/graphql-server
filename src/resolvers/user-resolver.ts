import { Role } from "../models/role";
import { Resolver, Query, Arg, FieldResolver, Root } from "type-graphql";

import { User, UserModel } from "../models/user";

@Resolver((of) => User)
export class UserResolver {
  //#region Graphql
  @Query((returns) => User)
  async user(@Arg("id") id: String): Promise<User> {
    return (await UserModel.findById(id))!;
  }

  //#region Graphql
  @Query((returns) => [User])
  async users(): Promise<Array<User>> {
    return (await UserModel.find())!;
  }

  //#region Graphql
  @FieldResolver((returns) => [Role])
  async roles(@Root() user: User): Promise<Array<Role>> {
    console.log("find roles", user);
    return (await UserModel.findRoles())!;
  }
}
