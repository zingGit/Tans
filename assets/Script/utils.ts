import Data from "./data"

export default class Utils {

    public static createUserId() {

        return Date.now() /1000 |0 + this.getRandomInt()
    }


    /**
     * @method 获取随机数
     * @param min 
     * @param max 
     * @returns 
     */
     public static getRandomInt() {
        const max = 10000000
        const min = 1
        return ( Math.random() * (max - min) + min )| 0
    }


    /**
     * @method 参数签名
     * @param data 
     * @returns 
     */
    public static md5Sign(data) {

        let params = ''
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                params += `${key}=${value}&`
            });
            params = params.slice(0, -1);
        }

        params += `&${Data.stsecretKey}`
        console.warn(`md5:${params}`)

        return hex_md5(params)
    }


}