//importacion
import {MercadoPagoConfig,Payment} from "mercadopago";

export const  client  =  new  MercadoPagoConfig ( {  accessToken:   'APP_USR-5463294791274733-082021-7be8dbef725e3f699b65ec7a44695214-1954034747',
        options : {  timeout : 5000 ,  
        idempotencyKey : 'abc'  }  } ) ;

