const extend = (target, source) => {
    if(source){
        for (let key in source) {
          target[key] = source[key]
        }
    }
  return target
};
Vue.component(
    "phone-board",
    {
    name:"phone-board",
    data(){
        return{
            value:'',
            numArr:[1,2,3,4,5,6,7,8,9]
        }
    },
    props:{
        initialValue:{
            type:[String,Number]
        },
        tip:{
            type:[]
        },
        limit:{
            type:Number,
            default:4
        }
    },
    methods:{
        show(options) {
          extend(this, options);
          this.promise = new Promise((resolve, reject) => {
            this.$on('keyboard-confirm', (payload) => {
              this.hide()
              resolve(payload)
            })
            this.$on('keyboard-cancle',() => {
                this.hide()
                reject();
            })
          })
          return this.promise
        },
        hide(){
          setTimeout(() => {
            
            this.$destroy()
          }, 200)
        },
        handlePhoneConfirm(){
            this.$emit('keyboard-confirm',this.value);	
        },

        handlePhoneCancle(){
            this.$emit('keyboard-cancle');
        },
        handleNumClick(i){
            if(this.value.length<this.limit){
                this.value+=i;
            }else{
                this.$emit('digital-overflow')
            }
        },
        handleClear(){
            this.value='';
        },
        handleKeyBack(){
            if(this.value.length>0)
            this.value=this.value.slice(0,-1)
        },
    },
    mounted(){
        if(!this.value){
            this.value=this.initialValue+''||'';
        }
        
    },
    destroyed(){
        // let parent = this.$el.parentNode;
        // parent.removeChild(this.$el)
    },
    template:`\
    <div class='model flex-column center'>
        <div class="flex-column center keyboard-wrapper">
            <div class='screen number'  txt show style="">{{value.slice(-12)}}</div>
            <section  class="d-flex num-board flex-row flex-wrap align-content-around" style='height:920px;padding:0 0 0 70px'>
                <div v-for = "item in numArr" class='flex-shrink-0 raised-button num-button' 
                :label="item+''" :data-num="item"  
                @click="handleNumClick(item)" 
                 :key="item">
                    <span>{{item}}</span>
                </div>
                <div style="font-size:35px" class='raised-button num-button' :label="'清除'"   
                @click="handleClear" 
                >
                    <span>清除</span>
                </div>
                <div style="" class='raised-button num-button' :label="'0'"   
                @click="handleNumClick(0)" 
                >
                    <span>0</span>
                </div>
                <div style="font-size:35px" class='raised-button num-button' :label="'回退'"   
                @click="handleKeyBack" 
                >
                    <span>←</span>
                </div>
            </section>
            <div class='input-confirm d-flex flex-row  flex-bottom' style='padding:0 0 0 70px;'>
                <div class='raised-button' label=" 取消 " 
                @click="handlePhoneCancle">
                    <span> 取消 </span>
                </div>
                <div class='raised-button' label=" 确认 " style='width:480px'
                @click="handlePhoneConfirm" >
                    <span> 确认 </span>
                </div>
            </div>
            <div v-if='tip' class='text-red tip' >{{tip}}</div>	
        </div>
	</div>
    `
})