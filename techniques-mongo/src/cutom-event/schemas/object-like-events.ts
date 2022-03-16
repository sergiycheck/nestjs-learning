import mongoose from 'mongoose';

const options = { discriminatorKey: 'kind' };

const eventSchema = new mongoose.Schema({ time: Date }, options);
const EventModel = mongoose.model('Event', eventSchema);

const ClickedLinkEvent = EventModel.discriminator(
  'ClickedLink',
  new mongoose.Schema({ url: String }, options),
);

const SignUpEvent = EventModel.discriminator(
  'SingUpLink',
  new mongoose.Schema({ url: String }, options),
);

export { ClickedLinkEvent, SignUpEvent };
