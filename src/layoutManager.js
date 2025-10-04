// ========================================
// 5. レイアウト管理システム
// ========================================
function createLayoutManager(pageW_pt, pageH_pt) {
  const pxToPt = (px) => px * 0.75;
  const baseW_pt = pxToPt(CONFIG.BASE_PX.W),
    baseH_pt = pxToPt(CONFIG.BASE_PX.H);
  const scaleX = pageW_pt / baseW_pt,
    scaleY = pageH_pt / baseH_pt;
  const getPositionFromPath = (path) => path.split('.').reduce((obj, key) => obj[key], CONFIG.POS_PX);

  return {
    scaleX,
    scaleY,
    pageW_pt,
    pageH_pt,
    pxToPt,
    getRect: (spec) => {
      const pos = typeof spec === 'string' ? getPositionFromPath(spec) : spec;
      let left_px = pos.left;
      if (pos.right !== undefined && pos.left === undefined) {
        left_px = CONFIG.BASE_PX.W - pos.right - pos.width;
      }
      
      // left_px が undefined の場合でも、0 を返すようにする
      if (left_px === undefined && pos.right === undefined) {
        Logger.log(`Warning: Neither left nor right defined for spec: ${JSON.stringify(spec)}`);
        left_px = 0; // デフォルト値
      }
      
      return {
        left: left_px !== undefined ? pxToPt(left_px) * scaleX : 0,
        top: pos.top !== undefined ? pxToPt(pos.top) * scaleY : 0,
        width: pos.width !== undefined ? pxToPt(pos.width) * scaleX : 0,
        height: pos.height !== undefined ? pxToPt(pos.height) * scaleY : 0,
      };
    }
  };
}

