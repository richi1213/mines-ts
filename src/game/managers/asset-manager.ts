import { Assets } from 'pixi.js';
import { ASSET_CONFIG } from '@config/asset-config';

export class AssetManager {
  async loadAllAssets() {
    for (const [bundleName, assetPaths] of Object.entries(ASSET_CONFIG)) {
      Assets.addBundle(bundleName, assetPaths);
      await Assets.loadBundle(bundleName);
    }
  }
  getTexture(path: string) {
    const texture = Assets.get(path);
    if (!texture) throw new Error(`Texture not found: ${path}`);
    return texture;
  }
}
