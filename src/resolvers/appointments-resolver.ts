import { Resolver, Arg, Mutation, Query, FieldResolver, Root } from "type-graphql";
import { CreateAppointmentInput } from "../dtos/inputs/create-appointment-input";
import { AppointmentModel } from "../dtos/models/appointment-model";
import { Customer } from "../dtos/models/customer-model";

@Resolver(() => AppointmentModel)
export class AppointmentsResolver {
    @Query(() => [AppointmentModel])
    async appointments() {
        return [{
            startsAt: new Date(),
            endsAt: new Date(),
            customerId: '1'
        }];
    }

    @Mutation(() => AppointmentModel)
    async createAppointmentData(@Arg('data') data: CreateAppointmentInput) {
        const appointment = {
            startsAt: data.startsAt,
            endsAt: data.endsAt,
            name: data.name
        }
        return appointment;
    }
    
    @FieldResolver(() => Customer)
    async customer(@Root() appointment: AppointmentModel) {
        console.log(appointment.customerId)

        return {
            name: 'Caio',
        }
    }

}