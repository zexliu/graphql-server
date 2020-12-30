import { User, UserModel } from "../models/user";
import { Resolver, Query, Arg, FieldResolver, Ctx } from "type-graphql";

import { Role, RoleModel } from "../models/role";

@Resolver((of) => Role)
export class RoleResolver {
  //#region Graphql
  @Query((returns) => Role)
  async role(@Arg("id") id: String): Promise<Role> {
    return (await RoleModel.findById(id))!;
  }

  //#region Graphql
  @Query((returns) => [Role])
  async roles(): Promise<Array<Role>> {
    return (await RoleModel.find())!;
  }

  @FieldResolver((returns) => [User])
  async users(@Ctx("role") role: Role): Promise<Array<User>> {
    return (await UserModel.find())!;
  }
}
