import { useState } from 'react'
import { renderForm, RenderedField, RenderedStep, SelectOption } from '../../../libs/registration'
import styled from 'styled-components';
import { COLORS } from './constants';

const StyledContainer = styled.div`
    background: ${COLORS['form-bg']};
    padding: 50px 100px;
    border: 2px solid rgba(0, 0, 0, 1);
    box-shadow: 15px 15px 1px $form-shadow, 15px 15px 1px 2px rgba(0, 0, 0, 1);
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 20px 0;
`;

const StyledField = styled.div`
    margin: 10px 0;
`;

const StyledLabel = styled.label`
    margin-right: 10px;
`;

const StyledInput = styled.input`
    padding: 5px 10px;
`;

const StyledButton = styled.button`
    padding: 5px 10px;
`;

interface Props {
    strSteps: string;
}

function Apply(props: Props) {

    const renderFieldHTML = (field: RenderedField, index: number) => {
        switch (field.element) {
            case 'input_text':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.attrs.name}:</StyledLabel>
                        <StyledInput {...field.attrs} />
                    </StyledField>
                )
            case 'input_email':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.attrs.name}:</StyledLabel>
                        <StyledInput {...field.attrs} />
                    </StyledField>
                )
            case 'textarea':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.attrs.name}:</StyledLabel>
                        <br />
                        <textarea {...field.attrs} />
                    </StyledField>
                )
            case 'select':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.attrs.name}:</StyledLabel>
                        <select id={field.attrs.id} name={field.attrs.name}>
                            {field.attrs.options.map((option: SelectOption, j: number) => {
                                return (
                                    <option key={j} value={option.value}>{option.text}</option>
                                )
                            })}
                        </select>
                    </StyledField>
                )
            case 'button_submit':
                return (
                    <StyledField key={index}>
                        <StyledInput {...field.attrs} onClick={() => setCurrentStep(0)} />
                    </StyledField>
                )
            case 'button_next_step':
                return (
                    <StyledField key={index}>
                        <StyledButton {...field.attrs} onClick={() => setCurrentStep(currentStep+1)}>{field.attrs.value}</StyledButton>
                    </StyledField>
                )
            case 'button_previous_step':
                return (
                    <StyledField key={index}>
                        <StyledButton {...field.attrs} onClick={() => setCurrentStep(currentStep-1)}>{field.attrs.value}</StyledButton>
                    </StyledField>
                )
            default:
                return <div></div>
        }
    }

    const renderedSteps = JSON.parse(props.strSteps)
    const [currentStep, setCurrentStep] = useState<number>(0);

    return (
        <main>
            <StyledContainer>
                <h1>Please fill out the form to apply!</h1>

                <StyledForm action="http://mockbin.com/request?foo=bar&foo=baz" method="POST">
                    {renderedSteps.map((step: RenderedStep, i: number) => {
                        return (
                            <div style={{ display: currentStep === i ? 'block' : 'none' }} key={i}>
                                {step.fields.map((field: RenderedField, index: number) => renderFieldHTML(field, (i+1)*(index+1)))}
                            </div>
                        )
                    })}
                </StyledForm>
            </StyledContainer>
        </main>
    )
}
  
export async function getStaticProps() {
    const steps = await renderForm('borix')

    if (!steps) {
      return {
        notFound: true,
      }
    }

    const strSteps = JSON.stringify(steps);

    return {
      props: { strSteps }, 
    }
}

export default Apply