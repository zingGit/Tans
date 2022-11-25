export default class Api {
    // POST- begin
    /** 检查余额 */
    public static check_balance = "/gi/v1/checkBalance"
    /** 带出余额 */
    public static get_balance = "/gi/v1/getBalance"
    /** 带入余额 */
    public static set_balance = "/gi/v1/setBalance" 
    /** 创建用户 */
    public static create_user = "/gi/v1/createUser"
    /** 获取客户端地址 */
    public static get_game_url = "/gi/v1/getAddr"
    //POST - end
}


// export const GAME_API_ADDR = "http://api.botixapi.xyz"
export const GAME_API_ADDR = "http://192.168.0.234:20083"
