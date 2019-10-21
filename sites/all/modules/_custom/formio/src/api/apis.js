// Abstraction pour faire des requêtes par API

import axios from 'axios'
import http from 'http'
import https from 'https'
import _ from 'lodash'

var pathname = window.location.pathname; // Returns path only (/path/example.html)
var url      = window.location.href;     // Returns full URL (https://example.com/path/example.html)
var origin   = window.location.origin;   // Returns base URL (https://example.com)
var BASE_DOMAIN = origin
var BASE_URL = `${BASE_DOMAIN}/request/api`

var HTTP = null
var requestInterceptor = null;
var responseInterceptor = null;


const _products = [
    {"id": 1, "title": "iPad 4 Mini", "price": 500.01, "inventory": 2},
    {"id": 2, "title": "H&M T-Shirt White", "price": 10.99, "inventory": 10},
    {"id": 3, "title": "Charli XCX - Sucker CD", "price": 19.99, "inventory": 5}
]

export default {
    allRequest: async function (data) {
        /*var formData = new FormData();
        _.forEach(data, function (value, key) {
            formData.append(key, value)
        });*/

        return await axios.post(BASE_URL,
            data,
             {
                 headers: {
                     "Content-Type": "application/json",
                     //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                 },
             }
            )
            .then((response) => {
                //console.log('Success!', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! ", error)
            });

        /*return new Promise(async function (resolve, reject) {
            await $.ajax({
                type: 'POST',
                url: '/request/api',
                //dataType: 'json',
                data:  data,
                success: function(response) {
                    resolve(response);
                },
                error: function(error) {
                    reject(error)
                }
            });
        }).then(function (response) {
            console.log('Success!', response)
            return response.data
        }).catch(function (error) {
            console.log("Error!", error)
        });*/

    },


    baseConfig: async function (baseURL) {
        // npm config set strict-ssl false --global
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

        var axiosConfig = {
            baseURL: baseURL,
            timeout: 0,
            withCredentials: false,
            headers: {
                "Content-Type": "application/json",
                //"Authorization": 'Bearer ' + token,
            },
            httpAgent: new http.Agent({keepAlive: true, rejectUnauthorized: false}),
            httpsAgent: new https.Agent({keepAlive: true, rejectUnauthorized: false}),
        };
        HTTP = axios.create(axiosConfig)
        BASE_DOMAIN = baseURL

        // Add a request interceptor
        requestInterceptor = HTTP.interceptors.request.use(function (config) {
            // Do something before request is sent (this.$root.$data)
            //axios.defaults.headers.common['Authorization'] = 'Bearer ' + this.generateToken();
            config.headers.Authorization = 'Bearer ' + this.generateToken();
            //console.log('Request Interceptor.', config)

            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error)
        });

        // Add a response interceptor
        responseInterceptor = HTTP.interceptors.response.use(function (response) {
            // Do something with response data

            return response;
        }, function (error) {
            if (!error.response) {
                //console.log('Response Interceptor.', 'No response detected');
            }

            // Do something with response error
            return Promise.reject(error)
        });

        //HTTP.interceptors.request.eject(requestInterceptor);
        //HTTP.interceptors.response.eject(responseInterceptor);
    },
    /***************** APIs *****************/
    generateToken: async function () {
        /*Vue.http.post('https://154.68.34.73:8280/token',
            {grant_type: 'client_credentials'},
            {
                credentials: false,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "Authorization": "Basic " + Drupal.settings.achat_pass.tmf_conf.secret_key,
                },
            }
            ).then(response => {

            console.log('Response - vue resource', response)

        }, response => {
            // error callback
            console.log('Error - vue resource', response)
        });*/

        return await axios.post( BASE_DOMAIN + '/token',
                {
                    grant_type: 'client_credentials'
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Access-Control-Allow-Origin": "*",
                        "Authorization": "Basic " + Drupal.settings.achat_pass.tmf_conf.secret_key,
                    },
                    /*auth: {
                        username: 'mBtQIKlVGXZDwc5Ipm9iUtriKwoa',
                        password: 'vMM5ZjYIWoc_oefAHuFDlqJYHUQa'
                    },*/
                    /*data: {
                        grant_type: 'client_credentials'
                    },*/
                }
            )
            .then(function (response) {
                //console.log('Success! generateToken', response)
                return response.data;
            }).catch(function (error) {
                // console.log("Error! generateToken", error)
            });
    },

    generateOTP: async function (msisdn) {
        return await axios.post(BASE_URL,
            {
                    params: 'generateOTP',
                    msisdn: msisdn
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! generateOTP', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! generateOTP", error)
            });

        /*const data = {
            "data":{
                "msisdn": msisdn
            }
        };

        return await HTTP.post('/backend-identity-api/identity/v1/generateOTP',
                data
            )
            .then((response) => {
                console.log('Success! generateOTP', response)
                return response.data
            }).catch(function (error) {
                console.log("Error! generateOTP ", error)
            });*/
    },

    validateUserOTP: async function (msisdn, codeOTP) {
        return await axios.post(BASE_URL,
            {
                    params: 'validateUserOTP',
                    msisdn: msisdn,
                    codeOTP: codeOTP
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! validateUserOTP', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! validateUserOTP", error)
            });

        /*const data = {
            "data":{
                "msisdn": msisdn,
                "codeOTP": codeOTP
            }
        };

        return await HTTP.post('/backend-identity-api/identity/v1/validateUserWithOTP',
                data
            )
            .then((response) => {
                console.log('Success! validateUserOTP', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! validateUserOTP ", error)
            });*/
    },

    productInventory: async function (mobile) {
        return await axios.post(BASE_URL,
            {
                    params: 'productInventory',
                    publicKey: mobile
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! productInventory', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! productInventory", error)
            });

        /*return await HTTP.get('/productInventoryManagement/1.1/product',
                {
                    params: {
                        publicKey: mobile
                    },
                }
            )
            .then((response) => {
                console.log('Success! ProductInventory', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! ProductInventory ", error)
            });*/
    },

    usageCunsomptionReport: async function (mobile) {
        return await axios.post(BASE_URL,
            {
                    params: 'usageCunsomptionReport',
                    publicKey: mobile
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! usageCunsomptionReport', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! usageCunsomptionReport", error)
            });

        /*return await HTTP.get('usageManagement/1.1/usageConsumptionReport',
            {
                params: {
                    publicKey: mobile
                },
            }
        )
            .then((response) => {
                console.log('Success! usageCunsomptionReport', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! usageCunsomptionReport ", error)
            });*/
    },

    productCatalogManagement: async function (productOfferingId, productCategoryId) {
        const params =  productCategoryId != null ? { category: productCategoryId } : {}
        const addOption = productOfferingId != null ? ('/' + productOfferingId) : ''

        return await axios.post(BASE_URL,
            {
                params: 'productCatalogManagement',
                productOfferingId: addOption,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! productCatalogManagement', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! productCatalogManagement", error)
            });

        /*return await HTTP.get('/productCatalogManagement/1.1/productOffering' + addOption,
                {
                    params: params,
                }
            )
            .then((response) => {
                console.log('Success! ProductCatalog', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! ProductCatalog ", error)
            });*/
    },

    productOfferingQualification: async function (mobile, productOfferingCategoryID) {
        return await axios.post(BASE_URL,
            {
                    params: 'productOfferingQualification',
                    mobile: mobile,
                    productCategory: productOfferingCategoryID,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! productOfferingQualification', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! productOfferingQualification", error)
            });

        /*const data = {
            "relatedPublicKey": [
                {
                    "id": mobile,
                    "name": "customer"
                }
            ],
            "productOfferingQualificationItem": [
                {
                    "category": {
                        "id": productOfferingCategoryID
                    }
                }
            ]
        };

        return await HTTP.post('/productOfferingQualificationManagement/1.1/productOfferingQualification',
                data
            )
            .then((response) => {
                console.log('Success! productOfferingQualification', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! productOfferingQualification ", error)
            });*/
    },

    productOrdering: async function (type, products, operation, userInitiator, userConcerned, OTPCode, exceedValue, shield = null) {
        const productId = products.items[0].id

        if (products.items[0].renewal.characteristicName !== null && products.items[0].renewal.value !== null) {
            exceedValue = {
                'name': products.items[0].renewal.characteristicName,
                'value': products.items[0].renewal.value
            };
        }

        return await axios.post(BASE_URL,
            {
                    params: 'productOrdering',
                    productId: productId,
                    operation: operation,
                    userInitiator: userInitiator,
                    userConcerned: userConcerned,
                    otp: OTPCode,
                    exceedValue: exceedValue,
                    model: type,
                    shield: shield
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        //"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            )
            .then((response) => {
                //console.log('Success! productOrdering', response)
                if (typeof response.data.data !== "undefined" && response.data.data) {
                    return JSON.parse(response.data.data)
                }
            }).catch(function (error) {
                //console.log("Error! productOrdering", error)
            });

        /*var relatedParty = null;
        var productFormat = null;

        switch ( type ) {
            case 'services-mobiles' :
                // For profile migration
                if (exceedValue) {
                    productFormat = [
                        {
                            id: '1',
                            action: operation,
                            productOffering: {
                                id: productId,
                            },
                            product: {
                                characteristic: [
                                    {
                                        name: 'msisdn',
                                        value: userConcerned,
                                    },
                                ]
                            }
                        }
                    ]
                }
                // For favorite numbers
                else {
                    productFormat = [
                        {
                            id: '2',
                            action: 'addcharacteristic',
                            productOffering: {
                                id: productId,
                            },
                            product: {
                                characteristic: [
                                    {
                                        name: 'msisdn',
                                        value: userConcerned,
                                    },
                                ]
                            },
                            orderItemRelationship: [
                                {
                                    type: 'hasPrerequisite',
                                    id: '1',
                                }
                            ]
                        },
                        {
                            id: '1',
                            action: 'deletecharacteristic',
                            productOffering: {
                                id: productId,
                            },
                            product: {
                                characteristic: [
                                    {
                                        name: 'msisdn',
                                        value: exceedValue,
                                    },
                                ]
                            },
                            orderItemRelationship: [
                                {
                                    type: 'isPrerequisite',
                                    id: '2',
                                }
                            ]
                        }
                    ];
                }
                break;

            default:
                if (userConcerned) {
                    relatedParty = [
                        {
                            'name': 'benef',
                            'id': userConcerned,
                        }
                    ];
                }

                // For Togo-Togo pass only
                if (exceedValue) {
                    productFormat = []
                    var count = 0;
                    _.forEach(exceedValue.details, function (value, key) {
                        for (var i = 1; i <= value.value; i++) {
                            count++;

                            var relationShip = [];
                            if (value.value > 1) {
                                if (i === 1) {
                                    exceedValue.details[key].parent = count;
                                    var start = count + 1;
                                    var end = count + value.value;

                                    for (var j = start; j < end; j++) {
                                        relationShip.push(
                                            {
                                                type: 'hasAssociated',
                                                id: j
                                            }
                                        )
                                    }
                                } else {
                                    relationShip.push(
                                        {
                                            type: 'isAssociated',
                                            id: exceedValue.details[key].parent
                                        }
                                    )
                                }
                            }

                            productFormat.push(
                                {
                                    id: count,
                                    action: operation,
                                    productOffering: {
                                        id: value.code,
                                    },
                                    orderItemRelationship: relationShip
                                }
                            );
                        }

                        /!*productFormat.push(
                            {
                                id: key++,
                                action: operation,
                                productOffering: {
                                    id: value.code,
                                    value: value.value,
                                    amount: value.amount,
                                }
                            }
                        );*!/
                    });
                }
                // Other pass
                else {
                    productFormat = [
                        {
                            id: '1',
                            action: operation,
                            productOffering: {
                                id: productId,
                            }
                        }
                    ]
                }
                break;
        }

        const data = {
            "relatedPublicKey": [
                {
                    "name": "customer",
                    "id": userInitiator
                }
            ],
            "channel": {
                "id": "99"
            },
            "relatedParty": relatedParty,
            "orderItem": productFormat
        };

        return await HTTP.post('/productOfferingQualificationManagement/1.1/productOfferingQualification' + OTPCode ? '?OTPToken=' . OTPCode : '',
                data,
                /!*{
                    headers: {
                        "Authorization": "Bearer e0a00d21-1746-3aad-9df3-a5e36fb23962",
                    },
                }*!/
            )
            .then((response) => {
                console.log('Success! productOrdering', response)
                return response.data
            })
            .catch(function (error) {
                console.log("Error! productOrdering ", error)
            });*/
    },
    /***************** / APIs *****************/

};
