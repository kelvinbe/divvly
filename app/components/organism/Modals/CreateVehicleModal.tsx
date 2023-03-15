import { useState, useReducer, useEffect } from "react";
import {
Text,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalBody,
ModalCloseButton,
Input,
Flex,
Select,
Box, 
Image,
Icon, IconButton,
FormControl,
FormErrorMessage,
FormLabel
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { BiImageAdd } from "react-icons/bi";
import { FlexRowCenterCenter } from "../../../utils/theme/FlexConfigs";
import Rounded from "../../molecules/Buttons/General/Rounded";
import { IVehicleDetails } from "../../../globaltypes";
import useVehicles from "../../../hooks/useVehicles";
import { isArray, isString, isUndefined } from "lodash";

type IReducerState = IVehicleDetails & {
    isplateError:boolean,
    isvehicle_picturesError:boolean,
    ismakeError:boolean,
    ismodelError:boolean,
    isyearError:boolean,
    ishourly_rateError:boolean
}

export const initialstate:IReducerState= {
    plate:"",
    make:"",
    model:"",
    year:"",
    transmission:"Manual",
    hourly_rate:"",
    vehicle_pictures:[],
    status:"available",
    isplateError:true,
    isvehicle_picturesError:true,
    ismakeError:true,
    ismodelError:true,
    isyearError:true,
    ishourly_rateError:true
}
const validateField = (fieldName:string, fieldValue?:string | number | string[]):boolean => {
    if(isUndefined(fieldValue)) return false
    switch (fieldName) {
        case 'plate':
            if (!isString(fieldValue)) return false
            if(fieldValue.length < 6) return false
            return true      
        case 'vehicle_pictures':
            if(!isArray(fieldValue)) return false
            if(fieldValue.length === 0) return false
            return true
        case 'make':
            if(!isString(fieldValue)) return false
            if(fieldValue.length === 0) return false
            return true
        case 'model':
            if(!isString(fieldValue)) return false
            if(fieldValue.length <= 0) return false
            return true
        case 'year':
            if(fieldValue.length !== 4) return false
            return true
        case 'hourly_rate':
            if(fieldValue.length < 1) return false
            return true    
        default:
            return false
    }
}
const reducer = (state:IReducerState, action:{type:string, key:string, value:undefined|string|number|string[]}) => {
    switch (action.type) {
        case "create_vehicle":
            return {
                ...state,
                [action.key]:action.value,
                [`is${action.key}Error`]: validateField(action.key, action.value)
            }
        case "clear_vehicle":
            return {
                ...state,
                [action.key]:undefined
            }
        default:
            return state;
    }
}
interface Props{
    isOpen:boolean,
    onClose:() => void
}
  export default function CreateVehicleModal(props:Props) { 
    const {isOpen, onClose} = props
    const [vehicleImages, setVehicleImages] = useState<string[]>([])
    const [isError, setIsError] = useState(false)
    const [state, dispatch] = useReducer(reducer, initialstate)
    const {addVehicle} = useVehicles()

    const handleSelectImages = (e) => {
        const fileList = e.target.files
        const fileListArray = Array.from(fileList)

        let vehicleImagesArray = fileListArray.map(file => {
            return URL.createObjectURL(file)
        })
        setVehicleImages(vehicleImagesArray)
    }

    useEffect(() => {
        dispatch({
            type:'create_vehicle',
            value:vehicleImages,
            key:"vehicle_pictures"
        })
    },[vehicleImages])

    const handleCreateVehicle = () => {
        if(state.plate === '' || state.vehicle_pictures?.length === 0 || state.make === "" || state.model === "" || state.year === "" || state.hourly_rate === "" ){
            setIsError(true)
        }else{
            addVehicle({
                plate:state.plate,
                vehicle_pictures:state.vehicle_pictures,
                make:state.make,
                model:state.model,
                year:state.year,
                transmission:state.transmission,
                hourly_rate:state.hourly_rate,
                status:state.status
            })
            onClose()
        }
    }
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false} size='6xl' isCentered motionPreset="slideInBottom">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign={'center'}>Create Vehicle</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <FormControl isInvalid={isError}>
                    <FormErrorMessage fontSize={16} fontWeight={600}>Ensure all fields are filled</FormErrorMessage>
                    <Flex >
                        <Box w={1/3}>
                            <FormControl isRequired isInvalid={!state.isvehicle_picturesError}>
                                <FormLabel>Upload pictures</FormLabel>
                                <FormErrorMessage>Upload at least one image</FormErrorMessage>
                                <Flex w={'100%'} flexWrap='wrap' flexDirection={"row"} h={'300px'} overflowY={'scroll'}>
                                    {vehicleImages && 
                                    vehicleImages.map((vehicle, index) => {
                                        return(
                                            <Box key={index} w={110} h={110} position={'relative'} marginBottom={5} marginX={2}>
                                                <Image src={vehicle} alt='Vehicle' h={100} w={120} border={'1px'} borderColor='gray.400' rounded={'2xl'}/>
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<DeleteIcon />}
                                                    size="sm"
                                                    onClick={() => {
                                                        setVehicleImages(vehicleImages.filter(e => e !== vehicle))
                                                    }}
                                                    color="cancelled.1000"
                                                    position={'absolute'}
                                                    top={0}
                                                    left={0}
                                                />
                                            </Box>

                                        )
                                    })}
                                        <Input
                                            type="file"
                                            id='vehicle_pictures'
                                            accept="image/*"
                                            display='none'
                                            multiple
                                            required
                                            onChange={handleSelectImages}
                                        /> 
                                        <Flex {...FlexRowCenterCenter} border='1px' borderColor={'primary.1000'} borderRadius={'2xl'} borderStyle='dashed' w={24} h={24} padding='2px'>
                                            <label htmlFor="vehicle_pictures"><Icon as={BiImageAdd} color="primary.1000" w={16} h={16} aria-label='Add vehicle image'/></label>
                                        </Flex>
                                        
                                </Flex>
                            </FormControl>
                        </Box>
                        <Flex w={2/3} flexWrap='wrap' flexDirection={"row"} justifyContent={'space-between'} h='100%'>
                            <FormControl w={350} isRequired marginBottom={5} isInvalid={!state.isplateError}>
                                <FormLabel htmlFor="id">Plate</FormLabel>
                                <Input type='text' id='id' placeholder='ABC-123' w={350} value={state.plate} onChange={e =>
                                    dispatch({
                                    type:'create_vehicle',
                                    value:e.target.value,
                                    key:"plate"
                                })}
                                />
                                <FormErrorMessage>Vehicle plate is required(At least 6 characters)</FormErrorMessage>
                            </FormControl>
                            <FormControl w={350} isRequired isInvalid={!state.ismakeError} flexDirection={'column'} marginBottom={5}>
                                <FormLabel htmlFor="make">Make</FormLabel>
                                <Input type='text' id='make' placeholder='Toyota' w={350} value={state.make} onChange={e => 
                                    dispatch({
                                        type:'create_vehicle',
                                        value:e.target.value,
                                        key:"make"
                                    })}
                                />
                                <FormErrorMessage>Vehicle make is required</FormErrorMessage>
                            </FormControl>
                            <FormControl w={350} isRequired isInvalid={!state.ismodelError} marginBottom={5}>
                                <FormLabel htmlFor="model">Model</FormLabel>
                                <Input type='text' id='model' placeholder='Camry' w={350} value={state.model} onChange={e =>       dispatch({
                                        type:'create_vehicle',
                                        value:e.target.value,
                                        key:"model"
                                    })}
                                />
                                <FormErrorMessage>Vehicle model is required</FormErrorMessage>
                            </FormControl>
                            <FormControl w={350} isRequired isInvalid={!state.isyearError} marginBottom={5}>
                                <FormLabel htmlFor="year">Year</FormLabel>
                                <Input type='number' id='year' placeholder='2018' max={4} w={350} value={state.year} onChange={e => dispatch({
                                    type:'create_vehicle',
                                    value:e.target.value,
                                    key:"year"
                                })}/>
                                <FormErrorMessage>Vehicle year of make is required(4 characters)</FormErrorMessage>
                            </FormControl>
                            <FormControl w={350} marginBottom={5} isRequired>
                                <FormLabel htmlFor="transmission">Transmission</FormLabel>
                                <Select w={350} value={state.transmission} onChange={e => dispatch({
                                    type:'create_vehicle',
                                    value:e.target.value,
                                    key:"transmission"
                                })}>
                                    <option value='Manual'>Manual</option>
                                    <option value='auto'>Automatic</option>
                                    <option value='cvt'>CVT</option>
                                    <option value="semi-auto">Semi Automatic</option>
                                </Select>
                            </FormControl>
                            <FormControl w={350} marginBottom={5} isRequired isInvalid={!state.ishourly_rateError}>
                                <FormLabel htmlFor="rate">Rate</FormLabel>
                                <Input type='number' id='rate' placeholder='$' w={350} value={state.hourly_rate} onChange={e => dispatch({
                                    type:'create_vehicle',
                                    value:e.target.value,
                                    key:"hourly_rate"
                                })}/>
                                <FormErrorMessage>Vehicle hourly rate is required</FormErrorMessage>
                            </FormControl>
                            
                            <Flex w='100%' {...FlexRowCenterCenter} marginBottom={5}>
                                <Rounded variant='solid' setWidth={350} rounded='full' onClick={handleCreateVehicle}>Create</Rounded>
                            </Flex>
                        </Flex> 
                    </Flex>
                </FormControl>    
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
    
  }