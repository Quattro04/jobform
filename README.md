# Oryx Gaming front-end web developer assignment

We have pre-built a monorepo with which we can build apps that collect people's applications for work.
The only thing they have in common is having job application forms, that can differ in terms of what data they collect.
Some of them have simple, one page forms. However, some companies wish to have more complex data collection
flows, where their applications have multiple steps. This is where we need your help. We need a skilled web developer
like you to help us be able to build different forms for our clients' websites.

## Meet company A: Borix Taming

Borix Taming is a well established firm, operating in the business of taming wild animals to become pets.
As a well established company, they want a separate web application, that collects job applications from people
that wish to apply for a position at the company.

Their requirements for the app:

### Routes:

| Route  | Features                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| /      | Greeting page with some basic information about the company (provided in the appendix below). Should have a button that leads to the apply form. |
| /apply | Displays a one step, basic form with fields and validations.                                                                                     |

### Application form specification:

| Field                  | Element Type     | Validation                                            |
| ---------------------- | ---------------- | ----------------------------------------------------- |
| first name             | text input       | min length: 3, max length: 50, alphanumeric, required |
| last name              | text input       | min length: 3, max length: 70, alphanumeric, required |
| email                  | email text input | min length: 3, max length: 70, email format, required |
| motivational paragraph | textarea         | min length: 100, max length: 1000                     |
| apply action           | button           | all fields need to have valid data                    |

The apply button should submit the data to some dummy endpoint, but only if all of the fields are valid.
Otherwise, display an alert, saying which fields need to be edited or add errors under fields. For the sake of this assignment,
let's say we will submit the POST request to the url https://borixtaming.org/api/apply.

## Meet company B: Yorrics Training

Yorrics Training is a well established firm, operating in the business of teaching marketing skills.
As a well established company, they want a separate web application, that collects job applications from people
that wish to apply for a position at the company.

Their requirements for the app:

### Routes:

| Route  | Features                                                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| /      | Greeting page with some basic information about the company (provided in the appendix below). Should have a button that leads to the apply form. |
| /apply | Displays a two step form with fields and validations.                                                                                            |

_Step 1_
| Field | Element Type | Validation |
|------------------------------------------|------------------|-------------------------------------------------------|
| first name | text input | min length: 3, max length: 50, alphanumeric, required |
| last name | text input | min length: 3, max length: 70, alphanumeric, required |
| email | email text input | min length: 3, max length: 70, email format, required |
| next step action (switches to next step) | button | fields need to be valid to proceed to next step |

_Step 2_
| Field | Element Type | Validation |
|-----------------------------------------|-------------------------------------------|-------------------------------------------------|
| motivational paragraph | textarea | min length: 100, max length: 1000, alphanumeric |
| degree of education | select (you can come up with the content) | required |
| back action (goes to the previous step) | button | / |
| apply action | button | all fields need to have valid data |

A step here is a collection of fields. When we change the step, that means that the current form fields
get replaced with the fields from the next step.
However, when going to the previous fields, the data, entered in those fields should still persist there.

The apply button should submit the data to some dummy endpoint, but only if all of the fields are valid.
Otherwise, display an alert, saying which fields need to be edited or add errors under fields. For the sake of this assignment,
let's say we will submit the POST request to the url https://yorrics.training/api/apply.

## The catch

These companies are known to change their minds quite often. To make us developers mad,
they constantly require us to change the order of the fields or add some new fields to the
forms. What we decided to do is create a URL endpoint, from which we get the information
about the configuration of the registration form (which fields it should have, their types and
validation requirements). From that endpoint, we wish to dynamically render the form fields,
without us having to directly hardcode the inputs onto specific pages on the websites.

## The end solution you should create

- Create a library, that would take our configuration objects as inputs and render out forms based on that information.
  - In the project structure, you'll see the folder libs, where the library should live. Then, you can use it in both apps.
- Make sure that each site for each client has a homepage and the appropriate apply page with the forms and field validations working. At the end, the submit button should submit the form to the stated URL routes, even if they do not work.
- You should write at least 5 tests.
- Add an e2e test for the basic happy flow of the application form for the Borix Taming website.
- (Optional) Write an nx generator for new apps with homepages and an apply route with forms.
- (Optional) If the configuration of the form changes in the fake-backend.json file, the frontend should rerender that form, if you lose and regain focus of the page (without having to refresh it).
- (Optional) Extract UI components for websites into a UI component library.

You should provide a .zip file of your repository with the code. If you've used git, include the .git folder as well. Do not share this assignment or the code for your assignment publicly or with anyone else.

## Running necessary things

After running `npm install`, you should be able to run the following command:

```sh
npm run start-backend
```

If you have trouble running it, try installing the required package globally, like: `npm install json-server -g`.

The `start-backend` command will expose the URL endpoints for you to get the form configuration from.

The URL endpoints for the sites are http://localhost:8080/borix and http://localhost:8080/yorrics.

That data should serve as the information for the registration form building library
about what to render in the form.

To run other important commands you might need to globally install the `nx` CLI, or you can always prefix it with `npx`, like: `npx nx ...`.

If you wish to locally serve an application (website), you can use the command `nx serve {project}`. For example. to serve the borix-taming app, you need to call `nx serve borix-taming`.

To run tests, you can use the `nx test {project}` command.

The same applies to the `nx lint`, `nx e2e` and all other similar nx cli commands.

The projects (libs, applications) are listed in the workspace.json file.

More on the usage of the commands is available in the nx documentation online.
`

## Appendix A: Information about Borix Taming

Borix Taming is a leading wild-animal-to-pet conversion firm, established in the 1900s.

## Appendix B: Information about Yorrics Training

Yorrics Training is a world-class agency, providing training on marketing skills for your company.

## More

For more questions about the assignment (or in case something is unclear), do not hesitate your Oryx Gaming contact. We'll be happy to answer.
