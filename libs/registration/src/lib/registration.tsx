import { useState, useEffect } from 'react'
import styles from './registration.module.css';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface RegistrationProps {
    app: string;
}

interface SelectOption {
    text: string;
    value: string;
}

interface ValidationField {
    type: string;
    value: number | string;
}

interface RegistrationField {
   name: string;
   type: string;
   validations: Array<ValidationField>;
   text?: string;
   options?: Array<SelectOption>
}

interface RegistrationStep {
    structure: Array<RegistrationField>
}

interface RegistrationFieldAttributes {
    id: string;
    name: string;
    type?: string;
    value?: string;
    pattern?: string;
    required?: boolean;
    title?: string;
    minLength?: number;
    maxLength?: number;
}

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

async function fetchSteps(app: string): Promise<Array<RegistrationStep>> {
    const res = await fetch(`http://localhost:8080/${app}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const response = await res.json()

    if (response.errors || !response.form_steps) {
        console.error(response.errors)
        throw new Error('Failed to fetch registration fields')
    }

    const formSteps = response.form_steps

    return formSteps
}

export function Registration(props: RegistrationProps) {

    const renderFieldAttributes = (field: RegistrationField): RegistrationFieldAttributes => {
        const attrs: RegistrationFieldAttributes = {
            id: field.name,
            name: field.name
        };

        switch (field.type) {
            case 'input_text':
                attrs['type'] = 'text'
                break
            case 'input_email':
                attrs['type'] = 'email'
                break
            case 'button_submit':
            case 'button_next_step':
            case 'button_previous_step':
                attrs['type'] = 'submit'
                attrs['value'] = field.text
                break
        }
    
        if (!field.validations) return attrs
        field.validations.forEach(val => {
            switch(val.type) {
                case 'format':
                    if (val.value === 'alphanumeric') {
                        attrs['pattern'] = '[a-zA-Z0-9]+'
                        attrs['title'] = 'Value should be digits (0 to 9) or alphabets (a to z).'
                    } else if (val.value === 'email') {
                        attrs['type'] = 'email'
                    }
                    break
                case 'required':
                    attrs['required'] = true
                    break
                case 'min_length':
                    attrs['minLength'] = parseInt(val.value.toString())
                    break
                case 'max_length':
                    attrs['maxLength'] = parseInt(val.value.toString())
                    break
            }
        })
        return attrs
    }

    const renderField = (field: RegistrationField, index: number) => {
        switch (field.type) {
            case 'input_text':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.name}:</StyledLabel>
                        <StyledInput {...renderFieldAttributes(field)} />
                    </StyledField>
                )
            case 'input_email':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.name}:</StyledLabel>
                        <StyledInput {...renderFieldAttributes(field)} />
                    </StyledField>
                )
            case 'textarea':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.name}:</StyledLabel>
                        <br />
                        <textarea {...renderFieldAttributes(field)} />
                    </StyledField>
                )
            case 'select':
                return (
                    <StyledField key={index}>
                        <StyledLabel>{field.name}:</StyledLabel>
                        <select id={field.name} name={field.name}>
                            {field.options && field.options.map((option: SelectOption, j: number) => {
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
                        <StyledInput {...renderFieldAttributes(field)} onClick={() => setCurrentStep(0)} />
                    </StyledField>
                )
            case 'button_next_step':
                return (
                    <StyledField key={index}>
                        <StyledButton id={field.name} name={field.name} type="button" onClick={() => setCurrentStep(currentStep+1)}>{field.text}</StyledButton>
                    </StyledField>
                )
            case 'button_previous_step':
                return (
                    <StyledField key={index}>
                        <StyledButton id={field.name} name={field.name} type="button" onClick={() => setCurrentStep(currentStep-1)}>{field.text}</StyledButton>
                    </StyledField>
                )
            default:
                return <div></div>
        }
    }

    const [steps, setSteps] = useState(Array<RegistrationStep>());
    const [currentStep, setCurrentStep] = useState<number>(0);
    
    useEffect(() => {
        if (!steps || steps.length === 0) {
            getSteps();
        }
    });

    const getSteps = async () => {
        const st = await fetchSteps(props.app);
        setSteps(st)
    };

    return (
        <div className={styles['container']}>
            <StyledForm action="http://mockbin.com/request?foo=bar&foo=baz" method="POST">
                {steps.map((step: RegistrationStep, i: number) => {
                    return (
                        <div style={{ display: currentStep === i ? 'block' : 'none' }} key={i}>
                            {step.structure.map((field: RegistrationField, index: number) => renderField(field, (i+1)*(index+1)))}
                        </div>
                    )
                })}
            </StyledForm>
        </div>
    );
}

export default Registration;
