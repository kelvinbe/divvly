import { Flex, Text } from "@chakra-ui/react";
import React, { ChangeEvent, useEffect, useReducer, useState } from "react";
import {
  FlexColCenterStart,
  FlexRowCenterBetween,
  FlexRowCenterCenter,
  FlexRowCenterEnd,
} from "../../../../utils/theme/FlexConfigs";
import SortableDropdown from "./SortableDropdown";
import { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { createSlice } from "@reduxjs/toolkit";
import BaseTable from "../BaseTable/BaseTable";
import { SearchIcon } from "@chakra-ui/icons";
import Rounded from "../../../molecules/Buttons/General/Rounded";
import { Input } from "@chakra-ui/react";
interface IProps {
  /**
   * @sortables 👉 an array with the column keys of the sortable columns
   */
  sortables?: {
    columnKey?: string;
    columnName?: string;
  }[];
  data?: any[];
  columns?: ColumnsType<any>;
  dataFetchFunction?: (fetchStatus: "pending" | "error" | "success") => void;
  addValue?:() =>void;
  buttonName?: string;
  viewSearchField: Boolean;
  viewAddFieldButton?: Boolean;
  viewSortablesField?: Boolean;
  openCreateModal?:() => void
  modalComponent?: React.ReactNode;
  pagination?: TablePaginationConfig | false;
  setSearch?: (search: string)=>void
  handlePageChange?: (pagination: TablePaginationConfig)=>void
}

interface IReducer {
  tableColumnDefinitions: ColumnsType<any> | null;
}

const initialState: IReducer = {
  tableColumnDefinitions: null,
};

const FilterableTableSlice = createSlice({
  name: "FilterableTable",
  initialState,
  reducers: {
    setTableColumnDefinitions: (state, action) => {
      state.tableColumnDefinitions =
        state.tableColumnDefinitions?.map((columnDefinition) => {
          return {
            ...columnDefinition,
            sortOrder:
              action.payload.columnKey === columnDefinition.key
                ? action.payload.order
                : null,
          };
        }) || null;
    },
    initColumnDefinitions: (state, action) => {
      state.tableColumnDefinitions = action.payload;
    },
  },
});

const { setTableColumnDefinitions, initColumnDefinitions } =
  FilterableTableSlice.actions;

function FilterableTable(props: IProps) {
  const {
    sortables,
    data,
    columns,
    dataFetchFunction,
    buttonName,
    viewSearchField,
    viewAddFieldButton,
    viewSortablesField,
    openCreateModal,
    modalComponent,
    pagination,
    setSearch,
    handlePageChange
  } = props;
  const [{ tableColumnDefinitions }, dispatchActions] = useReducer(
    FilterableTableSlice.reducer,
    initialState
  );

  const onSort = (sort: any) => {
    console.log("New sort on::::;", sort);
    dispatchActions(setTableColumnDefinitions(sort));
  };

  const handleSearch= (e: ChangeEvent)=>{
    setSearch && setSearch((e.target as HTMLInputElement).value)
  }
  useEffect(() => {
    console.log("columns::::", columns);
    columns && dispatchActions(initColumnDefinitions(columns));
  }, [columns]);

  return (
    <Flex w="full" {...FlexColCenterStart}>
      <Flex {...FlexRowCenterBetween} w="full" marginBottom="10px">
        <Flex {...FlexRowCenterBetween}>
          {viewSearchField && (
            <Flex
              {...FlexRowCenterBetween}
              w="350px"
              bgColor={"white"}
              marginRight={"10px"}
              data-cy={'search-field'}
            >
              <Flex {...FlexRowCenterCenter} w="50px" bgColor={"white"}>
                <SearchIcon />
              </Flex>
              <Input type="text" placeholder="Search" size="md" onChange={handleSearch}/>
            </Flex>
          )}
          {viewAddFieldButton && (
            <Rounded variant="solid" fullWidth={false} rounded="md" onClick = {openCreateModal}>
              <Text cursor="pointer">{buttonName}</Text>
            </Rounded>
          )}
        </Flex>
        {viewSortablesField && (
          <Flex {...FlexRowCenterCenter} data-cy={'sort-by'}>
            <Text marginRight="20px" fontWeight={"semibold"}>
              Sort By:
            </Text>
            <Flex {...FlexRowCenterEnd}>
              {sortables?.map((sortable, index) => (
                <SortableDropdown
                  key={index}
                  columnName={sortable.columnName}
                  columnKey={sortable.columnKey}
                  onSort={onSort}
                  sortOrder={
                    tableColumnDefinitions?.find(
                      (columnDefinition) =>
                        columnDefinition.key === sortable.columnKey
                    )?.sortOrder
                  }
                />
              ))}
            </Flex>
          </Flex>
        )}
      </Flex>
      <Flex w="full" {...FlexColCenterStart}>
        <BaseTable
          //@todo modify type definitions
          columns={tableColumnDefinitions as any}
          data={data || []}
          dataFetchFunction={dataFetchFunction}
          pagination={props.pagination ? props.pagination : false}
          handlePageChange={handlePageChange}
        />
      </Flex>
    </Flex>
  );
}

export default FilterableTable;
