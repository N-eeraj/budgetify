import { Throttle } from '@nestjs/throttler';

export const ShortThrottle = () =>
  Throttle({
    default: {
      limit: 3,
      ttl: 1000,
    },
  });

export const MediumThrottle = () =>
  Throttle({
    default: {
      limit: 20,
      ttl: 10000,
    },
  });

export const LongThrottle = () =>
  Throttle({
    default: {
      limit: 100,
      ttl: 60000,
    },
  });