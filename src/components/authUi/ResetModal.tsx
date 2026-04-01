// "use client";

// import { useState } from "react";
// import { useSendResetLink } from "../hooks/useAuth";

// type ModalProps = {
//   open: boolean;
//   onClose: () => void;
// };

// export default function ResetModal({ open, onClose }: ModalProps) {
//   const [email, setEmail] = useState("");
//   const [error, setError] = useState("");

//   const { mutate, isPending } = useSendResetLink();

//   const handleSubmit = (e: any) => {
//     e.preventDefault();

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     setError("");

//     mutate(email, {
//       onSuccess: () => {
//         onClose();
//       },
//     });
//   };

//   if (!open) return null;

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
        
//         {/* ❌ Close button */}
//         <span style={styles.close} onClick={onClose}>
//           ✖
//         </span>

//         {/* 🔰 Header */}
//         <div style={styles.header}>
//           <div style={styles.iconBox}>📧</div>
//           <div>
//             <h3 style={{ margin: 0 }}>Recover Password</h3>
//             <p style={styles.sub}>
//               Enter your email to get reset instructions
//             </p>
//           </div>
//         </div>

//         {/* 🧾 Form */}
//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="your@email.com"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             style={styles.input}
//           />

//           {error && <p style={styles.error}>{error}</p>}

//           <button type="submit" style={styles.button}>
//             {isPending ? "Processing..." : "Send Link"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// // 🎨 styles
// const styles: any = {
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.4)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backdropFilter: "blur(6px)",
//     zIndex: 999,
//   },
//   modal: {
//     width: 350,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 14,
//     position: "relative",
//   },
//   close: {
//     position: "absolute",
//     right: 10,
//     top: 10,
//     cursor: "pointer",
//     fontSize: 18,
//   },
//   header: {
//     display: "flex",
//     gap: 10,
//     alignItems: "center",
//     marginBottom: 15,
//   },
//   iconBox: {
//     width: 40,
//     height: 40,
//     background: "#dcfce7",
//     borderRadius: 8,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 20,
//   },
//   sub: {
//     fontSize: 12,
//     color: "#666",
//     margin: 0,
//   },
//   input: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     marginBottom: 10,
//   },
//   error: {
//     color: "red",
//     fontSize: 12,
//     marginBottom: 10,
//   },
//   button: {
//     width: "100%",
//     padding: 12,
//     borderRadius: 999,
//     border: "none",
//     background: "black",
//     color: "#fff",
//     cursor: "pointer",
//   },
// };