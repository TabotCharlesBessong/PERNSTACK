import styled from "styled-components";

const Signup = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > form {
    background-color: ${({ theme }) => theme.elevation_1};
    border-radius: 5px;
    height: 400px;
    width: 90%;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    box-shadow: ${({ theme }) => theme.shadow};
    text-align: center;
    h1 {
      font-family: "Pacifico", cursive;
    }
  }
`;

export const SignupButton = styled.button`
  font-family: "Montserrat", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  font-size: 1.3rem;
  width: 90%;
  max-width: 250px;
  height: 15%;
  border-radius: 3px;
  appearance: none;
  --moz-appearance: none;
  --webkit-appearance: none;
  border: 0;
  outline: none;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  &:focus,
  &:hover {
    appearance: none;
    --moz-appearance: none;
    --webkit-appearance: none;
    border: 0;
    outline: none;
    cursor:pointer
  }
  &:hover {
    background-color: ${({ theme }) => theme.primaryHover};
  }
  &:active {
    transform: scale(0.95);
  }
`;

export default Signup;
