class chatEngine {
    constructor(chatBoxID,userEmail){
        this.chatBox = $(`#${chatBoxID}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:6000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        this.socket.on('connect',function(){
            console.log('Connection established using sockets...!')
        })
    }
}