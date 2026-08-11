/**
 * Static list of standard sequential milestones representing an order's lifecycle steps.
 * Used for building linear tracking status bars or progress timelines.
 */
export const orderStatusSteps = [
    'PENDING',
    'ACCEPTED',
    'PREPARING',
    'OUT FOR DELIVERY',
    'DELIVERED',
] as const;
