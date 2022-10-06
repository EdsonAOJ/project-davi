import { FormControl, FormHelperText, FormLabel, Input } from "@chakra-ui/react"

export const InputLabel = ({ label, valueInformation, nameInfo, bottomInfo, ...reset }) => {


  return (
    <FormControl fontSize="14px" mb="0" >
      <FormLabel fontSize="14px" mb="2px" >
        {label}
      </FormLabel>
      <Input type="text" p="2px 9px" h="30px" border='2px solid gray' fontSize="12px" value={valueInformation} name={nameInfo} {...reset} />
      <FormHelperText fontSize="10px"  >{bottomInfo}</FormHelperText>
    </FormControl>
  )
}




