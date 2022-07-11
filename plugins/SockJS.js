import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

export default ({ app }, inject) => {
  const socket = new SockJS('/ws/measurements');
  const stomp = Stomp.over(socket);
  stomp.debug = () => {};

  inject('websocket', {
    socket,
    stomp
  });
}
