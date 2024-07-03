import Flex from "@/components/atoms/flex";
import HeaderWrapper from "@/components/atoms/div/wrapper/headerWrapper";
import Img from "@/components/atoms/img";
import Paragraph from "@/components/atoms/paragraph";
import Logo from "@/resource/img/logo.svg";
import { ReactElement } from "react";

const Header = (): ReactElement => {
  return (
    <HeaderWrapper>
      <Flex>
        <Img src={Logo} alt={"logo"}></Img>
        <Paragraph isWhite>Buyer Central</Paragraph>
      </Flex>
    </HeaderWrapper>
  );
};

export default Header;
