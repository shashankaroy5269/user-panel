"use client";
import React, { useState } from 'react';
import { useForgotPass } from '@/src/hooks/customHooks/auth.query.hooks';
import styles from './forgotPassword.module.css';
import SweetAlert from '@/src/SweetAlert/SweetAlert'; 
import { Mail, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const { mutate, isPending } = useForgotPass();

    
    const [alert, setAlert] = useState({
        isOpen: false,
        type: 'info' as 'success' | 'error' | 'warning' | 'info',
        title: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        
        mutate(email, {
            onSuccess: (res: any) => {
                setAlert({
                    isOpen: true,
                    type: 'success',
                    title: 'Link Sent!',
                    message: 'Bhai, reset link aapki email par bhej diya gaya hai. Inbox check karein.'
                });
                setEmail(""); // Clear input on success
            },
            onError: (err: any) => {
                setAlert({
                    isOpen: true,
                    type: 'error',
                    title: 'Request Failed',
                    message: err?.response?.data?.message || 'Email nahi mil payi. Kripya sahi email dalein.'
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
                    <Mail size={40} color="#2563eb" />
                </div>
                <h2>Forgot Password</h2>
                <p className={styles.subtitle}>Enter your registered email to receive a reset link.</p>
                
                <form onSubmit={handleSubmit} className={styles.doctorForm}>
                    <div className={styles.formGroup}>
                        <label>Email Address</label>
                        <input 
                            type="email" 
                            placeholder="example@gmail.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>

                    <button type="submit" className={styles.submitBtn} disabled={isPending}>
                        {isPending ? (
                            <><Loader2 className={styles.spin} size={18} /> Sending Link...</>
                        ) : 'Send Reset Link'}
                    </button>
                    
                    <div className={styles.footerLink}>
                        <Link href="/auth/login" className={styles.backLink}>
                            <ArrowLeft size={16} /> Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;