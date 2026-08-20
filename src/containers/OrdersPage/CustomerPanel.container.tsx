import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';

import { TimelineCard, Timeline } from './Orders.styles';
import { theme } from '@theme/index';
import { CustomerOrderPanelProps } from './order.types';
import { orderStatusSteps } from './order.constants';
import { OrderTimelineItem } from './OrderTimelineItem.container';

export const CustomerOrderPanel = ({ order }: CustomerOrderPanelProps) => {
    const isRejected = order.status.trim().toUpperCase() === 'REJECTED';

    const currentStepIndex = orderStatusSteps.findIndex(
        (step) => step === order.status.trim().toUpperCase(),
    );

    return (
        <TimelineCard>
            <MuiTypography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
            >
                ORDER STATUS
            </MuiTypography>

            {isRejected ? (
                <Timeline>
                    <OrderTimelineItem label="PENDING" completed />

                    <OrderTimelineItem label="REJECTED" rejected />
                </Timeline>
            ) : (
                <Timeline>
                    <OrderTimelineItem
                        label="PENDING"
                        active={currentStepIndex === 0}
                        completed={currentStepIndex > 0}
                    />

                    <OrderTimelineItem
                        label="ACCEPTED"
                        active={currentStepIndex === 1}
                        completed={currentStepIndex > 1}
                    />

                    <OrderTimelineItem
                        label="PREPARING"
                        active={currentStepIndex === 2}
                        completed={currentStepIndex > 2}
                    />

                    <OrderTimelineItem
                        label="OUT FOR DELIVERY"
                        active={currentStepIndex === 3}
                        completed={currentStepIndex > 3}
                    />

                    <OrderTimelineItem
                        label="DELIVERED"
                        active={currentStepIndex === 4}
                        completed={currentStepIndex >= 4}
                    />
                </Timeline>
            )}

            {isRejected && order.rejectionReason && (
                <MuiBox mt={5}>
                    <MuiTypography
                        component="span"
                        variant="caption"
                        color="error.main"
                        fontWeight={theme.typography.fontWeightBold}
                        mb={0.25}
                    >
                        REASON FOR REJECTION
                    </MuiTypography>

                    <MuiTypography
                        component="span"
                        variant="body2"
                        color="primary.main"
                        display="block"
                    >
                        {order.rejectionReason}
                    </MuiTypography>
                </MuiBox>
            )}
        </TimelineCard>
    );
};
