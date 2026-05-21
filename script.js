const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            isVisible: true,
            isScoreBoardToggle: false,
            isTalking:false,
            playerData: {
                currentId: 0,
                percentHealth: 100,
                percentShield: 0,
                percentOxygen: 0,
                percentHungry: 0,
                percentBrains: 0
            },
            scoreBoardData: {
                police: 0,
                counsil: 0,
                emergency: 0,
                phoneNumber: 0,
                onlinePlayerCount: 0
            },
            voiceState: ["whisper", "normal", "shout"],
            currentTime:null,
            currentDate:null,
            timeSync:null,
            currentVoiceState: 0
        }
    },
    methods: {
        handleMessage(event) {
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
        },
        getDate() {
            const now = new Date();
            return `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${String(now.getFullYear()).padStart(4, "0")}`;
        },
        getTime() {
            const now = new Date();
            return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
        },

    },
    computed() {

    },
    mounted() {
        window.addEventListener('message', this.handleMessage)
        this.timeSync = setInterval(()=>{
            this.currentTime = this.getTime();
            this.currentDate = this.getDate();
        },1000)
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleMessage)
        clearInterval(this.timeSync)
    }
}).mount("#app")