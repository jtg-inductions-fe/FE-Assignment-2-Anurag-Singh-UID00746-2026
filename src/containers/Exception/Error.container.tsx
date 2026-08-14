import { ExceptionState } from '@components/ExceptionState';
import { Container } from './Exception.styles';

export const ErrorPage = () => (
    <Container>
        <ExceptionState
            title="Something went wrong"
            description="This page is temporarily unavailable"
        />
    </Container>
);
