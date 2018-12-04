// #c53f3c
// #ce4045
// 深灰色 fffefd
// var  1080 1920
// body  1600
// 	left 170px
// height 156px
$(function(){
    Vue.use(VueAwesomeSwiper)
    Vue.use(Toasted,{
        position:'top-center',
        duration:1500,
        fullWidth:true,
        theme:'bubble',
        className:'jd-toasted',
    })
    var app = window.app = new Vue({
        data:{
            name:"自主贩卖机",
            user:{
                name:'',
                id:'',
            },
            // 商品清单
            goods_list:[],
            //已选项 /购物车
            selected:[],
            footer:{
                show:true,
                detail:false,
            },
            modal:{
                // 是否有弹出层蒙版
                hasMask:true,
                // 是否有关闭按钮
                hasCloseBtn:false,
                // 弹窗
                // show: [false|''|'id_scan'|'qr_scan'|'success']
                show:'',
                
            },
            swiperOption:{
                direction:'vertical',
                // 点击与滑动的点击位置  数字越大 越容易在滑动中触发点击 
                clickDeviation:20,
                // 触发惯性滑动的阈值  数字越小 越容易触发惯性滑动
                velocityThreshold:0.1,
                // 惯性速率  数字越大  触发的惯性滑动距离越大
                momentumRatio:1,
                // 回弹系数 0-1  数字越大  可以继续拖动的距离越大
                resistance: 0.3,
                freeMode:true,
                slidesPerView:'auto',
                freeModeMinimumVelocity:0.1,
                scrollbar:{
                    el: '.swiper-scrollbar',
                    hide: true,
                }
            },
            swiperOption_2:{
                direction:'vertical',
                // 点击与滑动的点击位置  数字越大 越容易在滑动中触发点击 
                clickDeviation:20,
                // 触发惯性滑动的阈值  数字越小 越容易触发惯性滑动
                velocityThreshold:0.1,
                // 惯性速率  数字越大  触发的惯性滑动距离越大
                momentumRatio:1,
                // 回弹系数 0-1  数字越大  可以继续拖动的距离越大
                resistance: 0.3,
                freeMode:true,
                slidesPerView:'auto',
                freeModeMinimumVelocity:0.1,
                scrollbar:{
                    el: '#swiper-scrollbar-2',
                    hide: true,
                }
            },
        },
        computed:{
            // 商品总额
            amt(){
                return this.selected.reduce((prev,next)=>{
                    return prev += Number(next.price) * next.amt
                },0)
            },
            modalMask(){
                return this.modal.hasMask && this.modal.show
            },
            modalCloseBtn(){
                return this.modal.hasCloseBtn && this.modal.show
            },
            goods_raw(){
                return this.goods_list.reduce((prev,next)=>{
                    if(next.items&&next.items.length>0){
                        prev.push(...next.items)
                    }
                    return prev;
                },[])
            }
        },
        watch:{
            amt(val){
                if(!val){
                    this.footer.detail=false;
                }
            }
        },
        methods:{
            handleGoodPlus(id){
                // 如果没有这个限制 请注释掉
                if(this.selected.length>0 && this.selected[0].id !=id){
                   this.$toasted.error('目前不支持同时添加多个商品')
                    return;
                }

                let length = this.selected.find(good=>good.id==id)? this.selected.find(good=>good.id==id).amt:0;
                if( length >= this.goods_raw.find(good=>good.id==id).limit){
                    //数量不够 
                   this.$toasted.error('没有剩余')
                    return;
                }
                if(this.selected.length == 0 || !this.selected.find(good=>good.id==id)){
                    this.selected.push(Object.assign({amt:1},this.goods_raw.find(good=>good.id==id)))
                }else{
                    this.selected.find(good=>good.id==id).amt+=1
                }
                
                
            },
            handleGoodMinus(id){
                this.selected.find(good=>good.id==id).amt-=1
                if(this.selected.find(good=>good.id==id).amt == 0){
                    let idx = this.selected.findIndex(good=>good.id==id)
                    this.selected.splice(idx,1)
                }
               
            },
           
            handleSelectDone(){
                if(!this.amt){
                   this.$toasted.error('您当前还未选择任何商品')
                    return;
                }
                //如果已经登陆 直接进行付款
                if(this.user.id){
                    this.footer.detail = false;
                    
                    this.modal.show = 'qr_scan'
                    
                    /** 
                     * 模拟代码
                     * 默认付款成功
                     */
                    let time = setTimeout(() => {
                        
                        this.modal.show = 'success'
                        //清空已选项目
                        this.selected = []
                        clearTimeout(time)
                    }, 2000);
                    return;
                }
                // 没有登陆就先扫码
                this.footer.detail = false;
                this.modal.show = 'id_scan'
                /** 
                 * 模拟代码
                 */
                let time = setTimeout(() => {
                    this.user = {
                        name:'陈羽凡',
                        id:'659'
                    }
                    this.modal.show = false
                    // 直接进行付款
                    this.handleSelectDone()
                    clearTimeout(time)
                }, 2000);
            },
            logout(){
                this.user={
                    id:'',
                    name:'',
                }
                this.selected = []
                this.modal.show=false
                this.modal.detail = false
            },
            closeModal(){
                this.modal.show=false
                
            }
        },
        template:`\
    <section class='plain-1  d-flex flex-column align-items-stretch' style="width:100%;height:100%;">
        <div class="header bg-red flex-shrink-0 flex-grow-0 text-center text-white">
            {{name}}
        </div>
        <section class='content-container  flex-fill  d-flex flex-row align-items-stretch position-relative' style='overflow: visible;width:100%;' data-step='1'>
            <section class='content content-1 flex-shrink-0 flex-grow-0 d-flex flex-row align-items-stretch' style="width:100%">
                <!-- <div class="left flex-shrink-0 flex-grow-0 " style='background-color: #f2f2f2;width:170px;'></div> -->
                <div class="right flex-fill d-flex flex-column align-items-stretch" style='background-color:#fffefd '>
                    <div class='text-left text-red shadow bg-white px-4' style="height: 80px;line-height:80px;font-weight: 600;">
                        商品明细
                        <span class='user' style="float:right" >{{user.name?"您好,"+user.name:"未登录"}}</span>
                    </div>
                    <swiper :options="swiperOption" class='list-container'>
                        <swiper-slide v-for='goods in goods_list' :key='goods.name' class="term-group term-list d-flex flex-row flex-wrap" style='font-size: 1.1em;font-weight: 400;'>

                            <section v-for='(item,index) in goods.items'  class="term-unit d-flex flex-column align-items-center my-2 py-2" style="width:535px;height:560px;" :key='item.id'>
                                <div class='bgi-normal my-2 bg-white shadow' style='width:420px;height:420px;'
                                :style='{"background-image":"url("+item.img+")"}'>
                                </div> 
                                <div class="term-title  text-center pl-1" data-code='' style='width:100%'>{{name}}</div>
                                <div class="d-flex flex-row term-title  text-left px-4 position-relative" data-code='' style='width:100%;margin-top:5px'>
                                    <span class='text-red'>￥{{item.price}}</span>
                                    <div class='position-absolute' style='width:40%;right:45px'>
                                        <span class='text-red iconfont bgi-normal shadow rounded-circle text-white position-absolute clickable' style='height:45px;width:45px;left:0;top:-2px;font-size:1.2em'
                                        v-if="selected.find(good=>good.id==item.id)"
                                        @click='handleGoodMinus(item.id)'>
                                            &#xe780;
                                        </span>
                                        <div class='text-center'>
                                            {{selected.find(good=>good.id==item.id)?selected.find(good=>good.id==item.id).amt:0}}
                                        </div>
                                        <span class='text-red iconfont bgi-normal shadow rounded-circle text-white position-absolute  clickable' style='height:45px;width:45px;right:0px;top:-3px;font-size:1.2em'
                                        @click="handleGoodPlus(item.id)">
                                            &#xe845;
                                        </span>   
                                    </div>
                                </div>
                            </section>
                          
                        </swiper-slide>
                        <div class="swiper-scrollbar"   slot="scrollbar"></div>
                    </swiper>
                </div>
            </section>
            <section class='content content-2 p-4 flex-shrink-0 flex-grow-0 d-flex flex-row align-items-stretch ' style="width:100%;background-color:#f2f2f2">
                <div class='d-flex flex-column align-items-stretch flex-fill  bg-white shadow p-3' style="border-radius:40px;background-color: #fff;color:black;">
                    <div class='pl-2 flex-shrink-0 flex-grow-0' style="height:90px;line-height: 90px;font-size: 1.3em;font-weight: 500;border-bottom:2px solid #eee">
                        商品详情 <div class='clickable return text-center' style='float:right;width:80px;height:80px;' pointer>×</div>
                    </div>
                    <div class='list-container flex-fill' style='width:100%'>
                        
                    </div>
                    <div class='pl-2 flex-shrink-0 flex-grow-0 text-right' style="height:90px;line-height: 90px;font-size: 1.3em;font-weight: 500;border-top:2px solid #eee">
                        共<span class='text-red'>1</span>件 <span class='text-red'>￥ 20.00</span>
                    </div>
                </div>
            </section>
        </section>
        <div v-if='footer.show' class="footer flex-shrink-0 flex-grow-0 d-flex flex-row align-items-stretch text-white  position-relative" style = 'height:170px;line-height: 170px;font-size: 1.6em;overflow:visible'
        :class='[selected.length>0?"bg-red":"bg-gray"]'>
            <div @click="footer.detail=!footer.detail"
            class='d-flex flex-row  align-items-center ' style="width:700px;border-right:#ccc solid 2px;">
                <!-- 图标 修改background-image -->
                <div class="flex-shrink-0 flex-grow-0 bgi-normal ml-3 mr-4" style="width:80px;height:80px;background-image: url(./img/shopping_car.png);"></div>
                 <!-- 图标 修改background-image -->
                <div class='flex-fill'>
                    ￥ {{amt}}
                </div>
            </div>
            <div class='flex-fill text-center select-done' style='' @click='handleSelectDone'>
                {{ selected.length>0? user.id ?"扫码付款 ›":"选好了 ›":"尚未选择商品"}}
            </div>
            <div class='detail position-absolute'
            @click ='footer.detail=false'
             v-if='footer.detail && amt' 
            style='bottom:170px;color:black;z-index:99;background-color:#fff;width:100%;'>
                <swiper :options='swiperOption_2' class='' style='width:100%;max-height:850px;overflow:hidden;'>
                    <swiper-slide v-for='item in selected' @click.native.stop class='pl-4 bg-white d-flex flex-row justify-content-stretch' :key='"selected"+item.id'>
                        <div style='width:50%'  class='flex-shrink-0'>{{item.name}}</div>
                        <div style='wdith:20%' class='flex-shrink-0 text-red'>{{item.price}}</div>
                        <div class='flex-fill position-relative px-4'>
                            <span class='text-red iconfont bgi-normal shadow rounded-circle text-white position-absolute clickable' style='height:45px;width:45px;left:80px;top:-2px;font-size:1.2em'
                            @click='handleGoodMinus(item.id)'>
                                &#xe780;
                            </span>
                            <div class='text-center'>
                                {{item.amt}}
                            </div>
                            <span class='text-red iconfont bgi-normal shadow rounded-circle text-white position-absolute  clickable' style='height:45px;width:45px;right:80px;top:-3px;font-size:1.2em'
                            @click="handleGoodPlus(item.id)">
                                &#xe845;
                            </span> 
                        </div>
                    </swiper-slide>
                    <div id="swiper-scrollbar-2"   slot="scrollbar"></div>
                </swiper>
            </div>
        </div>
        <section v-if='modalMask' class='mask position-absolute' @click='closeModal'
            style='left:0;right:0;top:0;bottom:0;z-index: 999;background-color: rgba(0,0,0,.15);'>
        </section>
        <div v-if='modal.show=="id_scan"' class='qr_scan bgi-normal bg-white absolute-center d-flex flex-column align-items-center' style="border-radius: 30px;width:780px;height:930px;z-index:10001">
            <div class='bgi-normal' style='background-image: url(./img/qr_scan.png);margin-top:190px;width:450px;height:450px'></div>
            <div style="margin-top:120px;font-size: 1.2em">请将条形码对准摄像头</div>          
        </div>
        <div v-if='modal.show=="qr_scan"' class='qr_scan bgi-normal bg-white absolute-center d-flex flex-column align-items-center' style="border-radius: 30px;width:780px;height:930px;z-index:10001">
            <div class='bgi-normal' style='background-image: url(./img/qr_scan.png);margin-top:190px;width:450px;height:450px'></div>
            <div style="margin-top:120px;font-size: 1.2em">请将付款码对准摄像头</div>          
        </div>
        <div  v-if='modal.show=="success"' class='success bgi-normal bg-white absolute-center  d-flex flex-column align-items-center'  style="border-radius: 30px;width:780px;height:930px;z-index:10001">
            <div class='bgi-normal' style='background-image: url(./img/成功.png);margin-top:350px;width:100px;height:100px'></div>
            <div style="margin-top:120px;font-size: 1.2em">购买成功</div>
            <div class='position-absolute d-flex flex-row' style='bottom:0;width:100%;height:170px;border-top:1px #ccc solid;'>
                <div style='width:50%;font-size:35px;line-height:170px;text-align:center;border-right:1px #ccc solid;' @click='logout'>退出登录</div>
                <div style='width:50%;font-size:35px;line-height:170px;text-align:center' @click='closeModal'>继续购买</div>
            </div>
        </div>
        <div v-if='modalCloseBtn' 
        @click='closeModal'
        class='position-absolute iconfont' style='left:888px;top:444px;z-index:19999;font-size:77px;'>
            &#xe6f2;
        </div>
    </section>`,
    }).$mount('#app')
	
	// modal.hide()
	// modal.show('qr_scan')
    // modal.show('success')
    var idx = 0
    app.goods_list = [
        {	
			name:'商品类目Ⅰ',
			items:new Array(20).fill('').map(item=>{
				return {
					img:'./img/issue1.jpg',
					name:'护理液',
					price:'100.0',
                    id:idx++,
                    limit:10,
				}
			})
		}
    ]

	
})