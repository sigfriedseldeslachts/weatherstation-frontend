import SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';

export default ({ app }, inject) => {
  const socket = new SockJS(`http://${window.location.hostname}:8080/ws/measurements`);
  const stomp = Stomp.over(socket);

  inject('websocket', {
    socket,
    stomp
  });
}