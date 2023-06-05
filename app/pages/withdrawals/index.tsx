import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../components/organism/ErrorFallback";
import { logError } from "../../utils/utils";
import FilterableTable from "../../components/organism/Table/FilterableTable/FilterableTable";
import { insertTableActions } from "../../utils/tables/utils";
import { WithdrawalsTableColumns, AdminWithdrawalsTableColumns } from "../../utils/tables/TableTypes";
import { Flex, IconButton, useDisclosure, Text, Heading, Button} from "@chakra-ui/react";
import { MdEdit } from "react-icons/md";
import { FlexRowStartStart } from "../../utils/theme/FlexConfigs";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  selectWithdrawals,
  fetchWithdrawals,
} from "../../redux/withdrawalSlice";
import dayjs from "dayjs";
import EditWithdrawalModal from "../../components/organism/Modals/EditWithdrawal";
import { IWithdrawals } from "../../globaltypes";
import Withdrawal from "../../components/molecules/Withdrawal/Withdrawal";
import useUsers from "../../hooks/useUsers";

const Withdrawals = () => {
  const dispatch = useAppDispatch();
  const { withdrawals } = useAppSelector(selectWithdrawals);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [search, setSearch] = useState<string>('');
  const [withdrawalData, setwithdrawalData] = useState<Partial<IWithdrawals>>({})
  const {user}=useUsers()
  useEffect(() => {
    dispatch(fetchWithdrawals({}));
  }, []);

  const openEditWithdrawalModal = (id: string)=>{
    const selectedWithdrawal = withdrawals.find((withdrawal: IWithdrawals)=> withdrawal.id === id)
    selectedWithdrawal && setwithdrawalData(selectedWithdrawal)
    onOpen()
  }

  const filteredWithdrawals = withdrawals.filter((withdrawal: IWithdrawals)=>dayjs(withdrawal.createdAt).format('DD MMM, YYYY').toLocaleLowerCase().includes(search.toLocaleLowerCase()) || `${withdrawal.user.fname} ${withdrawal.user.lname}`.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
  if(user?.is_admin)
  return(
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      <Flex w="full" h="full" direction={'column'}>
        <EditWithdrawalModal isOpen={isOpen} onClose={onClose} withdrawalData={withdrawalData}/>
        <Heading size={'md'} color={'#E63B2E'}>Transactions</Heading>
        <FilterableTable 
        viewSearchField={true}
        viewSortablesField={true}
        sortables={[{
            columnName: 'Date',
            columnKey:'createdAt'
        }]}
        pagination={{
            position: ["bottomCenter"],
        }}
        data={filteredWithdrawals}
        setSearch={setSearch}
        columns={insertTableActions(AdminWithdrawalsTableColumns, (i, data) => {
          
            return (
              <Flex {...FlexRowStartStart}>
                <IconButton
                  aria-label="Edit"
                  icon={<MdEdit/>}
                  size="sm"
                  disabled={data.status === 'PENDING'? false: true}
                  onClick={()=>openEditWithdrawalModal(data.id)}
                  data-cy="edit-button"
                />
              </Flex>
            );
          })}
        />
        </Flex>
    </ErrorBoundary>
  );

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
    <Flex  w="full" h="full" direction={'column'}>
      <EditWithdrawalModal isOpen={isOpen} onClose={onClose}  withdrawalData={withdrawalData} />
      <Heading size={'md'} color={'#E63B2E'}>Transactions</Heading>
      <Withdrawal />
      <FilterableTable
        viewSearchField={true}
        viewSortablesField={true}
        sortables={[
          {
            columnName: "Date",
            columnKey: "createdAt",
          },
        ]}
        data={filteredWithdrawals}
        pagination={{
            position: ["bottomCenter"],
        }}
        setSearch={setSearch}
        columns={insertTableActions(WithdrawalsTableColumns, (i, data) => {
          
          return (
            <Flex {...FlexRowStartStart}>
              <IconButton
                aria-label="Edit"
                icon={<MdEdit/>}
                size="sm"
                disabled={data.status === 'PENDING'? false: true}
                onClick={()=>openEditWithdrawalModal(data.id)}
                data-cy="edit-button"
              />
            </Flex>
          );
        })}
      />
</Flex>
    </ErrorBoundary>
  );
};

export default Withdrawals;

export function getStaticProps() {
  return {
    props: {
      adminonly: false,
      authonly: true,
      dashboard: true,
    },
  };
}