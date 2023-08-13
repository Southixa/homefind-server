import dotenv from "dotenv";
dotenv.config();

export const node = {
    NODE_ENV: "development"
};

export const tokenSet = {
    TOKEN_EXPIRE_TIME: 259200,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
};

export const role = {
    ADMIN_ROLE: "ADMIN",
    STAFF_ROLE: "STAFF",
    CUSTOMER_ROLE: "CUSTOMER"
};

export const statusMessage = {
    TOKEN_IS_NOT_VALID: "TOKEN_IS_NOT_VALID",
    ADMIN_ROLE: "ADMIN_ROLE",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    BAD_REQUEST: "BAD_REQUEST",
    USER_NOT_FOUND: "USER_NOT_FOUND",
    USER_ALREADY_EXIST: "USER_ALREADY_EXIST",
    PASSWORD_NOT_MATCH: "PASSWORD_NOT_MATCH",
    TOKEN_IS_EXPIRED: "TOKEN_IS_EXPIRED",
    CREATE_SUCCESS: "CREATE_SUCCESS",
    UPDATE_SUCCESS: "UPDATE_SUCCESS",
    DELETE_SUCCESS: "DELETE_SUCCESS",
    GET_SUCCESS: "GET_SUCCESS",
    SERVER_ERROR: "SERVER_ERROR",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    APARTMENT_NOT_FOND: "APARTMENT_NOT_FOND",
    HOME_NOT_FOND: "HOME_NOT_FOND",
    BOOKING_NOT_FOND: "BOOKING_NOT_FOND",
    CHECKOUT_NOT_FOND: "CHECKOUT_NOT_FOND",
    SUBJECT: "HOME_FIND",
    SERVICE: "gmail",
    BOOKING_MESSAGE: '✅ການຈອງໃໝ່ເຂົ້າມາຈາກ',
    BOOKING_SUCCESS: '✅ການຈອງຂອງທ່ານຖືກກວດສອບສຳເລັດເເລ້ວ... ກະລຸນາລໍຖ້າພະນັກງານຕິດຕໍ່ຫາຂໍຂອບໃຈ',
    BOOKING_CANCEL: '❌ການຈອງຂອງທ່ານບໍ່ສຳເລັດ... ຂໍໂທດ🙏🏻ສຳລັບຄວາມບໍ່ສະດວກການບໍລິການທີ່ທ່ານຈອງນັ້ນເຕັມເເລ້ວ'
}