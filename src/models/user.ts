import {
  prop,
  getModelForClass,
  Ref,
  ReturnModelType,
} from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType, Field, ID } from "type-graphql";
import { Role } from "./role";

@ObjectType()
export class User {
  @Field((type) => ID)
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  username: string;

  @Field({ nullable: true })
  @prop()
  nickname?: string;

  @prop({ required: true })
  password: string;

  @Field((type) => [Role])
  @prop({ ref: "Role", type: ObjectId, default: [] })
  roles: Ref<Role>[];

  //用户角色的Ids 差角色
  public static async findRoles(
    this: ReturnModelType<typeof User>
  ): Promise<Array<Role>> {
    return this.populate("Role", { path: "roles" });
  }
}

export const UserModel = getModelForClass(User);
