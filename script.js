const { createApp } = Vue;
const app = createApp({
    data() {
        return {
            isVisible: true,
            isScoreBoardToggle: false,
            isTalking:false,
            playerData: {
                currentId: 1273,
                percentHealth: 80,
                percentShield: 60,
                percentStamina:100,
                percentOxygen: 100,
                percentHungry: 70,
                percentBrains: 40
            },
            scoreBoardData: {
                playerName:'DingDong KongKongjubb',
                playerJob:'UNEMPOLYED',
                police: 12,
                council: 10,
                emergency: 20,
                phoneNumber:55588,
                onlinePlayerCount: 9999
            },
            voiceState: ["whisper", "normal", "shout"],
            currentTime:null,
            currentDate:null,
            timeSync:null,
            currentVoiceState: 0,
            maxStaminaItem:5,
            defaultOffset:[67,11],
            screenWidth:window.innerWidth,
            screenHeight:window.innerHeight,
            // responsive vh logo flaoting 
            offset:{
                "16:9":this.defaultOffset,
                "1:1":[28,11],
                "3:2":[53,11],
                "4:3":[44,11],
                "5:4":[40,11],
                "7:3":[],
                "8:5":[],
                "32:9":[155,11],
                "43:18":[],
                "64:27":[96,11],
                "256:135":[],
                "478:237":[],
                "480:253":[72,11],
                "564:317":this.defaultOffset,
                "683:384": this.defaultOffset,
                "800:521": [],
                "840:521": [],
                "1280:853":[53,11],
                "1280:549":[94,11],
                "1888:947":[77,11]
            }
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
        gcd(a,b){
            return b === 0 ? a : this.gcd(b , a % b)
        },
        getLogoOffset(width, height){
            const divisor = this.gcd(width, height);
            const ratioKey = `${width/divisor}:${height/divisor}`;
            console.log(ratioKey)
            return this.offset[ratioKey]??this.defaultOffset;
        },
        handleResize(){
            this.screenWidth = window.innerWidth;
            this.screenHeight = window.innerHeight;
        },
        clipPath(position,percent){
            switch (position) {
                case 'top':
                    return {
                        'clip-path':`inset(${100-percent}% 0 0 0 round 0.4vh)`,
                        transition:'clip-path 200ms linear'
                    };
                case 'right':
                    return {
                        'clip-path':`inset(0 ${100-percent}% 0 0 round 0.4vh)`,
                        transition:'clip-path 200ms linear'
                    }
                default:
                    break;
            }
        },
        keydown(event){
            // console.log(event.code)
            if(event.code === 'KeyA'){
                // console.log("wowww")
                this.isScoreBoardToggle = !this.isScoreBoardToggle;
            }
            if(event.code === 'KeyS'){
                this.isVisible = !this.isVisible
            }
        }
    },
    computed:{
        calcItemStamina(){
            return Math.floor(this.playerData.percentStamina / (100 / this.maxStaminaItem));
        },
        getFloatingActive(){
            const [x,y] = this.getLogoOffset(this.screenWidth,this.screenHeight)
            return {
                top:`${y}vh`,
                right:`${x}vh`
            }
        },
        AnimetedHealthBar(){
            return this.clipPath('right',this.playerData.percentHealth)
        },
        AnimatedShieldBar(){
            return this.clipPath('right',this.playerData.percentShield)
        },
        AnimatedHungryBar(){
            return this.clipPath('top',this.playerData.percentHungry)
        },
        AnimatedBriansBar(){
            return this.clipPath('top',this.playerData.percentBrains)
        },
        AnimatedOxygenBar(){
            return this.clipPath('top',this.playerData.percentOxygen)
        }

    },
    mounted() {
        window.addEventListener('message', this.handleMessage)
        window.addEventListener("resize",this.handleResize)
        window.addEventListener('keydown',this.keydown);
        this.timeSync = setInterval(()=>{
            this.currentTime = this.getTime();
            this.currentDate = this.getDate();
        },1000)
    },
    beforeUnmount() {
        window.removeEventListener('message', this.handleMessage)
        window.removeEventListener("resize",this.handleResize)
        window.removeEventListener('keydown',this.keydown)
        clearInterval(this.timeSync)
    }
}).mount("#app")