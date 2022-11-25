import { GAME_API_ADDR } from "./api"
import Utils from "./utils"

export default class HttpClient {

    /**
     * 
     * @param route 路由
     * @param params 
     * @returns 
     */
    public static post<T>(route: string, params?: any): Promise<T|null> {

        const url = GAME_API_ADDR + route
        const sign = Utils.md5Sign(params)
        params.sign = sign

        return new Promise( resolve => {
            
            const timer = setTimeout(() => { resolve(null)
                console.warn("http post timeout...")
            }, 5000)

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                    const response = xhr.responseText

                    console.warn("http respones:",response)

                    clearInterval(timer)
                    const data = JSON.parse(response)
                    resolve && resolve(data.data)
                }
            };
    
            xhr.open("POST", url, true)
            xhr.timeout = 5000
            xhr.setRequestHeader("Content-Type", "application/json;charset=utf-8")
            const data  = JSON.stringify(params)

            console.warn("http request:", data)
            
            xhr.send(data);

        })

    }

}