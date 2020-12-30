import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./user";

@ObjectType()
export class Role {
  @Field((type) => ID)
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  roleName: string;

  @Field()
  @prop({ required: true })
  roleCode: string;

  @Field((type) => [User])
  users?: Ref<User>[];
}

export const RoleModel = getModelForClass(Role);
