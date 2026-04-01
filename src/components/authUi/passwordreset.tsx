"use client";
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useResetPassword } from '@/customHooks/query/auth.query.hooks';
import styles from './resetPassword.module.css';
import SweetAlert from '@/components/SweetAlert'; 
import { Lock, Loader2 } from 'lucide-react';

const ResetPassword = () => {
    const { id, token } = useParams();
    const router = useRouter();
    const { mutate, isPending } = useResetPassword();

    // ✅ Alert State Management
    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'info' as 'success' | 'error' | 'warning' | 'info',
        title: '',
        message: ''
    });

    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // ✅ Step 1: Client-side validation for password match
        if (formData.password !== formData.confirm_password) {
            setAlert({
                isOpen: true,
                type: 'warning',
                title: 'Password Mismatch',
                message: 'Bhai, dono password match nahi ho rahe hain!'
            });
            return;
        }

        
        mutate({ 
            id: id as string, 
            token: token as string, 
            data: formData 
        }, {
            onSuccess: () => {
                setAlert({
                    isOpen: true,
                    type: 'success',
                    title: 'Success!',
                    message: 'Aapka password badal gaya hai. Ab login karein.'
                });
                // 2 second baad login par bhej dega
                setTimeout(() => router.push('/auth/login'), 2500);
            },
            onError: (err: any) => {
                setAlert({
                    isOpen: true,
                    type: 'error',
                    title: 'Update Failed',
                    message: err?.response?.data?.message || 'Kuch error aaya hai, fir se koshish karein.'
                });
            }
        });
    };

    return (
        <div className={styles.formContainer}>
           
            <SweetAlert 
                isOpen={alert.isOpen}
                type={alert.type}
                title={alert.title}
                message={alert.message}
                onClose={() => setAlert({ ...alert, isOpen: false })}
            />

            <div className={styles.authCard}>
                <div className={styles.iconHeader}>
                    <Lock size={40} color="#2563eb" />
                </div>
                <h2>Set New Password</h2>
                <p className={styles.subtitle}>Please choose a strong password for your account.</p>
                
                <form onSubmit={handleSubmit} className={styles.doctorForm}>
                    <div className={styles.formGroup}>
                        <label>New Password</label>
                        <input 
                            type="password" 
                            placeholder="Enter new password"
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required 
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            placeholder="Confirm new password"
                            onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                            required 
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className={styles.spin} size={18} /> Updating...</>
                        ) : 'Update Password'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;