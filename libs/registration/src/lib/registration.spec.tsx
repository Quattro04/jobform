import { render } from '@testing-library/react';

import Registration from './registration';

describe('Registration', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Registration app="borix" />);
    expect(baseElement).toBeTruthy();
  });
});
