const { createApp } = Vue;
const app = createApp({
    data(){
        return{
            isVisible:true,
            isScoreBoardToggle:false,
            playerData:{
                currentId:0,
                percentHealth:0,
                percentShield:0,
                percentOxygen:0,
                percentHungry:0,
                percentBrains:0
            },
            scoreBoardData:{
              police:0,
              counsil:0,
              emergency:0,
              phoneNumber:0,
              onlinePlayerCount:0  
            },
            voiceState:["whisper","normal","shout"],
            currentVoiceState:0
        }
    },
    methods:{
        handleMessage(event){
            const data = event?.data;
            switch (data.action) {
                case 'toggleScoreBoard':
                    this.isScoreBoardToggle = !this.isScoreBoardToggle;
                    // scoreboard data here 
                    break;
                case 'toggleHudsVisible':
                    this.isVisible = data?.toggleHudsState;
                default:
                    break;
            }
        }
    },
    computed(){

    },
    mounted(){
        window.addEventListener('message',this.handleMessage)
    },
    beforeUnmount(){
        window.removeEventListener('message',this.handleMessage)
    }
}).mount("#app")