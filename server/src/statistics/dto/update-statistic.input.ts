import { CreateStatisticInput } from './create-statistic.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { View } from '../entities/view.entity';
import { Click } from '../entities/click.entity';

@InputType()
export class UpdateStatisticInput extends PartialType(CreateStatisticInput) {
  @Field(() => Int)
  id: number;
  @ApiProperty()
  @Field(() => [View], {
    description: 'views of the statistic',
    nullable: true,
  })
  views?: View[];

  @ApiProperty()
  @Field(() => [Click], {
    description: 'clicks of the statistic',
    nullable: true,
  })
  clicks?: Click[];
}
