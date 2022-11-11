import { CheckIcon, FormControl, Input, Stack, Text, VStack, WarningOutlineIcon } from "native-base";
import { Select } from "native-base";
import { useState } from "react";
import { TipoMarker } from "../components/TipoMarker";

export function AddMarker(){

    const [situacao, setSituacao] = useState();

    return (
        <VStack
            flex={1}
            bg={'white'}
        >
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Tipo de Marcação</FormControl.Label>
                    <TipoMarker/>
                </Stack>
            </FormControl>
            <FormControl isRequired>
                <Stack mx="4">
                    <Text
                        fontWeight={"bold"}
                    >Localização</Text>
                    <FormControl.Label>Latitude</FormControl.Label>
                    <Input type="password" defaultValue="12345" placeholder="password" />
                    <FormControl.HelperText>
                        Must be atleast 6 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Longitude</FormControl.Label>
                    <Input type="password" defaultValue="12345" placeholder="password" />
                    <FormControl.HelperText>
                        Must be atleast 6 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>

            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>Estado de Conservação</FormControl.Label>
                    <Select selectedValue={situacao} minWidth="200" accessibilityLabel="Selecione" placeholder="Selecione" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={itemValue => setSituacao(itemValue)}>
                        <Select.Item label="Ruim" value="ux" />
                        <Select.Item label="Bom" value="web" />
                        <Select.Item label="Excelente" value="cross" />
                    </Select>
                    <FormControl.HelperText>
                        Must be atleast 6 characters.
                    </FormControl.HelperText>
                    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                        Atleast 6 characters are required.
                    </FormControl.ErrorMessage>
                </Stack>
            </FormControl>


            

        </VStack>
    )
}