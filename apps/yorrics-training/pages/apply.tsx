import styled from 'styled-components';
import { COLORS } from './constants';
import { Registration } from '../../../libs/registration/src';

const StyledContainer = styled.div`
    background: ${COLORS['form-bg']};
    padding: 50px 100px;
    border: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 15px 15px 1px $form-shadow, 15px 15px 1px 2px rgba(0, 0, 0, 1);
`;

function Apply() {
    return (
        <main>
            <StyledContainer>
                <h1>Please fill out the form to apply!</h1>
                <Registration app="yorrics"></Registration>
            </StyledContainer>
        </main>
    )
}

export default Apply