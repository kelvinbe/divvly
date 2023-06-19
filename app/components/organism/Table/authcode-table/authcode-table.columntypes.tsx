import { ColumnsType } from "antd/es/table";
import { IAuthCode, IUserProfile, IVehicle } from "../../../../globaltypes";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Avatar, Flex } from "@chakra-ui/react";
import { FlexRowCenterCenter } from "../../../../utils/theme/FlexConfigs";
import StatusTag from "../../../atoms/status/StatusTag";
dayjs.extend(relativeTime)

export const AuthCodeTableColumnTypes: ColumnsType<Partial<IAuthCode> & {
    user?: Partial<IUserProfile>
    vehicle?: Partial<IVehicle>
}> = [
    {
        title: "Request Made",
        dataIndex: "created_at",
        key: "created_at",
        render: (v, { created_at }) => {
            return (
                <div className="flex flex-row items-center justify-start" >
                    <span className="font-semibold">
                    {
                        dayjs().isSame(dayjs(created_at), 'day') ? 'Today at '+dayjs(created_at).format('hh:mm A') : 
                        dayjs().isSame(dayjs(created_at).add(1, 'day'), 'day') ? 'Tomorrow at '+dayjs(created_at).format('hh:mm A') :
                        dayjs().isSame(dayjs(created_at).subtract(1, 'day'), 'day') ? 'Yesterday at'+dayjs(created_at).format('hh:mm A') :
                        dayjs().isSame(dayjs(created_at), 'week') ? dayjs(created_at).format('dddd hh:mm A') :
                        dayjs().isSame(dayjs(created_at), 'month') ? dayjs(created_at).format('DD hh:mm A') :
                        dayjs().isSame(dayjs(created_at), 'year') ? dayjs(created_at).format('DD MMM hh:mm A') :
                        dayjs(created_at).format('DD MMM, YYYY')
                        }
                    </span>
                </div>
            )
        }
    },
    {
        title: "User",
        dataIndex: "user",
        key: "user", 
        render: (v, { user }) => {
            return (
                <div className="flex flex-row items-center justify-start gap-x-5">
                    <Avatar src={user?.profile_pic_url} name={
                        (user?.fname || user?.lname)  ? `${user?.fname ?? ''} ${user?.lname ?? ''}` : user?.email
                    } />
                    <span className="font-semibold">
                        {(user?.fname || user?.lname)  ? `${user?.fname ?? ''} ${user?.lname ?? ''}` : user?.email}
                    </span>
                </div>
            )
        }
    },
    {
        title: "Vehicle",
        dataIndex: "vehicle",
        key: "vehicle",
        render: (v, { vehicle }) => {
            return (
                <div className="flex flex-row items-center justify-start">
                    <span className="font-semibold ">
                        {vehicle?.make} {vehicle?.model} ({vehicle?.plate})
                    </span>
                </div>
            )
        }
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (v, { status }) => {
            return (
                <Flex {...FlexRowCenterCenter} >
                    <StatusTag status={status?.toLocaleLowerCase() as any ?? "revoked"} >
                        {status}
                    </StatusTag>
                </Flex>
            )
        }
    }
]