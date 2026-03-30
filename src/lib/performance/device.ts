type MemoryNavigator = Navigator & {
  deviceMemory?: number;
};

const getDeviceMemory = () => {
  return (navigator as MemoryNavigator).deviceMemory ?? 8;
};

const getHardwareThreads = () => {
  return navigator.hardwareConcurrency ?? 8;
};

const hasFinePointer = () => {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
};

export const hasDesktopMotionBudget = () => {
  return window.innerWidth >= 1280 && getHardwareThreads() >= 8 && getDeviceMemory() >= 8;
};

export const canRenderInteractiveHero = () => {
  return hasDesktopMotionBudget() && hasFinePointer();
};

export const canRenderInteractiveTechScene = () => {
  return window.innerWidth >= 1100 && getHardwareThreads() >= 6 && getDeviceMemory() >= 6;
};
