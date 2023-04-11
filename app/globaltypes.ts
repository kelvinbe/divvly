import { eIVehicle, eIReservation, eIPaymentType, eIMarket, eIIntergration } from './entities';
// Static props

export interface IStaticProps {
    dashboard?: boolean;
    authonly?: boolean;
    adminonly?: boolean;
}


/**
 * @section Request Objects
 */

export interface IRawCard {
    cardNumber: string,
    expMonth: number,
    expYear: number,
    cvc: string,
    name: string,
    email: string,
}

export interface IPaymentIntentRequest {
    hourlyRate: number,
    hours: number,
    stripeCustomerId: string,
    stripePaymentMethodId: string,
    currency: string
}


/**
 * @name IVehicle 
 * @description Vehicle data type
 */

export interface IVehicle {
    vehicleId: string,
    vehicleType: string,
    vehicleMake: string,
    vehicleModel: string,
    locationId: string,
    color: string,
    seats: number,
    transmission: string,
    year: number | string,
    // Not sure about these, need further clarification
    status: "active" | "Unavailable" | "Intent",
    hourlyRate: number,
    vehiclePictures: string[],
    location: string,
    coords: {
       latitude: number,
       longitude: number
    } | null
  }
  export interface IVehicleDetails {
    id?: number;
    transmission: string;
    year: number;
    status: "active" | "unavailable" | "available";
    make: string;
    model: string;
    plate: string;
    hourly_rate: number;
    VehiclePictures: string[];
  }
  export interface IVehicleDetails {
    id?: number;
    transmission: string;
    year: number;
    status: "active" | "unavailable" | "available";
    make: string;
    model: string;
    plate: string;
    hourly_rate: number;
    VehiclePictures: string[];
  }
  export interface IReservation {
    id: string;
    vehicle_id:number;
    start_date_time: string;
    end_date_time: string;
    total_cost: number;
    status: string;
    type: string,
    entity_id: number,
    user_id: number,
    location_id: number,
    hourly_rate: number,
    duration: number,
    payment_id: string,
    customer: {
        userId: number,
        fname: string,
        lname: string,
        profile_pic_url: string
      },
    vehicle: {
      vehicle_id: number,
      entity_id: number,
      vehicle_type: string,
      location_id: number,
      color: string,
      seats: number,
      plate: string,
      transmission: string,
      year: number,
      latitude: number,
      longitude: number,
      status: string,
      make: string,
      model: string,
      hourly_rate: number,
      host: {
        id: string,
        fname: string,
        lname: string,
        profile_pic_url: string,
        handle: string,
        hourly_rate: string
      },
      station: IStation,
      
      location: {
        location_id: number,
        entity_id: number,
        market: {
          market_id: number,
          country: string,
          name: string,
          latitude: number,
          longitude: number,
          status: string
        },
        address: string,
        building_name: string,
        picture_url: string,
        latitude: number,
        longitude: number,
        status: string
      },
      vehicle_pictures: string[]
    },
    payment: {
      payment_type_id: number,
      id: string,
      payment_type: string,
      status: string,
      amount: number,
    }
  }

  export interface IPayout {
    id: number;
    amount: number;
    date: string;
    status: "paid"|"pending"
  }


  export interface IIntegrations {
      integrationName: string;
      status: string;
  }


export interface ILocation {
    location_id: number;
    vehicle: {
      vehicle_name:string,
      VehiclePictures: string[]
    };
    address: string;
    market_name: string;
    status: string;
}

export interface IStation {
  id: string;
  name: string;
  description:string,
  image:string,
  sub_market_name:string,
  sub_market: {
    id: string;
    name: string;
    market_id: string;
  },
  sub_market_id: string;
  latitude: number;
  longitude: number;
  status: "active" | "inactive";
}
export interface PayoutMethods {
  id:string,
  user_id:string,
  connected_account_id: string|null,
  mobile_money_number:string|null,
  paypal_email:string|null,
  type:'BANK_ACCOUNT' | 'MPESA' | 'PAYPAL',
  verified:boolean,
  status: 'ACTIVE' | 'INACTIVE' | 'BLOCKED'
}
export interface IUserProfile {
  user_id:number // keeping this to keep ts happy where its been used this way, but this will eventually get phased out
  id: string;
  fname: string;
  lname: string;
  email: string;
  handle: string;
  phone: string;
  profile_pic_url: string;
  marketId: string | number | null; // keep this for now, but this will eventually get phased out
  market_id: string | null;
  userType?: string; // keep this for now, but this will eventually get phased out
  user_type?: string;
  status: string;
  stripeCustomerId?: string; // keep this for now, but this will eventually get phased out
  customer_id?: string | null;
  sub_market_id: string | null;
  PayoutMethods:PayoutMethods[];
  user_settings:{
    id:string,
    notifications_enabled:boolean,
    sms_enabled:boolean,
    tracking_enabled:boolean,
    authcode_enabled:boolean
  }
  is_admin: boolean | null;
  sent_invites: dIInvitation[] | null;
}
export interface IAuthCode {
  id: string;
  code: string;
  status: string;
  user_id: string;
  user: Partial<IUserProfile>
  vehicle_id: string
}
export interface IRequestedAuthCode {
  user_id:number,
  request_id:number;
  user_image:string;
  vehicle_id: number;
}

/**
 * @name GenerateDataTransferObject
 * @description - Generic data transfer object that is used to send data to the client. This is used to send data to the client in a consistent manner.
 */
export interface GenerateDataTransferObject<T> {
  type: "success" | "error";
  message: string;
  data: T;
}

/**
 * @section - Data transfer object definitions
 * @description - These are the types that are used to define the data that is sent as responses from the server. Each of these interfaces is prefixed with "dI" to indicate that they are
 *               data interfaces.
 */

export interface dIUserProfile {
  uid?: string;
  fname: string;
  lname: string;
  email: string;
  handle: string;
  phone: string;
  profile_pic_url: string;
  settings?: {
    notificationsEnabled?: boolean;
  },
  user_type: "host" | "customer",
  status?: "Active" | "NonActive" | "Banned" | "Suspended";
  market: {
    market_id?: number;
    country?: string;
    name?: string;
    latitude?: string;
    longitude?: string;
    status?: "Active" | "Nonactive";
  },
  customer_id?: string;
}

//extending but not all properties will be present
export interface dIVehicle extends eIVehicle {
  host: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
    hourly_rate?: number;
  },
  location: {
    location_id?: number;
    entity_id?: string;
    market: eIMarket,
    address?: string;
    building_name?: string;
    picture_url?: string;
    directions?: string;
    longitude?: string;
    latitude?: string;
    status?: "Active" | "Nonactive" | "Suspended";
  },
  
  vehicle_pictures?: string[];
}

//extending but not all properties will be present
export interface dIReservation extends eIReservation {
  customer: {
    userId?: string;
    fname?: string;
    lname?: string;
    profile_pic_url?: string;
  },
  vehicle: dIVehicle;
  payment: eIPaymentType;
}

export type IapiResponseData = null | {
  status:number,
  data:{
      records:{
          fields:{
              make:string
              model:string
              trany:string
              year:string
          }
      }[]
  }
}


export interface dIInvitation {
  id: string
  email: string
  code: string
  expires_at: Date
  uid: string
  activated: boolean
  sender_id: string | null
}