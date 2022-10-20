import { Input, Label, Img } from "@chakra-ui/react"

export const InputWIthImage = ({ label, valueInformation, nameInfo, bottomInfo, ...reset }) => {


  return (
    <>

      <Label>

        {/* <Img /> */}
        <Input
          type="text"
          p="2px 9px"
          h="30px"
          border='2px solid gray'
          fontSize="12px"
          value={valueInformation}
          name={nameInfo}
          {...reset}
        />
      </Label>
    </>
  )
}




