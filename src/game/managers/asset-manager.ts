import { Assets } from 'pixi.js';
import { ASSET_CONFIG } from '@config/asset-config';

export class AssetManager {
  async loadAllAssets() {
    for (const [bundleName, assetPaths] of Object.entries(ASSET_CONFIG)) {
      Assets.addBundle(bundleName, assetPaths);
      await Assets.loadBundle(bundleName);
    }
  }

  async getTexture(path: string) {
    return await Assets.load(path);
  }
}
