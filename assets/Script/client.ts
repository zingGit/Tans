export default class Client {

    /**
     * @method:  
     * @param {type}  
     * @return:  void
     */
     static onWindowResize () {
        if(cc.sys.isBrowser /*&& (cc.sys.os=="Windows" || cc.sys.os=="OS X")*/) {
        
          if(CC_BUILD) {  
            cc.view.setResizeCallback(call => {
            
              const wVisibleWidth = document.documentElement.clientWidth;
              const wVisibleHeight = document.documentElement.clientHeight;
              const wResoluSizeWidth = cc.view.getDesignResolutionSize().width;
              const wResoluSizeHeight = cc.view.getDesignResolutionSize().height;
            
              const fClientRatio = wVisibleWidth/wVisibleHeight;
              const fDsignRatio = wResoluSizeWidth/wResoluSizeHeight;
            
              const canvas = cc.director.getScene().getChildByName("Canvas");
              const Canvas = canvas.getComponent(cc.Canvas);
            
              if(fClientRatio <= fDsignRatio) {  
                  Canvas.fitHeight = false;
                  Canvas.fitWidth = true;
              }
              else{

                  Canvas.fitHeight = true;
                  Canvas.fitWidth = false;
              }

            })
        }
        };
    
      }

      static getWindowSizeScalRatio() {
    
        const wVisibleWidth = document.documentElement.clientWidth;
        const wVisibleHeight = document.documentElement.clientHeight-80;
        const wResoluSizeWidth = cc.view.getDesignResolutionSize().width;
        const wResoluSizeHeight = cc.view.getDesignResolutionSize().height;
        const fScale1 = wVisibleWidth/wResoluSizeWidth;
        const fScale2 = wVisibleHeight/wResoluSizeHeight;
        const fScale3 = fScale1<fScale2?fScale1:fScale2;
        return [wResoluSizeWidth*fScale3, wResoluSizeHeight*fScale3];
    
      }
}