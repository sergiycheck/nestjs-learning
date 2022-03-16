import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventSchema } from './schemas/event.schema';
import {
  ClickedLinkEvent,
  ClickedLinkEventSchema,
} from './schemas/click-link-event.schema';
import { SignUpEvent, SignUpEventSchema } from './schemas/sign-up-event.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema,
        discriminators: [
          { name: ClickedLinkEvent.name, schema: ClickedLinkEventSchema },
          { name: SignUpEvent.name, schema: SignUpEventSchema },
        ],
      },
    ]),
  ],
})
export class CustomEventModule {}
