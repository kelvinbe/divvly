import { useAppSelector, useAppDispatch } from "../redux/store";
import { getVehicles, selectVehicles } from "../redux/vehiclesSlice";
import axios from "axios";
import { VEHICLES_DOMAIN } from "./constants";
import { useState } from "react";
import { IVehicleDetails, IapiResponseData } from "../globaltypes";
import { isEmpty } from "lodash";
import { useToast } from "@chakra-ui/react";

export default function useVehicles(vehicleId?:number) {
  const dispatch = useAppDispatch();
  const allVehicles = useAppSelector(selectVehicles);
  const toast = useToast()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null|{message:string}>(null);

  function fetchVehicles() {
    setLoading(true);
    axios
      .get(VEHICLES_DOMAIN, {
        headers: {
          Authorization: `Bearer token`,
        },
      })
      .then(({ data }) => {
        dispatch(getVehicles(data.data));
        setLoading(false);
        setError(null);
      })
      .catch(setError);
  }

  function updateVehicle(updatedBody: Partial<IVehicleDetails>) {
    setLoading(true);
    if(isEmpty(updatedBody)) return setError({
        message:"body is empty"
    })
    axios
      .patch(
        `${VEHICLES_DOMAIN}?vehicle_id=${vehicleId}`,
        { ...updatedBody },
        {
          headers: {
            Authorization: `Bearer token}`,
          },
        }
      )
      .then((res) => {
        fetchVehicles();
        setLoading(false);
        toast({
          position: "top",
          title: 'Updated vehicle',
          description: "Vehicle updated successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
      })
      .catch(error=>{
        setError({message:error})
        toast({
          position: "top",
          title: 'Could not update vehicle',
          description: "An error occured",
          duration: 3000,
          isClosable: true,
          status: "error",
        })
      });
  }

  function addVehicle(vehicle: IVehicleDetails){
    setLoading(true)
    if(isEmpty(vehicle)) return setError({
        message: "Vehicle data is empty"
    })
    axios.post(VEHICLES_DOMAIN, {...vehicle},
        {
            headers: {
                Authorization: `Bearer token`
            }
        })
    .then((res)=>{
        fetchVehicles()
        setLoading(false)
        toast({
          position: "top",
          title: "Create Vehicle",
          description: "Vehicle created succesfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Create vehicle",
        description: "Could not create a vehicle",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  function deleteVehicle(id: number){
    setLoading(true)
    axios.delete(`${VEHICLES_DOMAIN}?vehicle_id=${id}`, {
        headers:{
            Authorization: `Bearer token`,
        }
    })
    .then((res)=>{
        fetchVehicles()
        setLoading(false)
        toast({
          position: "top",
          title: "Delete vehicle",
          description: "Vehicle deleted successfully",
          duration: 3000,
          isClosable: true,
          status: "success",
        })
    })
    .catch(error=>{
      setError({message:error})
      toast({
        position: "top",
        title: "Delete vehicle",
        description: "An error occured",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }

  type IfetchApiVehicles = {
    query:string,
    setApiData: React.Dispatch<React.SetStateAction<IapiResponseData>>
    loading: React.Dispatch<React.SetStateAction<boolean>>
  }
  function fetchApiVehicles(params:IfetchApiVehicles){
    const { query, setApiData, loading } = params
    const url = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=all-vehicles-model&q=${query}&facet=make&facet=model&facet=year`
    loading(true)
    axios.get(url)
    .then((res)=>{
        setApiData(res)
    })
    .catch(error=>{
      loading(false)
      setError({message:error})
      toast({
        position: "top",
        title: "Error fetching API",
        description: "An error occured",
        duration: 3000,
        isClosable: true,
        status: "error",
      })
    })
  }
  return {
    allVehicles,
    fetchVehicles,
    addVehicle,
    deleteVehicle,
    updateVehicle,
    fetchApiVehicles
  };
}