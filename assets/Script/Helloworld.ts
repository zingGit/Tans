import Api from "./api";
import { CreateUser_Req, CreateUser_Res, GetBalance_Req, GetBalance_Res, GetGameURl_Req, GetGameURl_Res, SetBalance_Req, SetBalance_Res } from "./api-interface";
import Client from "./client";
import Data from "./data";
import HttpClient from "./httpclient";
import Utils from "./utils";

const {ccclass, property} = cc._decorator;


const gamelist = [
     10001
    ,10003
    ,10004
    ,10005
    ,10006
    ,10007
    ,10008
]

@ccclass
export default class Helloworld extends cc.Component {

    @property(cc.Node)
    gamekind: cc.Node = null

    @property(cc.Node)
    nodeContent: cc.Node = null

    @property(cc.Label)
    label_userid: cc.Label = null


    start () {
        Client.onWindowResize()

        this.registerUser()
    }


    registerUser() {

        const _userid = localStorage.getItem('__userId__')
        if(_userid) {
            this.label_userid.string = _userid
            return this.initgamelist()
        }


        const merAccount = Data.merchantId
        const userId = Utils.createUserId()+""
        const params:CreateUser_Req = {
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

     
        HttpClient.post<CreateUser_Res>(Api.create_user, params).then( resp => {

            if(resp) {
                this.initgamelist()
                localStorage.setItem("merAccount", merAccount)
                localStorage.setItem("__userId__", userId)
                this.sendGetBalance(userId)
                this.label_userid.string = userId
            }
        })
    }

     
    sendGetGameUrl(gameId, userId) {
        console.warn("sendGetGameUrl")
        const merAccount = Data.merchantId
        const params:GetGameURl_Req = {
            gameId,
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }
        
        localStorage.setItem("merAccount", merAccount)
        localStorage.setItem("__userId__", userId)

        HttpClient.post<GetGameURl_Res>(Api.get_game_url, params).then( resp => {

            if(resp) {

                if(cc.sys.isMobile && cc.sys.isBrowser) {

                    window.location.href = resp.addr
                    return
                }
              
                cc.sys.openURL(resp.addr)
            }
            
        })
    }


    sendGetBalance(userId) {
        console.warn("sendGetBalance")
        const merAccount = Data.merchantId
        const balance = 10000000 * 10000
        const params:SetBalance_Req = {
            balance,
            /** 商户号 */
            merAccount,
            /** 随机数 */
            tax: Utils.getRandomInt(),
            userId,
        }

        HttpClient.post<SetBalance_Res>(Api.set_balance, params).then( resp => {
            this.initgamelist()
        })

    }

    initgamelist() {    

        this.nodeContent.removeAllChildren()

        gamelist.forEach( (gameid, index) => {
            const nodeitem = cc.instantiate(this.gamekind)
            this.nodeContent.addChild(nodeitem)
            const tsitem = nodeitem.getComponent("gamekind")
            tsitem.init(gameid, index, this)
        })
    }


    //点击回调
    onClickEnterGame(gameid: number) {

        console.warn("enter game:", gameid)
        const userId = localStorage.getItem('__userId__')
        this.sendGetGameUrl(gameid, userId)
    }

    // export const SERVER_TYPE_BACCARAT = 10001 //百家乐
    // export const SERVER_TYPE_DRAGONTIGER = 10003//龙虎斗
    // export const SERVER_TYPE_COLORDISH = 10004//色碟
    // export const SERVER_TYPE_TIREPLATE = 10005//轮盘
    // export const SERVER_TYPE_REDBLACK = 10006//红黑
    // export const SERVER_TYPE_FISHSHRIMP = 10007//鱼虾蟹
    // export const SERVER_TYPE_BRNN = 10008//百人牛牛


}
