import Pusher from 'pusher-js';
import ENV from './env';

const pusher = new Pusher(ENV.PUSHER_KEY, {
  cluster: ENV.PUSHER_CLUSTER,
  enableStats: true,
});

export const pusherChannel = pusher.subscribe(ENV.PUSHER_CHANNEL);
export default pusher;
