/**
 * Created by guopeng on 16/7/11.
 */

window.generateThreeDprPx = function(val) {
    const dpr = window.dpr || 1;
    if(dpr ===2){
        return 2*val + 'px';
    }else if(dpr === 3){
        return 3*val + 'px';
    }
    return val + 'px';
}
