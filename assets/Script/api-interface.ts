
/** 创建用户 请求 */
export interface CreateUser_Req {
    /** 商户号 */
    merAccount: string,
    sign?: string,
    /** 随机数 */
    tax: number,
    userId: string,
}

/** 创建用户 响应 */
export interface CreateUser_Res {
    tax: number,
    userId: string,
}


/** 获取客户端地址 请求 */
export interface GetGameURl_Req {
    gameId: number,
    /** 商户号 */
    merAccount: string,
    sign?: string,
    /** 随机数 */
    tax: number,
    userId: string,
}

/** 获取客户端地址 响应 */
export interface GetGameURl_Res {
    addr: string,
    tax: number,
    userId: string,
}


/** 检查余额 请求 */
export interface CheckBalance_Req {
    /** 商户号 */
    merAccount: string,
    sign?: string,
    /** 随机数 */
    tax: number,
    userId: string,
}
/** 检查余额 响应 */
export interface CheckBalance_Res {
    balance: number,
    /** 余额是否在游戏中锁定 */
    isLock: boolean,
    tax: number,
    userId: string,
}


/** 带出余额 请求 */
export interface GetBalance_Req {
    /** 商户号 */
    merAccount: string,
    sign?: string,
    /** 随机数 */
    tax: number,
    userId: string,
}

/** 带出余额 响应 */
export interface GetBalance_Res {
    balance: number,
    tax: number,
    userId: string,
}


/** 带入余额 请求 */
export interface SetBalance_Req {
    balance: number,
    /** 商户号 */
    merAccount: string,
    sign?: string,
    /** 随机数 */
    tax: number,
    userId: string,
}

/** 带入余额 响应 */
export interface SetBalance_Res {
    tax: number,
    userId: string,
}

