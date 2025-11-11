import { BookOpen, Coins, Disc, Star, TrendingUp, User, Wallet } from "lucide-react";

const getMenuItems = () => ([
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    
      {
      path: "/saldo",
      name: "Saldo",
      icon: (
         <Wallet className="w-5 h-5" />
      )
    },
    
     {
      path: "/kelolatransaksi",
      name: "Kelola Transaksi",
      icon: (
      <BookOpen className="w-5 h-5" />
      )
    },
     {  
      path: "/laporankeuangan",
      name: "Promo",
      icon: (
         <Disc className="w-5 h-5" />
      )
    },
  
   
       {
       path: "/kelolapengguna",
      name: "Kelola Pengguna",
      icon: (
         <User className="w-5 h-5" />
      )
    },

    
       {
       path: "/ratingtestimoni",
      name: "Rating Testimoni",
      icon: (
         <Star className="w-5 h-5" />
      )
    },
       {  
      path: "/laporankeuangan",
      name: "Laporan Keuangan",
      icon: (
         <TrendingUp className="w-5 h-5" />
      )
    },
  ]);
  
  export { getMenuItems };