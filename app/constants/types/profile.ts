interface ProfileData {
  name: string;
  phone: string;
  address: string;
  email: string;
}
interface ImageAsset {
  fileName: string;
  fileSize: number;
  height: number;
  originalPath: string;
  type: string;
  uri: string;
  width: number;
}

interface ImageResponse {
  assets: ImageAsset[];
}
export type {ProfileData, ImageAsset, ImageResponse};
