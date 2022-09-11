import { InputType, Int, Field } from '@nestjs/graphql';
import {Column} from "typeorm";

@InputType()
export class CreateUserInput {


  @Field(() => String, { description: 'Name of the entity' })
  @Column()
  name: string;

  @Field(() => String, { description: 'Email of the entity' })
  @Column()
  email: string;

  @Field(() => String, { description: 'Password of the entity' })
  @Column()
  password: string;

}
