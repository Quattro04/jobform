import Link from 'next/link'
import styled from 'styled-components';
import { COLORS } from './constants';

const StyledContainer = styled.div`
  background: ${COLORS['form-bg']};
  padding: 50px 100px;
  border: 2px solid rgba(0, 0, 0, 1);
  box-shadow: 15px 15px 1px $form-shadow, 15px 15px 1px 2px rgba(0, 0, 0, 1);
`;

const StyledButton = styled.button`
  display: block;
  margin: 20px auto;
  line-height: $font-size * 2;
  padding: 0 20px;
  background: $form-shadow;
  letter-spacing: 2px;
  transition: 0.2s all ease-in-out;
  outline: none;
  border: 1px solid rgba(0, 0, 0, 1);
  box-shadow: 3px 3px 1px ${COLORS['form-shadow']},
    3px 3px 1px 1px rgba(0, 0, 0, 1);

  &:hover {
    background: rgba(0, 0, 0, 1);
    color: white;
    border: 1px solid rgba(0, 0, 0, 1);
    cursor: pointer;
  }
`;

export function Index() {
  return (
    <main>
      <StyledContainer>
        <h1>This is a new jobform framework website!</h1>
        <h2>Yorrics Training is a world-class agency, providing training on marketing skills for your company.</h2>
        <StyledButton>
            <Link href="/apply">
                <a>Apply</a>
            </Link>
        </StyledButton>
      </StyledContainer>
    </main>
  );
}

export default Index;
