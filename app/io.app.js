export default {
  init(server){
    this.server = server;
    this.listenEvent();
  },

  listenEvent(){
    this.server.on('connection', (socket) => {
      console.log(`Utilisateur connecté: ${socket.id}`);
    });
  }

}