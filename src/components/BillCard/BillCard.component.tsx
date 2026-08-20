import { theme } from '@theme/index';
import { BillCardProps } from './BillCard.types';
import {
    Divider as MuiDivider,
    Typography as MuiTypography,
} from '@mui/material';
import { BillCardWrapper, BillRow, BillRowWrapper } from './BillCard.styles';

export const BillCard = (props: BillCardProps) => {
    return (
        <BillCardWrapper>
            <MuiTypography variant="subtitle1" color="common.black">
                BILL DETAILS
            </MuiTypography>

            <BillRowWrapper>
                <BillRow>
                    <MuiTypography variant="body2" color="text.secondary">
                        Subtotal
                    </MuiTypography>
                    <MuiTypography variant="body2" color="common.black">
                        ₹{props.subtotal}
                    </MuiTypography>
                </BillRow>

                <BillRow>
                    <MuiTypography variant="body2" color="text.secondary">
                        Delivery Fee
                    </MuiTypography>
                    <MuiTypography variant="body2" color="success.main">
                        FREE
                    </MuiTypography>
                </BillRow>
            </BillRowWrapper>

            <MuiDivider />

            <BillRow>
                <MuiTypography
                    variant="subtitle1"
                    color="common.black"
                    fontWeight={theme.typography.fontWeightBold}
                >
                    TO PAY
                </MuiTypography>

                <MuiTypography
                    variant="subtitle1"
                    color="common.black"
                    fontWeight={theme.typography.fontWeightBold}
                    letterSpacing={2}
                >
                    ₹{props.subtotal}
                </MuiTypography>
            </BillRow>
        </BillCardWrapper>
    );
};
