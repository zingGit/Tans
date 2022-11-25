import Api from "./api";
import { CheckBalance_Req, CheckBalance_Res, CreateUser_Req, CreateUser_Res, GetBalance_Req, GetBalance_Res, GetGameURl_Req, GetGameURl_Res, SetBalance_Req, SetBalance_Res } from "./api-interface";
import Client from "./client";
import Data from "./data";
import HttpClient from "./httpclient";
import Utils from "./utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

  
    @property([cc.Node])
    listNodeView: Array<cc.Node> = []

    @property(cc.EditBox)
    edSecretKey: cc.EditBox = null

    /** -----------创建用户----------- */
    @property(cc.EditBox)
    ed_createUser_merchant: cc.EditBox = null
    @property(cc.EditBox)
    ed_createUser_userId: cc.EditBox = null
    /** -----------获取游戏地址----------- */
    @property(cc.EditBox)
    ed_getUrl_merchant: cc.EditBox = null
    @property(cc.EditBox)
    ed_getUrl_userId: cc.EditBox = null
    @property(cc.EditBox)
    ed_getUrl_gameid: cc.EditBox = null
    /** -----------检查余额----------- */
    @property(cc.EditBox)
    ed_check_merchant: cc.EditBox = null
    @property(cc.EditBox)
    ed_check_userId: cc.EditBox = null
    /** -----------带出余额----------- */
    @property(cc.EditBox)
    ed_getbalance_merchant: cc.EditBox = null
    @property(cc.EditBox)
    ed_getbalance_userId: cc.EditBox = null
  
    /** -----------带入余额----------- */
    @property(cc.EditBox)
    ed_setbalance_merchant: cc.EditBox = null
    @property(cc.EditBox)
    ed_setbalance_userId: cc.EditBox = null
    @property(cc.EditBox)
    ed_setbalance_count: cc.EditBox = null
  
    /** 当前视图索引 */
    curViewIndex: number = 0

    start () {

        Client.onWindowResize()
        cc.debug.setDisplayStats(false)

        console.warn("sssssss:", hex_md5("s"))
        this.edSecretKey.string = localStorage.getItem("stsecretKey")||""
        this.ed_createUser_merchant.string = localStorage.getItem("merAccount")||''

    }

    onToggleChangeView(sender, custdata) {
        this.ed_createUser_merchant.string = localStorage.getItem("merAccount")||''
        this.ed_getUrl_merchant.string = localStorage.getItem("merAccount")||''
        this.ed_check_merchant.string = localStorage.getItem("merAccount")||''
        this.ed_getbalance_merchant.string = localStorage.getItem("merAccount")||''
        this.ed_setbalance_merchant.string = localStorage.getItem("merAccount")||''
        
        
        custdata = +custdata
        this.curViewIndex = custdata

        for (let index = 0; index < this.listNodeView.length; index++) 
            this.listNodeView[index].active = index == custdata
    }


    onButtonSendRequest(sender) {

        const sek = this.edSecretKey.string
        if(sek == "") {
            alert("请输入商户秘钥")
            return
        }

        Data.stsecretKey = sek
        localStorage.setItem("stsecretKey", sek)

        switch (this.curViewIndex) {
            case 0:
             
                return this.sendCreateUser()
            case 1:
                return this.sendGetGameUrl()
            case 2:
                return this.sendCheckBalance()
            case 3:
                return this.sendGetBalance()
            case 4:
                return this.sendSetBalance()
         
        }

    }


    /** -------------------发送请求------------------- */
    sendCreateUser() {
        console.warn("sendCreateUser")

        const merAccount = this.ed_createUser_merchant.string
        const userId = this.ed_createUser_userId.string || Utils.createUserId()+""
        const params:CreateUser_Req = {
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("userId", userId)
     
        HttpClient.post<CreateUser_Res>(Api.create_user, params).then( resp => {

            alert(JSON.stringify(resp))
        })
    }
    
    sendGetGameUrl() {
        console.warn("sendGetGameUrl")
        const merAccount = this.ed_getUrl_merchant.string
        const userId = this.ed_getUrl_userId.string
        const gameId = Number(this.ed_getUrl_gameid.string)
        const params:GetGameURl_Req = {
            gameId,
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }
        
        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("userId", userId)
        localStorage.setItem("gameId", gameId+'')

        HttpClient.post<GetGameURl_Res>(Api.get_game_url, params).then( resp => {

            const _ = confirm(`获取成功，是否打开游戏?`)
            _ && cc.sys.openURL(resp.addr)
            
        })
    }
    
    sendCheckBalance() {
        console.warn("sendCheckBalance")
        const merAccount = this.ed_check_merchant.string
        const userId = this.ed_check_userId.string

        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("userId", userId)
        const params:CheckBalance_Req = {
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

        HttpClient.post<CheckBalance_Res>(Api.check_balance, params).then( resp => {
            alert(JSON.stringify(resp))
        })
        
    }
    
    sendGetBalance() {
        console.warn("sendGetBalance")
        const merAccount = this.ed_getbalance_merchant.string
        const userId = this.ed_getbalance_userId.string


        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("userId", userId)

        const params:GetBalance_Req = {
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

        HttpClient.post<GetBalance_Res>(Api.get_balance, params).then( resp => {
            alert(JSON.stringify(resp))
        })
        
    }
    
    sendSetBalance() {
        console.warn("sendSetBalance")
        const merAccount = this.ed_setbalance_merchant.string
        const userId = this.ed_setbalance_userId.string
        const balance = Number(this.ed_setbalance_count.string)


        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("userId", userId)

        const params:SetBalance_Req = {
            balance,
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

        HttpClient.post<SetBalance_Res>(Api.set_balance, params).then( resp => {
            alert(JSON.stringify(resp))
        })

    }



}
