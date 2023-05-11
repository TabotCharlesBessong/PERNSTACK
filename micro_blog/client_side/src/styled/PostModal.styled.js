import styled from "styled-components";

const PostModal = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  background-color: #1118;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const PostModalForm = styled.form`
  width: 90%;
  max-width: 500px;
  height: 50%;
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.elevation_3};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  & > textarea {
    width: 90%;
    max-width: 400px;
    height: 50%;
    outline: 0;
    border: 0;
    border-radius: 5px;
    resize: none;
    padding: 1rem;
    box-sizing: border-box;
    font-size: 1.4rem;
  }

  & > button {
    color: white;
    background-color: ${({ theme }) => theme.primary};
    outline: 0;
    border: 0;
    appearance: none;
    --webkit-appearance: none;
    --moz-appearance: none;
    text-decoration: none;
    padding: 0.7rem 1.5rem;
    font-size: 1.2rem;
    border-radius: 5px;
    &:active {
      transform: scale(0.98);
    }
  }
`;
export const PostModalHeader = styled.div``;

export const PostModalButton = styled.i`
  z-index: 4;
  margin-top: auto;
  margin-inline: auto;
  padding: 0.7rem 1.7rem;
  font-size: 2.8rem;
  color: ${({ theme }) => theme.primary};
  background-color: transparent;
  border-radius: 5px;
  border: 4px solid ${({ theme }) => theme.primary};

  @media (min-width: 600px) {
    margin-top: 0;
    margin-inline: 0;
    padding: 0.2rem 1rem;
    font-size: 2rem;

    &:hover {
      color: ${({ theme }) => theme.elevation_2};
      background-color: ${({ theme }) => theme.primary};
      transition: all 150ms ease-in;
    }
  }
`;

export default PostModal;
