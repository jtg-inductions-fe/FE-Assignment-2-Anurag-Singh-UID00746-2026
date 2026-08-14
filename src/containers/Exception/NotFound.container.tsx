import { EXCEPTION_STATE_TYPES } from '@components/constants';
import { ExceptionState } from '@components/ExceptionState';
import { Container } from './Exception.styles';

export const NotFoundPage = () => (
    <Container>
        <ExceptionState
            type={EXCEPTION_STATE_TYPES.EMPTY}
            title="Page not found"
            description="The page you are trying to reach is not available. Please check the URL."
        />
    </Container>
);
