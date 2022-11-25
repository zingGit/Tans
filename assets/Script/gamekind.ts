// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   
    @property([cc.SpriteFrame])
    gamekindspf: Array<cc.SpriteFrame> = []

    main = null
    id = 0
    init (id, index, main) {
        this.main = main

        this.id = id

        this.node.getComponent(cc.Sprite).spriteFrame = this.gamekindspf[index]
    }




    onClick() {
        this.main && this.main.onClickEnterGame(this.id)
    }

    // update (dt) {}
}
