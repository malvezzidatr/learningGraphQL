import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class AppointmentModel {
    @Field()
    customerId: string;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;

    @Field()
    name: string;
}