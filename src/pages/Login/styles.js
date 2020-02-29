import styled from 'styled-components';

import { Form } from "tabler-react";

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

export const FormGroup = styled(Form.Group)`
  width: 100%;
`;
