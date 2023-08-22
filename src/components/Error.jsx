import styled from "styled-components";

const Texto = styled.div`
  border: solid 1px #fa3b3b;
  color: #fffce1;
  padding: 10px;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
`;

const Error = ({ children }) => {
  return <Texto>{children}</Texto>;
};

export default Error;
