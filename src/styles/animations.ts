export const particleConfig = {
  particleCount: 30,
  minSize: 1,
  maxSize: 5,
  minOpacity: 0.1,
  maxOpacity: 0.6,
  minVelocity: 0.1,
  maxVelocity: 0.4,
  updateInterval: 50, // milliseconds
};

export const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};
