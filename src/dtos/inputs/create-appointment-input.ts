import { InputType, Field } from "type-graphql";
import { Customer } from "../models/customer-model";

@InputType()
export class CreateAppointmentInput {
    @Field()
    customerId: string;

    @Field()
    startsAt: Date;

    @Field()
    endsAt: Date;

    @Field()
    name: string;
}