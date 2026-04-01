


    export const endpoints = {
    auth: {
        signup: "/auth/register",
        login: "/auth/login",
        otp: "/auth/verify_otp", 
        refreshToken: "/refresh-token",
        profile: "/user/profile",
        logout: "/user/logout",
        resetlink: "/auth/resetlink", 
       
    },
    doctor: {
        list: "/user/doctor/list",
        slots: "/user/slot/list",
        bookAppointment: "/doctor/appointment",
        history: "/user/history"
    },
    map: {
        nearby: "/diagnostic/nearby"
    },
    appointments: {
        userList: "/appointments/my-appointments", 
        create: "/appointments/book",            
        update: (id: string) => `/appointments/update/${id}`, 
        cancel: (id: string) => `/appointments/cancel/${id}`
    }
};