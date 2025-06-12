
interface CapacitorGlobal {
  platform: string;
  isNativePlatform(): boolean;
}

declare global {
  interface Window {
    Capacitor?: CapacitorGlobal;
  }
}

export {};
