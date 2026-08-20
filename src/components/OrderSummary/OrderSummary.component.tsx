import { alpha, Divider, Typography } from '@mui/material';
import {
    ItemsSection,
    SectionHeader,
    ItemRow,
    ItemInfo,
    TotalSection,
} from './OrderSummary.styles';
import { theme } from '@theme/index';
import { OrderSummaryProps } from './OrderSummary.types';

export const OrderSummaryCard = (props: OrderSummaryProps) => {
    return (
        <ItemsSection>
            <SectionHeader>
                <Typography
                    variant="subtitle1"
                    fontWeight={theme.typography.fontWeightBold}
                    color={theme.palette.common.black}
                >
                    ORDER ITEMS
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {props.order.items.length}{' '}
                    {props.order.items.length > 1 ? 'items' : 'item'}
                </Typography>
            </SectionHeader>

            <Divider />

            {props.order.items.map((item) => (
                <ItemRow key={item.id}>
                    <ItemInfo>
                        <Typography
                            variant="body1"
                            fontWeight={theme.typography.fontWeightBold}
                            color={alpha(theme.palette.common.black, 0.7)}
                        >
                            {item.name.toUpperCase()} × {item.quantity}
                        </Typography>
                    </ItemInfo>

                    <Typography
                        variant="body1"
                        fontWeight={theme.typography.fontWeightMedium}
                    >
                        ₹{item.price * item.quantity}
                    </Typography>
                </ItemRow>
            ))}

            <TotalSection>
                <Typography
                    variant="body1"
                    fontWeight={theme.typography.fontWeightBold}
                    color={theme.palette.common.black}
                    letterSpacing={2}
                >
                    TOTAL
                </Typography>

                <Typography variant="h6" color="primary">
                    ₹{props.order.totalPrice}
                </Typography>
            </TotalSection>
        </ItemsSection>
    );
};
