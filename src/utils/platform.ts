import { Capacitor } from '@capacitor/core';

/**
 * Centralized platform detection utilities using official Capacitor APIs.
 * These are more reliable than window.Capacitor.platform checks.
 */

export const isNativePlatform = (): boolean => {
  const isNative = Capacitor.isNativePlatform();
  console.log('Platform Detection - isNativePlatform:', isNative);
  return isNative;
};

export const getPlatform = (): 'ios' | 'android' | 'web' => {
  const platform = Capacitor.getPlatform() as 'ios' | 'android' | 'web';
  console.log('Platform Detection - getPlatform:', platform);
  return platform;
};

export const isIOS = (): boolean => {
  return Capacitor.getPlatform() === 'ios';
};

export const isAndroid = (): boolean => {
  return Capacitor.getPlatform() === 'android';
};
