import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, Int, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class RefreshToken {
    @Field(() => Int, { description: 'Id of the entity' })
    @PrimaryGeneratedColumn()
    id: number;
    @Field(() => String, { description: 'token of the entity' })
    @Column()
    token: string;
}