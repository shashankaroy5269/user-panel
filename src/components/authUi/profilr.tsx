// "use client";
// import React, { useState } from 'react';
// import { useGetProfile, useLogout } from '@/customHooks/query/user.hooks';
// import { Mail, Shield, User as UserIcon, LogOut, Loader2, ArrowLeft, MapPin, Hash } from 'lucide-react';
// import Link from 'next/link';
// import styles from './Profile.module.css';
// import SweetAlert from '@/components/SweetAlert'; // ✅ SweetAlert Import

// const ProfilePage = () => {
//     const { data, isLoading, error } = useGetProfile();
//     const { mutate: logoutApi, isPending: loggingOut } = useLogout();
    
//     
//     const [isAlertOpen, setIsAlertOpen] = useState(false);

//     if (isLoading) {
//         return (
//             <div className={styles.loaderContainer}>
//                 <Loader2 className={styles.spinner} size={40} />
//                 <p>Fetching your profile details...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className={styles.errorContainer}>
//                 <p>Profile load nahi hui. Login check karein.</p>
//                 <Link href="/auth/login" className={styles.retryBtn}>Login Again</Link>
//             </div>
//         );
//     }

//     const user = data?.data; 
    
//     
//     const firstName = user?.first_name || user?.name?.split(' ')[0] || "User";
//     const lastName = user?.last_name || user?.name?.split(' ')[1] || "";
//     const fullName = `${firstName} ${lastName}`.trim();

//     
//     const firstLetter = firstName.charAt(0).toUpperCase();

//     const handleConfirmLogout = () => {
//         logoutApi();
//         setIsAlertOpen(false);
//     };

//     return (
//         <div className={styles.container}>
//            
//             <SweetAlert 
//                 isOpen={isAlertOpen}
//                 type="warning"
//                 title="Logout Confirmation"
//                 message="Bhai, kya aap sach mein logout karna chahte ho?"
//                 onClose={() => setIsAlertOpen(false)}
//                 onConfirm={handleConfirmLogout}
//             />

//             <div className={styles.profileCard}>
//                 <Link href="/dashboard" className={styles.backBtn}>
//                     <ArrowLeft size={20} />
//                 </Link>

//                 <div className={styles.headerSection}>
//                     <div className={styles.avatarBox}>
//                         {firstLetter}
//                     </div>
//                     <h2 className={styles.userName}>{fullName}</h2>
//                     <span className={styles.roleBadge}>{user?.role || 'Patient'}</span>
//                 </div>

//                 <div className={styles.detailsGrid}>
//                     {/* First Name */}
//                     <div className={styles.detailCard}>
//                         <div className={styles.iconBox}><UserIcon size={16} /></div>
//                         <div className={styles.detailInfo}>
//                             <span>First Name</span>
//                             <p>{firstName}</p>
//                         </div>
//                     </div>

//                     {/* Last Name */}
//                     <div className={styles.detailCard}>
//                         <div className={styles.iconBox}><UserIcon size={16} /></div>
//                         <div className={styles.detailInfo}>
//                             <span>Last Name</span>
//                             <p>{lastName || 'Not Provided'}</p>
//                         </div>
//                     </div>

//                     {/* Email */}
//                     <div className={styles.detailCard}>
//                         <div className={styles.iconBox}><Mail size={16} /></div>
//                         <div className={styles.detailInfo}>
//                             <span>Email Address</span>
//                             <p>{user?.email}</p>
//                         </div>
//                     </div>

//                     {/* Address */}
//                     <div className={styles.detailCard}>
//                         <div className={styles.iconBox}><MapPin size={16} /></div>
//                         <div className={styles.detailInfo}>
//                             <span>Address</span>
//                             <p>{user?.address || 'No Address Set'}</p>
//                         </div>
//                     </div>

//                     {/* Token / User ID */}
//                     <div className={styles.detailCard}>
//                         <div className={styles.iconBox}><Hash size={16} /></div>
//                         <div className={styles.detailInfo}>
//                             <span>User Token (ID)</span>
//                             <p className={styles.monoText}>{user?._id}</p>
//                         </div>
//                     </div>
//                 </div>

//                 <button 
//                     className={styles.logoutBtn} 
//                     onClick={() => setIsAlertOpen(true)} 
//                     disabled={loggingOut}
//                 >
//                     {loggingOut ? (
//                         <Loader2 size={18} className={styles.spinner} />
//                     ) : (
//                         <><LogOut size={18} /> Logout Account</>
//                     )}
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default ProfilePage;