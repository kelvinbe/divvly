import React from "react";
import {
  Box,
  Text,
  Button,
  Image,
  Flex,
  VStack,
  Stack,
} from "@chakra-ui/react";
import playstore from "../../../public/images/play.png";
import appstore from "../../../public/images/appstore.png";
import Link from "next/link";

interface iProps {
  letterSpacing?: string;
  direction: 'row'|'column';
  display: string;
  image: {src:string};
  disImage?:string,
  textColor: string;
  boxWidth?: string;
  textWidth: string;
  flexDirection?: 'column'|'column-reverse'|'row'|'row-reverse'
  justifyContent?: string;
  alignItems?: string;
  align: string;
  marginTop?: string;
  showText: boolean;
  spacing: number;
  noStyleText?: boolean;
  textAlign?: 'left'|'right'|'center'|'justify';
  boxPosition?: 'absolute'|'relative';
  right?: string;
  imageWidth?: string;
  vStackPosition?: 'relative'|'absolute';
  left?: string;
}

const BannerInfo = (props: iProps) => {
  const {
    letterSpacing,
    direction,
    display,
    image,
    textColor,
    textWidth,
    boxWidth,
    flexDirection,
    justifyContent,
    alignItems,
    align,
    marginTop,
    showText,
    spacing,
    noStyleText,
    textAlign,
    boxPosition,
    right,
    imageWidth,
    vStackPosition,
    left,
  } = props;

  const imageStyle = {
    position: boxPosition,
    right: right
  }
  return (
    <Box>
      <Box>
        <Flex
          flexDirection={flexDirection}
          alignItems={alignItems}
          justifyContent={justifyContent}
          marginTop={marginTop}
        >
          <VStack paddingTop="100px" align={align} spacing={spacing} position={vStackPosition} left={left} data-testid = 'banner-info'>
            <Text
              textTransform="uppercase"
              letterSpacing={letterSpacing}
              fontSize="24px"
              textColor={textColor}
            >
              Introducing
            </Text>
            {showText && !noStyleText ? (
              <>
                <Text fontSize="96px">AIRBNB CAR</Text>
                <Text fontSize="96px">
                  <span style={{ color: "#FC346A" }}>SHARING</span> APP
                </Text>
              </>
            ) : (
              !noStyleText && (
                <Text letterSpacing="0.1955em" fontSize="96px">
                  AIRBNB CAR <span style={{ color: "#FC346A" }}>SHARING</span>{" "}
                  APP
                </Text>
              )
            )}
            {noStyleText && (
              <Text letterSpacing="0.1955em" textColor="white" fontSize="96px">
                AIRBNB CAR SHARING APP
              </Text>
            )}
            <Text textColor={textColor} w={textWidth} textAlign={textAlign}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus.
            </Text>
            <Stack direction={direction} spacing={6}>
              <Link href='https://www.apple.com/app-store/' target="blank">
                <Image src={playstore.src} alt='Download from PlayStore'/>
              </Link>
              <Link href='https://www.apple.com/app-store/' target="blank">
              <Image src={appstore.src} alt='Download from AppStore'/>
              </Link>             
            </Stack>
          </VStack>
          <Box display={display} width={boxWidth}>
            <Image src={image ? image?.src : undefined} w={imageWidth} position={boxPosition} right={right} alt='Display divvly'/>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default BannerInfo;
