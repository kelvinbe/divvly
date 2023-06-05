import React, { useEffect } from 'react'
import FilterableTable from '../FilterableTable/FilterableTable'
import { AuthCodeTableColumnTypes } from './authcode-table.columntypes'
import { useAppDispatch, useAppSelector } from '../../../../redux/store'
import { fetchAuthCodes, selectAuthCodeFeedback } from '../../../../redux/authcodeSlice'
import LogRocket from 'logrocket'
import LoadingComponent from '../../../molecules/feedback/LoadingComponent'
import ErrorComponent from '../../../molecules/feedback/ErrorComponent'
import { insertTableActions } from '../../../../utils/tables/utils'
import { Flex, IconButton } from '@chakra-ui/react'
import { FlexRowCenterCenter } from '../../../../utils/theme/FlexConfigs'
import { EditIcon } from '@chakra-ui/icons'
import { IAuthCode, IUserProfile, IVehicle } from '../../../../globaltypes'

interface Props {
  onEdit?: (activeCode: Partial<IAuthCode> & {
    vehicle?: Partial<IVehicle>
    user?: Partial<IUserProfile>
  }) => void
}

function AuthCodeTable(props: Props) {
  const { onEdit } = props
  const feedback = useAppSelector(selectAuthCodeFeedback) 
  const dispatch = useAppDispatch()

  useEffect(()=>{
    (async ()=>{
      try {
        await dispatch(fetchAuthCodes())
      } catch (e) {
        LogRocket.error(e)
      }
    })()
  }, [])
    
  return (
    <>
      {
        feedback.loading ? ( 
          <LoadingComponent/>
        ) : feedback.error ? <ErrorComponent
          error="Something went wrong while fetching auth codes. Please try again later."
        /> : (
          <FilterableTable 
              columns={insertTableActions(AuthCodeTableColumnTypes, (i, data)=>{
                return (
                  <Flex {...FlexRowCenterCenter} >
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      size="sm"
                      onClick={() => {
                        onEdit?.(data)
                      }}
                      marginRight='4'
                      data-cy={'edit-button'}
                    />
                  </Flex>
                )
              })}
              data={feedback.data ?? []}
              viewAddFieldButton={false}
              viewSearchField={false}
              openCreateModal={()=>{}}
          />
        )
      }
    </>
  )
}

export default AuthCodeTable