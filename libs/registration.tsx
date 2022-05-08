interface ValidationField {
    type: string;
    value: number | string;
}

interface RegistrationField {
   name: string;
   type: string;
   validations: Array<ValidationField>;
   text?: string;
}

interface RegistrationStep {
    structure: Array<RegistrationField>
}


interface Validation {
    type: string;
    value: string | number | boolean;
}

export interface SelectOption {
    text: string;
    value: string;
}

interface Field {
    name: string;
    type: string;
    options?: Array<SelectOption>
    validations?: Array<Validation>
    text?: string;
}

export interface RenderedField {
    element: string;
    attrs: any;
}

export interface RenderedStep {
    fields: Array<RenderedField>;
}

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

export async function renderForm(app: string): Promise<Array<RenderedStep>> {

    const renderFieldAttributes = (field: Field) => {
        const attrs: any = {
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
            case 'select':
                attrs['options'] = field.options
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
                        attrs['pattern'] = '[a-zA-Z0-9\s]+'
                        attrs['title'] = 'Value should be digits (0 to 9) or alphabets (a to z).'
                    } else if (val.value === 'email') {
                        attrs['type'] = 'email'
                    }
                    break
                case 'required':
                    attrs['required'] = 'required'
                    break
                case 'min_length':
                    attrs['minLength'] = val.value.toString()
                    break
                case 'max_length':
                    attrs['maxLength'] = val.value.toString()
                    break
                default:
                    attrs[val.type] = val.value.toString()
            }
        })
        return attrs
    }

    const steps = await fetchSteps(app)

    let renderedSteps = steps.map(step => {
        return {
            fields: step.structure.map(field => {
                return {
                    element: field.type,
                    attrs: renderFieldAttributes(field)
                }
            })
        }
    })

    return renderedSteps
}