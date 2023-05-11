import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Nav, PostModal } from "../component";
import { SignedInAppStyled } from "../styled";

const SignedInApp = () => {
  const [modalOpen, setModal] = useState(false);
  return (
    <SignedInAppStyled>
      <Nav setModal={setModal} />
      <Routes>
        <Route path="/" element={<Feed />} />
      </Routes>
      {modalOpen && <PostModal setModal={setModal} />}
    </SignedInAppStyled>
  );
};

export default SignedInApp;
