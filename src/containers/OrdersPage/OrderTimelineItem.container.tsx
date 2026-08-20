import { theme } from '@theme/index';
import { OrderTimelineItemProps } from './order.types';
import {
    TimelineDot,
    TimelineDotActive,
    TimelineDotCompleted,
    TimelineDotRejected,
    TimelineItem,
} from './Orders.styles';
import { Box as MuiBox, Typography as MuiTypography } from '@mui/material';

export const OrderTimelineItem = (props: OrderTimelineItemProps) => {
    const { active = false, completed = false, rejected = false } = props;

    return (
        <TimelineItem>
            {rejected ? (
                <TimelineDotRejected />
            ) : completed ? (
                <TimelineDotCompleted />
            ) : active ? (
                <TimelineDotActive />
            ) : (
                <TimelineDot />
            )}

            <MuiBox sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <MuiTypography
                    variant="body2"
                    fontWeight={
                        active || completed || rejected
                            ? theme.typography.fontWeightBold
                            : theme.typography.fontWeightRegular
                    }
                    color={
                        rejected
                            ? 'error'
                            : active || completed
                              ? 'text.primary'
                              : 'text.secondary'
                    }
                >
                    {props.label}
                </MuiTypography>

                {props.helperText && (
                    <MuiTypography
                        variant="caption"
                        color="error.main"
                        sx={{ lineHeight: 1.4, maxWidth: 220 }}
                    >
                        {props.helperText}
                    </MuiTypography>
                )}
            </MuiBox>
        </TimelineItem>
    );
};
