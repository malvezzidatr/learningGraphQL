import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AppointmentModel {
    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;
}