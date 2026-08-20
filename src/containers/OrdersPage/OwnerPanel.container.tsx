import {
    TimelineCard,
    Actions,
    RejectionModal,
    ModalSurface,
    ActionButtons,
} from './Orders.styles';

import { theme } from '@theme/index';
import { OwnerOrderPanelProps, rejectionFormData } from './order.types';
import { Controller, useForm } from 'react-hook-form';
import { rejectionSchema } from './order.validation';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import { Chip } from '@components/Chip';
import { Fragment, useState } from 'react';
import { Typography as MuiTypography } from '@mui/material';

export const OwnerOrderPanel = (props: OwnerOrderPanelProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [reason, setReason] = useState('');
    const maxLength = 150;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<rejectionFormData>({
        resolver: yupResolver(rejectionSchema),
        defaultValues: {
            reason: '',
        },
    });

    /**
     * Submits the text explanation for rejecting an order.
     * Clears the input field state, resets the form validation engine, and closes the popup.
     * @param data - The form data containing the rejection reason string text.
     */
    const onRejectSubmit = (data: rejectionFormData) => {
        const trimmedReason = data.reason.trim();

        props.onStatusChange(props.order, 'Rejected', trimmedReason);
        setReason('');
        reset({ reason: '' });
        handleClose();
    };

    return (
        <TimelineCard>
            <MuiTypography
                variant="subtitle1"
                fontWeight={theme.typography.fontWeightBold}
                color={theme.palette.common.black}
                letterSpacing={1.5}
            >
                MANAGE ORDER
            </MuiTypography>

            <MuiTypography variant="body2" color="text.secondary" mt={1}>
                Current status : {props.order.status.toUpperCase()}
            </MuiTypography>

            <Actions>
                {props.order.status === 'Pending' && (
                    <Fragment>
                        <Button
                            variant="contained"
                            onClick={() =>
                                props.onStatusChange(props.order, 'Accepted')
                            }
                        >
                            Accept
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleOpen}
                        >
                            Reject
                        </Button>
                        <RejectionModal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <ModalSurface
                                component="form"
                                onSubmit={handleSubmit(onRejectSubmit)}
                            >
                                <MuiTypography
                                    id="modal-modal-title"
                                    variant="h6"
                                >
                                    Reason for rejection ?
                                </MuiTypography>
                                <Controller
                                    name="reason"
                                    control={control}
                                    render={({ field }) => (
                                        <InputField
                                            {...field}
                                            type="text"
                                            rows={5}
                                            multiline
                                            placeholder="Enter reason for rejecting the order"
                                            required
                                            value={reason}
                                            onChange={(e) => {
                                                field.onChange(e);
                                                setReason(e.target.value);
                                            }}
                                            error={Boolean(errors.reason)}
                                            helperText={
                                                errors.reason?.message ??
                                                `${reason.length} / ${maxLength}`
                                            }
                                            slotProps={{
                                                htmlInput: { maxLength: 150 },
                                            }}
                                        />
                                    )}
                                />
                                <ActionButtons>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        type="button"
                                        onClick={handleClose}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="error"
                                        type="submit"
                                    >
                                        Reject
                                    </Button>
                                </ActionButtons>
                            </ModalSurface>
                        </RejectionModal>
                    </Fragment>
                )}

                {props.order.status === 'Accepted' && (
                    <Button
                        variant="contained"
                        onClick={() =>
                            props.onStatusChange(props.order, 'Preparing')
                        }
                    >
                        Start Preparing
                    </Button>
                )}

                {props.order.status === 'Preparing' && (
                    <Button
                        variant="contained"
                        onClick={() =>
                            props.onStatusChange(
                                props.order,
                                'Out for Delivery',
                            )
                        }
                    >
                        Out for Delivery
                    </Button>
                )}

                {props.order.status === 'Out for Delivery' && (
                    <Button
                        variant="contained"
                        onClick={() =>
                            props.onStatusChange(props.order, 'Delivered')
                        }
                    >
                        Mark Delivered
                    </Button>
                )}

                {props.order.status === 'Rejected' && (
                    <Chip label="Order Rejected" color="error" />
                )}

                {props.order.status === 'Delivered' && (
                    <Chip label="Order Completed" color="success" />
                )}
            </Actions>
        </TimelineCard>
    );
};
